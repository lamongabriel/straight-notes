import { Link } from 'react-router-dom'

import {
  Box,
  Stack,
  Heading,
  Text,
  Image,
  Flex
} from '@chakra-ui/react'

import logo from '../../assets/images/logo-white.png'

import { Layout } from '../../components/Layout'
import { LoginForm } from '../../components/auth/LoginForm'

export function Login () {
  return (
    <Layout>
      <Flex
        align='center'
        justify='center'
        flexDir='column'
        w='full'
        maxW='xl'
        mx='auto'
        py={12}
        gap={6}
      >
        <Stack align={'center'}>
          <Box mb={4} maxW='160px' as={Link} to='/' >
            <Image src={logo} />
          </Box>
          <Heading color={'white'} fontSize={{ base: '2xl', lg: '4xl' }} textAlign={'center'}>
            Your notes on the cloud
          </Heading>
          <Text fontSize={'lg'} color={'white'} textAlign={'center'}>
              Welcome back, we've missed you 💗
          </Text>
        </Stack>

        <LoginForm />

      </Flex>
    </Layout>
  )
}
