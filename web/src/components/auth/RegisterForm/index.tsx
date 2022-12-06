import { useState } from 'react'

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Link,
  Text
} from '@chakra-ui/react'

import { Eye, EyeSlash } from 'phosphor-react'

export function RegisterForm () {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Box
      className='register__form'
      rounded={'lg'}
      bg={'white'}
      boxShadow={'lg'}
      p={8}
    >
      <Stack spacing={4}>
        <FormControl id="firstName" isRequired>
          <FormLabel>First Name</FormLabel>
          <Input type="text" required focusBorderColor='black' />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input type="email" required focusBorderColor='black' />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input type={showPassword ? 'text' : 'password'} required focusBorderColor='black' />
            <InputRightElement h={'full'}>
              <Button
                variant={'ghost'}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
                style={{ padding: 0 }}
              >
                {showPassword ? <Eye size={18} /> : <EyeSlash size={18} />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Stack spacing={10} pt={2}>
          <Button
            loadingText="Submitting"
            size="lg"
            colorScheme='purple'
          >
            Sign up
          </Button>
        </Stack>
        <Stack pt={6}>
          <Text align={'center'}>
            Already a user? <Link color={'blue.400'}>Login</Link>
          </Text>
        </Stack>
      </Stack>
    </Box>
  )
}
