import {
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  Image
} from '@chakra-ui/react'

import logo from '../../assets/images/logo-white.png'
import { LoginForm } from '../../components/auth/LoginForm'

export function Login () {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg='purple.700'
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Box mb={4}>
            <Image src={logo} />
          </Box>
          <Heading color={'white'} fontSize={'4xl'} textAlign={'center'}>
            Your notes on the cloud
          </Heading>
          <Text fontSize={'lg'} color={'white'}>
            Welcome back, we've missed you 💗
          </Text>
        </Stack>

        <LoginForm />

      </Stack>
    </Flex>
  )
}
