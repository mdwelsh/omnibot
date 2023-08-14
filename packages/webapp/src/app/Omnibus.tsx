'use client'

import React, { useEffect, useState } from 'react'

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from '@nextui-org/navbar'
import { Button } from '@nextui-org/button'
import { Spacer } from '@nextui-org/spacer'
import { Image } from '@nextui-org/image'
import { Link } from '@nextui-org/link'

import About from './About'
import Episodes from './Episodes'
import Search from './Search'

export default function Omnibus() {
  const [aboutVisible, setAboutVisible] = useState(false)
  const [episodes, setEpisodes] = useState({})
  const aboutCloseHandler = () => {
    setAboutVisible(false)
  }

  const getEpisodes = () => {
    // fetch(
    //   'https://storage.googleapis.com/mdw-omnibus-project-audio/episodes.json',
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Accept: 'application/json'
    //     }
    //   }
    // )
    //   .then(function (response) {
    //     return response.json()
    //   })
    //   .then(function (data) {
    //     setEpisodes(data)
    //   })
  }
  useEffect(() => {
    //getEpisodes()
  }, [episodes])

  return (
    <div className="w-full">
      <Navbar isBordered>
        <NavbarBrand>
          <Image src="/trefoil.png" className="h-12" alt="Omnibus Logo" />
          <p className="font-['Bungee'] text-4xl text-white">Omnibot</p>
        </NavbarBrand>
        <NavbarContent justify="end" className="flex">
          <NavbarItem>
            <Button
              color="primary"
              variant="flat"
              onClick={() => setAboutVisible(true)}
            >
              About
            </Button>
          </NavbarItem>
          {/* XXX MDW - I don't think a <Link> can be inside a <Button>. */}
          {/* <NavbarItem className="flex">
            <Button color="primary" as={Link} href="#" variant="flat">
              <Link href="https://github.com/mdwelsh/omnibot">GitHub</Link>
            </Button>
          </NavbarItem> */}
        </NavbarContent>
      </Navbar>
      <Spacer />
      <About open={aboutVisible} closeHandler={aboutCloseHandler} />
      <div>
        <p className='font-["Bungee"] text-4xl text-gray-800'>Omnibot</p>
        <Spacer x={1} />
        <span>
          is an AI-powered chatbot that can answer questions about the hit
          podcast,{' '}
          <Link href="https://www.omnibusproject.com/">The Omnibus Project</Link>, by
          Ken Jennings and John Roderick.
        </span>
        <Spacer y={1} />
        <span>
          Omnibot is powered by{' '}
          <Link href="https://fixie.ai">
            <b>Fixie</b>
          </Link>
          , a platform that makes it easy to build and deploy AI-powered
          chatbots.
        </span>
        <Button>Hello</Button>
        <Spacer y={1} />
        <p>Try asking questions like:</p>
        <p className="font-mono">Who was Magic Alex?</p>
        <p className="font-mono">Summarize the episode about mad cow disease</p>
        <p className="font-mono">
          What did John Roderick do to upset listeners?
        </p>
      </div>
      <Spacer y={1} />
      <Episodes episodes={episodes} />
      <Spacer y={1} />
      {/* <Search /> */}
    </div>
  )
}
