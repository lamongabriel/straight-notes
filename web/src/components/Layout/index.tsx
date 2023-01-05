import { ReactNode } from 'react'
import { Flex } from '@chakra-ui/react'

import { Zoom } from 'react-awesome-reveal'

import { Header } from '../Header'

interface LayoutProps {
  children: ReactNode
}

export function Layout ({ children }: LayoutProps) {
  return (
    <Flex
      flexDir='column'
      overflowX='hidden'
      bg='brand.500'
    >
      <Header />
      <Zoom duration={200}>
        <Flex w='100vw' minH='calc(100vh - 70px)' maxWidth="1480px" px={8} mx='auto'>
          {children}
        </Flex>
      </Zoom>
    </Flex>
  )
}
