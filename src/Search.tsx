
import { useState, useEffect } from "react";
import { Container, Input, Loading, Grid, Text } from "@nextui-org/react";
import { BiSearch } from "react-icons/bi";

// Proxy through our Netlify function to the GraphQL endpoint of the Fixie service.
async function gqlQuery(query: string, variables: any): Promise<any> {
    let url = "/.netlify/functions/agent";
    const body = JSON.stringify({ query, variables });
    const req = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
    };
    const response = await fetch(url, req);
    if (!response.ok) {
        console.log("gqlQuery got error response: ", response);
        throw new Error('Request failed with status ' + response.status);
    }
    const data = await response.json();
    console.log("gqlQuery got response data: ", data);
    return data;
}

async function createSession() {
    console.log("Creating new session");
    const query = `mutation {
        createSession(sessionData: { frontendAgentId: "mdw/omnibusproject" }) {
            session {
                handle
            }
        }
    }`;
    const sessionData = await gqlQuery(query, {});
    const sessionHandle = sessionData.data.createSession.session.handle;
    console.log("Created session: ", sessionHandle);
    return sessionHandle;
};

async function getMessages(session: string) {
    console.log("Getting messages for session: ", session);
    const query = `query getMessages($session: String!) {
            sessionByHandle(handle: $session) {
                messages {
                    id
                    text
                    sentBy {
                        handle
                    }
                    type
                    inReplyTo { id }
                    timestamp
                }
            }
        }
    `;
    const data = await gqlQuery(query, { session: session });
    console.log("Got messages: ", data);
    return data.data.sessionByHandle.messages;
};

function Message({ message }: { message: any }) {
    return (
        <Text>{message.text}</Text>
    );
}

function SearchResults({ results }: { results: any[] }) {
    return (
        <Container>
            <Grid.Container justify="center" gap={1} css={{ width: "100%" }}>
                {results.map((result) => (
                    <Grid xs={12}>
                        <Message message={result} />
                    </Grid>
                ))}
            </Grid.Container>
        </Container>
    );
}


export default function Search() {
    const [sessionHandle, setSessionHandle] = useState("");
    const [userQuery, setUserQuery] = useState("");
    const [messages, setMessages] = useState([]);
    const [polling, setPolling] = useState(false);
    const [intervalId, setIntervalId] = useState(0);

    const pollForMessages = async () => {
        console.log("Polling for messages on: ", sessionHandle);
        const result = await getMessages(sessionHandle);
        setMessages(result);

        if (result[result.length - 1].type === "response") {
            console.log("Got final response, stopping polling on interval: ", intervalId);
            clearInterval(intervalId);
            setPolling(false);
        }
    };

    useEffect(() => {
        // Create session when component mounts.
        // This async function is here because we can't use async directly in useEffect.
        const openSession = async () => {
            const session = await createSession();
            setSessionHandle(session);
        };
        openSession();
    }, []);

    const doSearch = async () => {
        console.log("doSearch sending query: ", userQuery);
        console.log("Sending query to session: ", sessionHandle);

        // We first send the query to the session.
        let query = `mutation Post($session: String!, $text: String!) {
            sendSessionMessage(messageData: {session: $session, text: $text}) {
                message {
                    text
                }
            }
        }`;
        // We don't await here since we want to go immediately to polling.
        gqlQuery(query, {
            session: sessionHandle,
            text: userQuery,
        });

        // Start polling for messages.
        console.log("Starting to poll for responses");
        setPolling(true);
        const interval = setInterval(pollForMessages, 1000);
        setIntervalId(interval);
        console.log("Started polling with interval id: ", interval);
    };

    return (
        <Container>
            <Grid.Container justify="center" gap={1} css={{ width: "100%" }}>
                <Grid xs={12}>
                    <Input
                        placeholder="Ask me anything about the Omnibus"
                        bordered={true}
                        rounded
                        size="xl"
                        fullWidth
                        readOnly={polling}
                        disabled={polling}
                        contentLeft={
                            polling ? <Loading size="sm" type="points-opacity" /> : <BiSearch />
                        }
                        onChange={(e) => {
                            setUserQuery(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                doSearch();
                            }
                        }}
                    />
                </Grid>
            </Grid.Container>
            <Grid.Container justify="center" gap={1} css={{ width: "100%" }}>
                <Grid xs={12}>
                    <SearchResults results={messages} />
                </Grid>
            </Grid.Container>
        </Container>
    )
}