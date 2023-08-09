"use client"

import { useState, useEffect } from 'react'
import {
  Avatar,
  Card,
  Container,
  Input,
  Loading,
  Grid,
  Text
} from '@nextui-org/react'

function Episode({ episode }: { episode: any }) {
  return (
    <Card>
      <Card.Body>
        <Text h3>{episode.title}</Text>
        <Text h5>{episode.date}</Text>
        <Text>{episode.description}</Text>
      </Card.Body>
    </Card>
  )
}

export default function Episodes({ episodes }: { episodes: any }) {
  return (
    <Container>
      {episodes &&
        episodes.episodes &&
        episodes.episodes.map((episode: any, index: number) => (
          <Episode episode={episode} key={index} />
        ))}
    </Container>
  )
}
