
import { useState } from "react";
import { Container, Input, Loading, Grid } from "@nextui-org/react";
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

export default function Search() {
    const [loading, setLoading] = useState(false);
    const [userQuery, setUserQuery] = useState("");
    const [response, setResponse] = useState("");
    const [session, setSession] = useState("");

    let createSession = async () => {
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
        setSession(sessionHandle);
    };

    let getMessages = async () => {
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
    };

    let doSearch = async () => {
        console.log("doSearch sending query: ", userQuery);
        setLoading(true);

        if (session === "") {
            await createSession();
        }

        console.log("Sending query to session: ", session);

        // We first send the query to the session.
        let query = `mutation Post($session: String!, $text: String!) {
            sendSessionMessage(messageData: {session: $session, text: $text}) {
                message {
                    text
                }
            }
        }`;
        let messageData = await gqlQuery(query, {
            session: session,
            text: userQuery,
        });
        let messageText = messageData.data.sendSessionMessage.message.text;
        console.log("Sent text: ", messageText);

        // XXX NEED TO POLL HERE.
        await getMessages();
        setLoading(false);
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
                        readOnly={loading}
                        disabled={loading}
                        contentLeft={
                            loading ? <Loading size="sm" type="points-opacity" /> : <BiSearch />
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


        </Container>
    )
}