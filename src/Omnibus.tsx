import React, { useState } from 'react';

import { Container, Navbar, Spacer, Text, Image, Button, Link } from "@nextui-org/react";

import About from './About';
import Search from './Search';


export default function Omnibus() {
    const [aboutVisible, setAboutVisible] = useState(false);
    const aboutCloseHandler = () => {
        setAboutVisible(false);
    };
    return (
        <Container>
            <Navbar isBordered={true} variant="static">
                <Navbar.Brand>
                    <Image src="/trefoil.png" height={48} />
                    <Spacer></Spacer>
                    <Text b color="inherit" hideIn="xs" css={{
                        fontSize: "40px",
                        fontFamily: "Bungee"
                    }}>
                        Omnibot
                    </Text>
                </Navbar.Brand>
                {/* About page */}
                <Navbar.Content hideIn="xs">
                    <Button auto rounded bordered color="primary" onClick={() => setAboutVisible(true)}>About</Button>
                    <Button auto rounded bordered color="primary"><Link href="https://github.com/mdwelsh/omnibot">GitHub</Link></Button>
                </Navbar.Content>
            </Navbar>
            <Spacer />
            <About open={aboutVisible} closeHandler={aboutCloseHandler} />
            <Container>
                <Text blockquote>
                    <Text span style={{ fontFamily: "Bungee" }}>
                        Omnibot
                    </Text>
                    <Spacer inline x={0.2} />
                    <Text span>
                        is an AI-powered chatbot that can answer questions about
                        the hit podcast, <a href="https://www.omnibusproject.com/">The Omnibus Project</a>,
                        by Ken Jennings and John Roderick.
                    </Text>
                    <Spacer y={1} />
                    <Text span>
                        Omnibot is powered by <a href="https://fixie.ai"><b>Fixie</b></a>,
                        a platform that makes it easy to build and deploy AI-powered chatbots.
                    </Text>
                    <Spacer y={1} />
                    <Text>
                        Try asking questions like:
                    </Text>
                    <Text style={{ fontFamily: "Courier" }}>
                        Who was Magic Alex?
                    </Text>
                    <Text style={{ fontFamily: "Courier" }}>
                        Summarize the episode about mad cow disease
                    </Text>
                    <Text style={{ fontFamily: "Courier" }}>
                        What did John Roderick do to upset listeners?
                    </Text>
                </Text>
            </Container>
            <Spacer y={1} />
            <Search />
        </Container>
    )
}