import { ChakraProvider } from '@chakra-ui/react'
import { Home } from './screens/Home'

import './styles/global.css'

export function App () {
  return (
    <ChakraProvider>
      <Home />
    </ChakraProvider>
  )
}
