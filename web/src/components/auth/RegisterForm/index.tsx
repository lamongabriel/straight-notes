import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { useAuth } from '../../../hooks/useAuth'

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

  const { register } = useAuth()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  function handleFormDataChange (event: React.FormEvent<HTMLInputElement>) {
    setFormData({ ...formData, [event.currentTarget.name]: event.currentTarget.value })
  }

  async function handleSubmit (event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    await register(formData)
    setIsLoading(false)
  }

  return (
    <Box
      className='register__form'
      rounded={'lg'}
      bg={'white'}
      boxShadow={'lg'}
      p={8}
      w='full'
    >
      <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} onSubmit={handleSubmit}>
        <FormControl id="name" isRequired>
          <FormLabel>Your name</FormLabel>
          <Input
            name='name'
            type="text"
            required
            focusBorderColor='black'
            onChange={handleFormDataChange}
            value={formData.name}
            autoComplete='name'
            disabled={isLoading}
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
            autoComplete='email'
            disabled={isLoading}
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
              autoComplete='current-password'
              disabled={isLoading}
            />
            <InputRightElement h={'full'}>
              <Button
                variant={'ghost'}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
                style={{ padding: 0 }}
                disabled={isLoading}
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
            colorScheme='brand'
            isLoading={isLoading}
            type='submit'
          >
            Sign up
          </Button>
        </Stack>
        <Stack pt={6}>
          <Text align={'center'}>
            Already a user? <Link to='/login' as={RouterLink} color={'blue.400'}>Login</Link>
          </Text>
        </Stack>
      </form>
    </Box>
  )
}
