import { ReactNode } from 'react'
import { Flex } from '@chakra-ui/react'

import { Fade, Slide } from 'react-awesome-reveal'

import { Header } from '../Header'

interface LayoutProps {
  children: ReactNode
}

export function Layout ({ children }: LayoutProps) {
  return (
    <Flex
      flexDir='column'
      overflowX='hidden'
      bg='purple.800'
      bgGradient='linear-gradient(90deg, rgba(95,10,135,1) 0%, rgba(142,71,156,1) 100%)'
    >
      <Slide direction='down'>
        <Header />
      </Slide>
      <Fade>
        <Flex w='100vw' minH='calc(100vh - 70px)' maxWidth="1480px" px={8} mx='auto'>
          {children}
        </Flex>
      </Fade>
    </Flex>
  )
}
