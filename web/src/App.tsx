import { ChakraProvider } from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './contexts/auth'

import { Router } from './routes'

import 'react-toastify/dist/ReactToastify.css'
import './styles/global.css'

export function App () {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Router />
        <ToastContainer />
      </AuthProvider>
    </ChakraProvider>
  )
}
