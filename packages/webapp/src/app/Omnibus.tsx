'use client'

import React, { useEffect, useState } from 'react'

import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/navbar'
import { Spacer } from '@nextui-org/spacer'
import { Image } from '@nextui-org/image'
import { Button } from '@nextui-org/button'
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
    fetch(
      'https://storage.googleapis.com/mdw-omnibus-project-audio/episodes.json',
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    )
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        setEpisodes(data)
      })
  }
  useEffect(() => {
    getEpisodes()
  }, [episodes])

  return (
    <div>
      <Navbar isBordered={true}>
        <NavbarBrand>
          <Image src="/trefoil.png" height={48} alt="Omnibus Logo" />
          <Spacer></Spacer>
          <p className="font-['Bungee'] text-4xl text-gray-800">Omnibot</p>
        </NavbarBrand>
        {/* About page */}
        <NavbarContent>
          <Button color="primary" onClick={() => setAboutVisible(true)}>
            About
          </Button>
          <Button color="primary">
            <Link href="https://github.com/mdwelsh/omnibot">GitHub</Link>
          </Button>
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
          <a href="https://www.omnibusproject.com/">The Omnibus Project</a>, by
          Ken Jennings and John Roderick.
        </span>
        <Spacer y={1} />
        <span>
          Omnibot is powered by{' '}
          <a href="https://fixie.ai">
            <b>Fixie</b>
          </a>
          , a platform that makes it easy to build and deploy AI-powered
          chatbots.
        </span>
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
      <Search />
    </div>
  )
}
