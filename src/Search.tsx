
import { useState } from "react";
import { Container, Input, Loading, Grid } from "@nextui-org/react";
import { BiSearch } from "react-icons/bi";

export default function Search() {
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [response, setResponse] = useState("");

    let doSearch = async () => {
        console.log("doSearch sending query: ", query);
        setLoading(true);
        // To invoke the Omnibus Agent, we invoke a Netlify Function, which proxies the request
        // to the Omnibus Agent using a Fixie API key.
        let url = "/.netlify/functions/agent";
        let gqlQuery = `{allSessions { handle }}`;

        const req = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gqlQuery }),
        };
        fetch(url, req)
            .then(async response => {
                console.log("Query got response: ", response);
                const isJson = response.headers.get('content-type')?.includes('application/json');
                console.log("Response isJson: ", isJson);
                const data = isJson ? await response.json() : null;
                console.log("Response data: ", data);
                if (!response.ok) {
                    const error = data.error || response.status;
                    return Promise.reject(error);
                }
                setResponse(data.response);
                setLoading(false);
            })
            .catch(error => {
                console.log("Query got error: ", error);
                setLoading(false);
            })
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
                            setQuery(e.target.value);
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