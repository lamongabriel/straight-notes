import { Link } from 'react-router-dom'

import logoColor from '../../assets/images/logo.png'

import {
  Box,
  Container,
  Button,
  Image,
  HStack
} from '@chakra-ui/react'

export function Header () {
  return (
    <>
      <Box
        bgColor='white'
        boxShadow='lg'
        height='70px'
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

          <Box as={Link} to='/' display='flex' flexDirection='row' alignItems='center' gap={6}>
            <Image
              display={'block'}
              w={{ base: '100px', md: '120px' }}
              src={logoColor}
              alt='Straight notes logo'
            />
          </Box>

          <Box>
            <HStack>
              <Button
                size={{ base: 'sm', md: 'md' }}
                as={Link}
                to='/login'
                colorScheme='brand'
                variant='ghost'
              >
                Login
              </Button>
              <Button size={{ base: 'sm', md: 'md' }} as={Link} to='/register' colorScheme='brand' variant='solid'>
                Sign up
              </Button>
            </HStack>

          </Box>
        </Container>
      </Box>
    </>
  )
}
