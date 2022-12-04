import { ChakraProvider } from '@chakra-ui/react'
import { Router } from './routes'

import './styles/global.css'

export function App () {
  return (
    <ChakraProvider>
      <Router />
    </ChakraProvider>
  )
}
