'use client'

import { useState, useEffect } from 'react'
import { Avatar } from '@nextui-org/avatar'
import { Card, CardBody } from '@nextui-org/card'
import { Input } from '@nextui-org/input'
import { CircularProgress } from '@nextui-org/progress'
import { BiSearch } from 'react-icons/bi'
import ReactMarkdown from 'react-markdown'

// Messages shown while we wait for a response.
const WAITING_TEXT = [
  'Reading the tea leaves...',
  'Consulting the entrails...',
  'Locking down the bunker...',
  'Beseeching the oracle...',
  'Snowblowing the Ob lobes...',
  'Checking for compatibility with Marxism...',
  'Opening the mail...',
  'Making jokes about Canadians...',
  'Attuning to the universe...',
  'Delving into the archives...',
  'Taxing the rich...'
]

const POLLING_INTERVAL = 2500

/// Proxy through our Netlify function to the GraphQL endpoint of the Fixie service.
async function gqlQuery(query: string, variables: any): Promise<any> {
  let url = '/.netlify/functions/agent'
  const body = JSON.stringify({ query, variables })
  const req = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body
  }
  const response = await fetch(url, req)
  if (!response.ok) {
    console.log('gqlQuery got error response: ', response)
    throw new Error('Request failed with status ' + response.status)
  }
  const data = await response.json()
  console.log('gqlQuery got response data: ', data)
  return data
}

/// Create a new session and return its handle.
async function createSession() {
  console.log('Creating new session')
  const query = `mutation {
        createSession(sessionData: { frontendAgentId: "mdw/omnibusproject" }) {
            session {
                handle
            }
        }
    }`
  const sessionData = await gqlQuery(query, {})
  const sessionHandle = sessionData.data.createSession.session.handle
  console.log('Created session: ', sessionHandle)
  return sessionHandle
}

/// Retrieve the messages for a given session.
async function getMessages(session: string) {
  console.log('Getting messages for session: ', session)
  const query = `query getMessages($session: String!) {
            sessionByHandle(handle: $session) {
                messages {
                    id
                    text
                    sentBy {
                        handle
                        avatar
                    }
                    type
                    inReplyTo { id }
                    timestamp
                }
            }
        }
    `
  const data = await gqlQuery(query, { session: session })
  console.log('Got messages: ', data)
  return data.data.sessionByHandle.messages
}

/// Represents a single message in a chat session.
function Message({ message }: { message: any }) {
  return (
    <div>
      <Card>
        <CardBody>
          <div>
            <div>
              {message.id === 'loading' ? (
                <CircularProgress />
              ) : (
                <Avatar
                  // css={{ position: 'absolute', top: '0.8rem' }}
                  size="lg"
                  src={
                    message.type === 'response' ? '/trefoil.png' : '/user.png'
                  }
                />
              )}
            </div>
            <div>
              {message.type === 'response' ? (
                <p className="text-gray-500">
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                </p>
              ) : (
                <p>{message.text}</p>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

/// Represents result messages in a search session.
function SearchResults({ results }: { results: any[] }) {
  // We show the most recent query first.
  let queries = results
    .filter(result => result.type === 'query')
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
  let responses = results.filter(result => result.type === 'response')
  let messages = []

  // Interleave responses with the corresponding queries.
  for (let i = 0; i < queries.length; i++) {
    messages.push(queries[i])
    let responseFound = false
    for (let j = 0; j < responses.length; j++) {
      if (responses[j].inReplyTo.id === queries[i].id) {
        messages.push(responses[j])
        responses.splice(j, 1)
        responseFound = true
        break
      }
    }
    if (!responseFound) {
      // Push a temporary waiting response.
      messages.push({
        id: 'loading',
        text: WAITING_TEXT[Math.floor(Math.random() * WAITING_TEXT.length)],
        type: 'response',
        timestamp: new Date().toISOString()
      })
    }
  }

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <Message message={message} />
          </div>
        ))}
      </div>
    </div>
  )
}

/// Top level Search component.
export default function Search() {
  const [sessionHandle, setSessionHandle] = useState('')
  const [userQuery, setUserQuery] = useState('')
  const [messages, setMessages] = useState([])
  const [polling, setPolling] = useState(false)

  useEffect(() => {
    // Create session when component mounts.
    // This async function is here because we can't use async directly in useEffect.
    if (sessionHandle === '') {
      const openSession = async () => {
        const session = await createSession()
        setSessionHandle(session)
      }
      openSession()
    }

    // Poll for messages when necessary.
    let intervalId: any
    if (polling) {
      console.log('Starting polling interval')
      intervalId = setInterval(async () => {
        console.log('Polling for messages on: ', sessionHandle)
        const result = await getMessages(sessionHandle)
        setMessages(result)

        // XXX This is not quite right, since if we poll before the query message shows
        // up in the Session, we prematurely believe that the query is done.
        // We need to ensure that the message.inReplyTo is the most recent query message.
        if (result[result.length - 1].type === 'response') {
          console.log(
            'Got final response, stopping polling on interval: ',
            intervalId
          )
          clearInterval(intervalId)
          setPolling(false)
        }
      }, POLLING_INTERVAL)
    }
    return () => {
      if (intervalId) {
        console.log('Cleaning up polling interval: ', intervalId)
        clearInterval(intervalId)
      }
    }
  }, [sessionHandle, polling])

  const doSearch = async () => {
    console.log('doSearch sending query: ', userQuery)
    console.log('Sending query to session: ', sessionHandle)

    // We first send the query to the session.
    let query = `mutation Post($session: String!, $text: String!) {
                sendSessionMessage(messageData: { session: $session, text: $text }) {
                message {
                        text
                    }
                }
            }`
    // We don't await here since we want to go immediately to polling.
    gqlQuery(query, {
      session: sessionHandle,
      text: userQuery
    })

    // Start polling for messages.
    console.log('Starting to poll for responses')
    setPolling(true) // This causes polling to start due to the useEffect hook.
  }

  return (
    <div>
      <div>
        <div>
          <Input
            placeholder="Ask me anything about the Omnibus"
            size="lg"
            fullWidth
            readOnly={polling}
            disabled={polling}
            startContent={
              polling ? <CircularProgress size="sm" /> : <BiSearch />
            }
            onChange={e => {
              setUserQuery(e.target.value)
            }}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                doSearch()
              }
            }}
          />
        </div>
      </div>
      <div>
        <div>
          <SearchResults results={messages} />
        </div>
      </div>
    </div>
  )
}
