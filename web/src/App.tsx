import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from './contexts/auth'

import { ToastContainer } from 'react-toastify'

import { Router } from './routes'

import 'react-toastify/dist/ReactToastify.css'
import './styles/global.css'

import { NotesContextProvider } from './contexts/NotesContext'
import { DrawerContextProvider } from './contexts/DrawerContext'

export function App () {
  return (
    <ChakraProvider>
      <AuthProvider>
        <NotesContextProvider>
          <DrawerContextProvider>
            <Router />
            <ToastContainer />
          </DrawerContextProvider>
        </NotesContextProvider>
      </AuthProvider>
    </ChakraProvider>
  )
}
