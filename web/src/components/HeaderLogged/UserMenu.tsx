import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text
} from '@chakra-ui/react'

import { useNavigate } from 'react-router'
import { useAuth } from '../../hooks/useAuth'

import { User } from '../../types/user'

export function UserMenu () {
  const navigate = useNavigate()
  const { logout } = useAuth()

  let user: User = {} as User
  try {
    const local = localStorage.getItem('straightnotes@user')
    if (local) {
      user = JSON.parse(local)
    }
  } catch {
    localStorage.clear()
  }

  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={'full'}
        variant={'link'}
        cursor={'pointer'}
        display={'flex'}
        minW={0}
      >
        <Flex align='center' justify='center' gap={6}>
          <Box textAlign='right'>
            <Heading size='md' color='gray.100' fontWeight='medium'>{user.name}</Heading>
            <Text color='gray.400' fontSize='xs' fontWeight='normal'>{user.email}</Text>
          </Box>
          <Avatar name={user.name} bg='red.400'>

          </Avatar>
        </Flex>
      </MenuButton>
      <MenuList alignItems={'center'}>
        <Flex
          w='full'
          px={4}
          py={8}
          flexDir='column'
          gap={4}
          alignItems='center'
          justifyContent='center'
        >

          <Avatar name={user.name} bg='red.400'>

          </Avatar>
          <Heading size='md'>
            {user.name}
          </Heading>
        </Flex>
        <MenuDivider />
        <Box>
          <MenuItem onClick={() => navigate('/account')}>Account Settings</MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Box>
      </MenuList>
    </Menu>
  )
}