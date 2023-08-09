'use client'

import { createTheme, NextUIProvider } from '@nextui-org/react'
import Omnibus from './Omnibus'

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      text: '#eee',
      gradient:
        'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)'
    },
    space: {},
    fonts: {
      sans: 'Synonym',
      serif: 'Amulya',
      mono: "Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono'"
    }
  }
})

export default function HomePage() {
  return (
    <NextUIProvider theme={darkTheme}>
      <Omnibus />
    </NextUIProvider>
  )
}
