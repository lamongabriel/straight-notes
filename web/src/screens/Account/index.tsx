import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Avatar,
  Center,
  ScaleFade,
  InputGroup,
  InputRightElement,
  Box
} from '@chakra-ui/react'

import { Eye, EyeSlash } from 'phosphor-react'

import { User } from '../../types/user'
import { api } from '../../services/api'
import { getAuthorization } from '../../utils/getAuthorization'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

interface FormDataProps {
  name: string
  email: string
  newEmail: string
  password: string
  newPassword: string
}

export function Account () {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    newEmail: '',
    password: '',
    newPassword: ''
  } as FormDataProps)

  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('straightnotes@user') as string) as User

    setFormData(prev => (
      {
        ...prev,
        name: user.name,
        email: user.email
      })
    )
  }, [])

  function handleChange (event: ChangeEvent<HTMLInputElement>) {
    setFormData(prev => ({ ...prev, [event.target.name]: event.target.value }))
  }

  async function handleSubmit (e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formDataWithValidFields = Object.fromEntries(Object.entries(formData).filter(([_, v]) => v.length > 0))

      const response = await api.put('/users', formDataWithValidFields, {
        headers: {
          Authorization: getAuthorization()
        }
      })

      console.log(response.data)

      toast.success('Updated!')
    } catch (error) {
      if (error instanceof AxiosError) {
        return toast.error(error.response?.data.message)
      }
      toast.error('Error!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg='purple.700'
    >
      <Box
        as='form'
        onSubmit={handleSubmit}
        w={'full'}
        maxW={'md'}
        bg={'white'}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
        mx={4}
      >
        <Stack
          spacing={4}
          as={ScaleFade}
          in={true}
        >
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            User Profile Edit
          </Heading>
          <FormControl id="user-icon">
            <FormLabel>User Icon</FormLabel>
            <Stack direction={'column'} spacing={6}>
              <Center>
                <Avatar size="xl"></Avatar>
              </Center>
            </Stack>
          </FormControl>
          <FormControl id="user-name" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              name='name'
              type="text"
              required
              focusBorderColor='black'
              autoComplete='user-name'
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
            />
          </FormControl>
          <FormControl id="user-current-password" isRequired>
            <FormLabel>Current Password</FormLabel>
            <Input
              name='password'
              type='password'
              required
              focusBorderColor='black'
              autoComplete='current-password'
              value={formData.password}
              onChange={handleChange}
              placeholder='What is your current password?'
              disabled={isLoading}
            />
          </FormControl>
          <FormControl id="user-email">
            <FormLabel>New Email address</FormLabel>
            <Input
              name='newEmail'
              type="email"
              focusBorderColor='black'
              autoComplete='email'
              value={formData.newEmail}
              onChange={handleChange}
              disabled={isLoading}
            />
          </FormControl>
          <FormControl id="user-new-password">
            <FormLabel>New Password</FormLabel>
            <InputGroup>
              <Input
                name='newPassword'
                type={showPassword ? 'text' : 'password'}
                focusBorderColor='black'
                autoComplete='new-password'
                value={formData.newPassword}
                onChange={handleChange}
                placeholder='What password would you like?'
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
          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              bg={'red.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'red.500'
              }}
              onClick={() => navigate('/notes')}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              colorScheme={'blue'}
              w="full"
              type='submit'
              disabled={isLoading}
              isLoading={isLoading}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Flex>
  )
}
