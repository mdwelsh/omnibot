import { Card, CardBody } from '@nextui-org/card'

function Episode({ episode }: { episode: any }) {
  return (
    <Card>
      <CardBody>
        <h3>{episode.title}</h3>
        <h5>{episode.date}</h5>
        <p>{episode.description}</p>
      </CardBody>
    </Card>
  )
}

export default function Episodes({ episodes }: { episodes: any }) {
  return (
    <div>
      {episodes &&
        episodes.episodes &&
        episodes.episodes.map((episode: any, index: number) => (
          <Episode episode={episode} key={index} />
        ))}
    </div>
  )
}
