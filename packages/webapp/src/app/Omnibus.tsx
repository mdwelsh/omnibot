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
import { useDisclosure } from '@nextui-org/modal'

import About from './About'
import Episodes from './Episodes'
import Search from './Search'

export default function Omnibus() {
  const [aboutVisible, setAboutVisible] = useState(false)
  const [episodes, setEpisodes] = useState({})
  const aboutCloseHandler = () => {
    setAboutVisible(false)
  }
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

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
      <Navbar maxWidth="full" isBordered className="w-full flex justify-start">
        <NavbarBrand className="flex flex-row gap-4">
          <Image src="/trefoil.png" className="h-12" alt="Omnibus Logo" />
          <p className="font-['Bungee'] text-4xl text-white">Omnibot</p>
        </NavbarBrand>
        {/* <div className="w-full h-2 border-2 border-red" /> */}
        <NavbarContent justify="end" className="w-full">
          <NavbarItem>
            <Button onPress={onOpen} color="primary" variant="flat">
              About
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button color="primary" href="#" variant="flat">
              <Link className="text-sm" href="https://github.com/mdwelsh/omnibot">GitHub</Link>
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <Spacer />
      <About isOpen={isOpen} onOpenChange={onOpenChange} />
      <div className="flex p-12 flex-col gap-4 text-slate-300">
        <div>
          <span className='font-["Bungee"] text-lg text-slate-200'>
            Omnibot
          </span>{' '}
          <span>
            is an AI-powered chatbot that can answer questions about the hit
            podcast,{' '}
            <Link href="https://www.omnibusproject.com/">
              The Omnibus Project
            </Link>
            , by Ken Jennings and John Roderick.
          </span>
        </div>
        <Spacer y={1} />
        <span>
          Omnibot is powered by{' '}
          <Link href="https://fixie.ai">
            <b>Fixie</b>
          </Link>
          , a platform that makes it easy to build and deploy AI-powered
          chatbots.
        </span>
        <Spacer y={1} />
        <p>Try asking questions like:</p>
        <div className="pl-4">
          <p className="font-mono ">Who was Magic Alex?</p>
          <p className="font-mono">
            Summarize the episode about mad cow disease
          </p>
          <p className="font-mono">
            What did John Roderick do to upset listeners?
          </p>
        </div>
      </div>
      <Spacer y={1} />
      <Episodes episodes={episodes} />
      <Spacer y={1} />
      <Search />
    </div>
  )
}
