import { RegisterForm } from '../../components/auth/RegisterForm'
import { Link } from 'react-router-dom'

import {
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  Image,
  ScaleFade
} from '@chakra-ui/react'

import logo from '../../assets/images/logo-white.png'

export function Register () {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg='purple.700'
    >
      <Stack as={ScaleFade} in={true} spacing={8} mx={'auto'} maxW={'lg'} w='full' py={12} px={6}>
        <Stack align={'center'}>
          <Box mb={4} maxW='200px' as={Link} to='/' >
            <Image src={logo} />
          </Box>
          <Heading color={'white'} fontSize={{ base: '2xl', lg: '4xl' }} textAlign={'center'}>
            Your notes on the cloud
          </Heading>
          <Text fontSize={'lg'} color={'white'} textAlign={'center'}>
            Create, edit and view you notes anywhere in the world
          </Text>
        </Stack>

        <RegisterForm />

      </Stack>
    </Flex>
  )
}
