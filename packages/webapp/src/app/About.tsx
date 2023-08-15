import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/modal'
import { Link } from '@nextui-org/link'

export default function About({
  isOpen,
  onOpenChange
}: {
  isOpen: boolean
  onOpenChange: () => void
}) {
  return (
    <Modal
      size="xl"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="blur"
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader>
              <div className="font-['Bungee'] text-4xl text-white">
                About Omnibot
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="w-full p-4 flex flex-col gap-6">
                <p>
                  Omnibot is an AI chatbot that answers questions about{' '}
                  <Link href="https://www.omnibusproject.com/">
                    The Omnibus Project
                  </Link>
                  , the hit podcast by Ken Jennings and John Roderick.
                </p>
                <p>
                  Omnibot is built using{' '}
                  <Link href="https://fixie.ai">Fixie</Link>, a new AI platform
                  that makes it easy to build and deploy AI-powered chatbots.
                </p>
                <p>
                  It works by pulling down the MP3 files of each episode of the
                  podcast, using{' '}
                  <Link href="https://deepgram.com">Deepgram</Link> to
                  transcribe the audio into text, and then using{' '}
                  <Link href="https://fixie.ai">Fixie</Link> to construct an
                  agent that can answer questions about the podcast.
                </p>
                <p>
                  Omnibot was developed by{' '}
                  <Link href="https://www.mdw.la">Matt Welsh</Link>. You can
                  check out the{' '}
                  <Link href="https://github.com/mdwelsh/omnibot">
                    source code on GitHub
                  </Link>
                  , as well as the <Link href="https://fixie.ai">Fixie</Link>{' '}
                  platform that powers it.
                </p>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
