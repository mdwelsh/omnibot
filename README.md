# Omnibot: The Omnibus Project AI Bot

This is an AI chatbot that answers questions about the hit podcast,
[The Omnibus Project](https://www.omnibusproject.com/), by Ken Jennings and
John Roderick. It is built using [Fixie](https://fixie.ai), a platform for
building AI-powered agents.

## Live demo

Check out the live version of Omnibot at https://omnibot.cc.

This repository only holds the web front-end for Omnibot. The Fixie Agent code (which
does most of the interesting AI stuff) can be found here:
https://github.com/fixie-ai/fixie-examples/tree/main/agents/omnibusproject.

## Running the app locally

This app is designed to run on [Netlify](https://www.netlify.com/). It should be possible
to run it on other hosting platforms as well, however, there are a few Netlify-specific
things here.

Omnibot is a standard React app, using [NextUI](https://nextui.org/) for the UI components.
In order to query the Fixie agent from this web app, we rely on a Netlify Function,
which is a serverless function that runs on Netlify's servers. This function acts as a
proxy to Fixie, allowing the web app to make unauthenticated requests to Fixie, while
the Netlify function holds the auth credentials to talk to the Fixie agent.

To run the app locally, you first need to create a Netlify account.
You can then install the Netlify CLI with:
```
$ npm install -g netlify-cli
```
You can then link this directory to your Netlify project with:
```
$ netlify link
```
You will need to configure your Netlify project with an environment variable called
`FIXIE_API_KEY` that contains the API key for your Fixie account. You can obtain this by
creating an account at https://fixie.ai. Your Fixie API key will be found on your user
profile page there. This is used by the Netlify function, as described above, to access
the Fixie API.

You can run the app with:

```
$ netlify dev --live
```

## Deploying the app

You can deploy the app to Netlify with:

```
$ netlify deploy
```