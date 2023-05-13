import { createTheme, NextUIProvider } from '@nextui-org/react';
import useDarkMode from 'use-dark-mode';

import Omnibus from './Omnibus';

const darkTheme = createTheme({
  type: 'dark',
  theme: {
   // colors: {...},
  }
})


export default function App() {

  return (
    <NextUIProvider theme={darkTheme}>
      <Omnibus />
    </NextUIProvider>
  )
}
