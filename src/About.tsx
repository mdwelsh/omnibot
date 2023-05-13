import { Container, Grid, Modal, Text, Spacer } from '@nextui-org/react';

export default function About({ open, closeHandler }) {
    return (
        <Modal open={open} closeButton onClose={closeHandler} width="60%">
            <Modal.Header>
                <Text b color="inherit" hideIn="xs" css={{
                    fontSize: "40px",
                    fontFamily: "Bungee"
                }}>
                    About Omnibot
                </Text>
            </Modal.Header>
            <Modal.Body>
                <Grid.Container xs={12} gap={1} justify="center" css={{ width: "100%" }}>
                    <Grid xs={12}>
                        <Container>
                            <Text size="$md">
                                Omnibot is an AI chatbot that answers questions
                                about <a href="https://www.omnibusproject.com/">The Omnibus Project</a>.
                            </Text>
                            <Spacer y={1} />
                            <Text>
                                It was developed by <a href="https://www.mdw.la">Matt Welsh</a>.
                            </Text>
                        </Container>
                    </Grid>
                </Grid.Container>
            </Modal.Body>
        </Modal>
    );
}