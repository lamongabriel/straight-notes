import { ChakraProvider } from '@chakra-ui/react'
import { Header } from './components/Header'

import './styles/global.css'

export function App () {
  return (
    <ChakraProvider>
      <Header />
    </ChakraProvider>
  )
}
