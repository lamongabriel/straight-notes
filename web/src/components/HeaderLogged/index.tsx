import { UserMenu } from './UserMenu'
import { HeaderDrawer } from './HeaderDrawer'
import { Box, Container, Button, Image } from '@chakra-ui/react'

import logoWhite from '../../assets/images/logo-white.png'

import { List } from 'phosphor-react'

import { useDrawer } from '../../hooks/useDrawer'

import { Link } from 'react-router-dom'

export function HeaderLogged () {
  const { onOpen } = useDrawer()

  return (
    <>
      <Box
        bgColor='brand.500'
        boxShadow='lg'
        height={{ base: '63px', md: '70px' }}
      >
        <Container
          py={4}
          maxW='8xl'
          flexDir='row'
          display='flex'
          gap={8}
          alignItems='center'
          justifyContent='space-between'
          height='full'
        >

          <Box as={Link} to='/notes' display='flex' flexDirection='row' alignItems='center' gap={6}>
            <Image
              display={{ base: 'none', md: 'block' }}
              w={{ base: '100px', md: '120px' }}
              src={logoWhite}
              alt='Straight notes logo'
            />
            <Button colorScheme='whiteAlpha' p={0} onClick={onOpen} variant='ghost'>
              <List size={30} color='#fff' />
            </Button>
          </Box>

          <Box as={Link} to='/notes' display={'flex'}>
            <Image
              display={{ base: 'block', md: 'none' }}
              w='105px'
              src={logoWhite}
              alt='Straight notes logo'
            />
          </Box>

          <UserMenu />

        </Container>
      </Box>

      <HeaderDrawer/>
    </>
  )
}
