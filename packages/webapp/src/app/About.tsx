
import { Modal, ModalHeader, ModalBody } from '@nextui-org/modal'
import { Spacer } from '@nextui-org/spacer'

export default function About({
  open,
  closeHandler
}: {
  open: boolean
  closeHandler: () => void
}) {
  return (
    <Modal isOpen={open} closeButton onClose={closeHandler}>
      <ModalHeader>
        <div className="font-['Bungee'] text-4xl text-gray-800">About Omnibot</div>
      </ModalHeader>
      <ModalBody>
        <div>
          <div>
            <div>
              <p>
                Omnibot is an AI chatbot that answers questions about{' '}
                <a href="https://www.omnibusproject.com/">
                  The Omnibus Project
                </a>
                , the hit podcast by Ken Jennings and John Roderick.
              </p>
              <p>
                Omnibot is built using <a href="https://fixie.ai">Fixie</a>, a
                new AI platform that makes it easy to build and deploy
                AI-powered chatbots.
              </p>
              <p>
                It works by pulling down the MP3 files of each episode of the
                podcast, using <a href="https://deepgram.com">Deepgram</a> to
                transcribe the audio into text, and then using{' '}
                <a href="https://fixie.ai">Fixie</a> to construct an agent that
                can answer questions about the podcast.
              </p>
              <p>
                Omnibot was developed by{' '}
                <a href="https://www.mdw.la">Matt Welsh</a>. You can check out
                the{' '}
                <a href="https://github.com/mdwelsh/omnibot">
                  source code on GitHub
                </a>
                , as well as the <a href="https://fixie.ai">Fixie</a> platform
                that powers it.
              </p>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  )
}
