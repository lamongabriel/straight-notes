import { ReactNode } from 'react'
import { Flex } from '@chakra-ui/react'

import { Zoom } from 'react-awesome-reveal'

import { Header } from '../Header'
import { HeaderLogged } from '../HeaderLogged'

interface LayoutProps {
  children: ReactNode
  logged?: boolean
}

export function Layout ({ children, logged = false }: LayoutProps) {
  return (
    <Flex
      flexDir='column'
      overflowX='hidden'
      bg={logged ? 'gray.100' : 'brand.500'}
    >
      {logged ? <HeaderLogged/> : <Header />}
      <Zoom duration={200}>
        <Flex w='100vw' minH='calc(100vh - 70px)' maxWidth="1480px" px={8} mx='auto'>
          {children}
        </Flex>
      </Zoom>
    </Flex>
  )
}
