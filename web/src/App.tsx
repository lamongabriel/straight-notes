import { DrawerContextProvider } from './contexts/drawerContext'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from './contexts/auth'

import { ToastContainer } from 'react-toastify'

import { Router } from './routes'

import 'react-toastify/dist/ReactToastify.css'
import './styles/global.css'

export function App () {
  return (
    <ChakraProvider>
      <AuthProvider>
        <DrawerContextProvider>
          <Router />
          <ToastContainer />
        </DrawerContextProvider>
      </AuthProvider>
    </ChakraProvider>
  )
}
