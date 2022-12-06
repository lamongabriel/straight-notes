import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Text
} from '@chakra-ui/react'

import { Link as RouterLink } from 'react-router-dom'

export function LoginForm () {
  return (
    <Box
      rounded={'lg'}
      bg={'white'}
      boxShadow={'lg'}
      p={8}
    >
      <Stack spacing={4}>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input type="email" />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" />
        </FormControl>
        <Stack spacing={10}>
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            align={'start'}
            justify={'space-between'}>
            <Checkbox>Remember me</Checkbox>
            <Link color={'blue.400'}>Forgot password?</Link>
          </Stack>
          <Button
            colorScheme='purple'
            loadingText="Loading"
            size="lg"
            type='submit'
          >
            Sign in
          </Button>
        </Stack>
      </Stack>
      <Stack pt={6}>
        <Text align={'center'}>
          Don't have an account? <Link to='/register' as={RouterLink} color={'blue.400'} >Register</Link>
        </Text>
      </Stack>
    </Box>
  )
}
