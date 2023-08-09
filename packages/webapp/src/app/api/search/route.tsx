/** @jsxImportSource ai-jsx/react */

export const runtime = 'edge'

import { toTextStream } from 'ai-jsx/stream'
import { DefaultFormatter, DocsQA, FixieCorpus } from 'ai-jsx/batteries/docs'
import { NextRequest } from 'next/server'
import { StreamingTextResponse } from 'ai'

// async function DocsAgent({
//   question,
//   corpusId
// }: {
//   question: string
//   corpusId: string
// }) {
//   const corpus = new FixieCorpus(corpusId)
//   return (
//     <DocsQA
//       question={question}
//       corpus={corpus}
//       chunkLimit={1}
//       chunkFormatter={DefaultFormatter}
//     />
//   )
// }

export async function POST(request: NextRequest) {
  const json = await request.json()
  const question = json.messages[json.messages.length - 1]
  const corpusId = 'corpusId' in json ? json.corpusId : '6'

    // return new StreamingTextResponse(
    //   toTextStream(<DocsAgent question={question.content} corpusId={corpusId} />)
    // )
}


// XXX NETLIFY CODE BELOW

// const fetch = require('node-fetch')

// exports.handler = async function (event, context) {
//   console.log('Agent handler got event: ', event)
//   console.log('Agent handler request body: ', event.body)
//   let statusCode, data
//   let agentUrl = 'https://app.fixie.ai/graphql'
//   const req = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${process.env.FIXIE_API_KEY}`
//     },
//     body: event.body
//   }

//   try {
//     const response = await fetch(agentUrl, req)
//     console.log('Agent handler got response: ', response)
//     data = await response.json()
//     console.log('Agent handler got data: ', data)
//     statusCode = 200
//   } catch (err) {
//     console.log('Agent handler got error: ', err)
//     statusCode = err.statusCode || 500
//     data = { error: err.message }
//   }

//   return {
//     statusCode,
//     body: JSON.stringify(data)
//   }
// }

/// XXXX PODVERSE CODE BELOW