import React, { useState } from 'react'

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
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  function handleFormDataChange (event: React.FormEvent<HTMLInputElement>) {
    setFormData({ ...formData, [event.currentTarget.name]: event.currentTarget.value })
  }

  function handleSubmit () {
    setIsLoading(true)
  }

  return (
    <Box
      className='register__form'
      rounded={'lg'}
      bg={'white'}
      boxShadow={'lg'}
      p={8}
    >
      <Stack spacing={4}>
        <FormControl id="name" isRequired>
          <FormLabel>Your name</FormLabel>
          <Input
            name='name'
            type="text"
            required
            focusBorderColor='black'
            onChange={handleFormDataChange}
            value={formData.name}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            name='email'
            type="email"
            required
            focusBorderColor='black'
            onChange={handleFormDataChange}
            value={formData.email}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              name='password'
              type={showPassword ? 'text' : 'password'}
              required
              focusBorderColor='black'
              onChange={handleFormDataChange}
              value={formData.password}
            />
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
            isLoading={isLoading}
            onClick={handleSubmit}
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
