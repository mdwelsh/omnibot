"use client"

import { Container, Grid, Modal, Text, Spacer } from '@nextui-org/react'

export default function About({
  open,
  closeHandler
}: {
  open: boolean
  closeHandler: () => void
}) {
  return (
    <Modal open={open} closeButton onClose={closeHandler} width="60%">
      <Modal.Header>
        <Text
          b
          color="inherit"
          hideIn="xs"
          css={{
            fontSize: '40px',
            fontFamily: 'Bungee'
          }}
        >
          About Omnibot
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Grid.Container
          xs={12}
          gap={1}
          justify="center"
          css={{ width: '100%' }}
        >
          <Grid xs={12}>
            <Container>
              <Text size="$md">
                Omnibot is an AI chatbot that answers questions about{' '}
                <a href="https://www.omnibusproject.com/">
                  The Omnibus Project
                </a>
                , the hit podcast by Ken Jennings and John Roderick.
              </Text>
              <Spacer y={1} />
              <Text>
                Omnibot is built using <a href="https://fixie.ai">Fixie</a>, a
                new AI platform that makes it easy to build and deploy
                AI-powered chatbots.
              </Text>
              <Spacer y={1} />
              <Text>
                It works by pulling down the MP3 files of each episode of the
                podcast, using <a href="https://deepgram.com">Deepgram</a> to
                transcribe the audio into text, and then using{' '}
                <a href="https://fixie.ai">Fixie</a> to construct an agent that
                can answer questions about the podcast.
              </Text>
              <Spacer y={1} />
              <Text>
                Omnibot was developed by{' '}
                <a href="https://www.mdw.la">Matt Welsh</a>. You can check out
                the{' '}
                <a href="https://github.com/mdwelsh/omnibot">
                  source code on GitHub
                </a>
                , as well as the <a href="https://fixie.ai">Fixie</a> platform
                that powers it.
              </Text>
            </Container>
          </Grid>
        </Grid.Container>
      </Modal.Body>
    </Modal>
  )
}
