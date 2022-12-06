import {
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  Image
} from '@chakra-ui/react'

import { RegisterForm } from '../../components/auth/RegisterForm'

import logo from '../../assets/images/logo-white.png'

export function Register () {
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
            Register
          </Heading>
          <Text fontSize={'lg'} color={'white'}>
            Create, edit and view you notes anywhere in the world
          </Text>
        </Stack>

        <RegisterForm />

      </Stack>
    </Flex>
  )
}
