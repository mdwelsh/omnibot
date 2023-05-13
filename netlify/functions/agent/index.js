// This is a Netlify Function that is used by the Omnibot web app to access the
// Omnibus Agent in Fixie. All it does is proxy the request from the web app through
// to the Fixie Agent, adding the FIXIE_API_KEY to the authorization header.
//
// You need to set the FIXIE_API_KEY environment variable in the Netlify UI if you
// are deploying this function yourself.

const fetch = require('node-fetch')


exports.handler = async function (event, context) {
    console.log("Agent handler got event: ", event);
    console.log("Agent handler request body: ", event.body);
    let statusCode, data;
    let agentUrl = "https://app.fixie.ai/api/agents/mdw/omnibusproject";
    const req = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.FIXIE_API_KEY}`
        },
        body: event.body
    };

    try {
        const response = await fetch(agentUrl, req);
        console.log("Agent handler got response: ", response);
        data = await response.json();
        console.log("Agent handler got data: ", data);
        statusCode = 200;
    } catch (err) {
        console.log("Agent handler got error: ", err);
        statusCode = err.statusCode || 500;
        data = { error: err.message };
    }

    return {
        statusCode,
        body: JSON.stringify(data)
    }
};