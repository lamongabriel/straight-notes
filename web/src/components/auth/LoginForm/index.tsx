import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { useAuth } from '../../../hooks/useAuth'

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Text,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react'

import { Eye, EyeSlash } from 'phosphor-react'

export function LoginForm () {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: true
  })

  function handleFormDataChange (event: React.FormEvent<HTMLInputElement>) {
    setFormData({ ...formData, [event.currentTarget.name]: event.currentTarget.value })
  }

  async function handleSubmit (event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    await login(formData)
    setIsLoading(false)
  }

  return (
    <Box
      className='login__form'
      rounded={'lg'}
      bg={'white'}
      boxShadow={'lg'}
      p={8}
      w='full'
    >
      <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} onSubmit={handleSubmit}>
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
        <Button
            colorScheme='brand'
            loadingText="Loading"
            size="lg"
            type='submit'
            isLoading={isLoading}
          >
            Sign in
          </Button>
      </form>
      <Stack pt={6}>
        <Text align={'center'}>
          Don't have an account? <Link to='/register' as={RouterLink} color={'blue.400'} >Register</Link>
        </Text>
      </Stack>
    </Box>
  )
}
