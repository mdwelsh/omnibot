
import { useState } from "react";
import { Container, Input, Loading, Grid } from "@nextui-org/react";
import { BiSearch } from "react-icons/bi";

// Proxy through our Netlify function to the GraphQL endpoint of the Fixie service.
async function gqlQuery(query: string): Promise<any> {
    let url = "/.netlify/functions/agent";
    const req = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query }),
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
        let query = `mutation {
            createSession(sessionData: { frontendAgentId: "mdw/omnibusproject" }) {
                session {
                    handle
                }
            }
        }`;
        let sessionData = await gqlQuery(query);
        console.log("createSession got sessionData: ", sessionData);
        let sessionHandle = sessionData.data.createSession.session.handle;
        setSession(sessionHandle);
    };

    let doSearch = async () => {
        console.log("doSearch sending query: ", userQuery);
        setLoading(true);

        if (session === "") {
            await createSession();
        }
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