import { useNavigate } from 'react-router-dom'
import { HeaderDrawer } from './HeaderDrawer'

import logoWhite from '../../assets/images/logo-white.png'

import {
  Box,
  Container,
  Button,
  Image,
  MenuList,
  Center,
  MenuDivider,
  MenuItem,
  Menu,
  MenuButton
} from '@chakra-ui/react'

import { List, User } from 'phosphor-react'

import { useAuth } from '../../hooks/useAuth'
import { useDrawer } from '../../hooks/useDrawer'

export function HeaderLogged () {
  const { logout } = useAuth()
  const { onOpen } = useDrawer()
  const navigate = useNavigate()

  const { name } = JSON.parse(localStorage.getItem('straightnotes@user') as string)

  return (
    <>
      <Box
        bgColor={'purple.700'}
        boxShadow='lg'
        height={{ base: '63px', md: '70px' }}
      >
        <Container
          py={4}
          maxW='8xl'
          flexDir='row'
          display='flex'
          gap={8}
          alignItems='center'
          justifyContent='space-between'
          height='full'
        >

          <Box display='flex' flexDirection='row' alignItems='center' gap={6}>
            <Image
              display={{ base: 'none', md: 'block' }}
              w={{ base: '100px', md: '120px' }}
              src={logoWhite}
              alt='Straight notes logo'
            />
            <Button colorScheme='whiteAlpha' p={0} onClick={onOpen} variant='ghost'>
              <List size={30} color='#fff' />
            </Button>
          </Box>

          <Box display={'flex'}>
            <Image
              display={{ base: 'block', md: 'none' }}
              w='105px'
              src={logoWhite}
              alt='Straight notes logo'
            />
          </Box>

          <Box>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                display={'flex'}
                minW={0}
              >
                <User color='#fff' size={30} />
              </MenuButton>
              <MenuList alignItems={'center'}>
                <br />
                <Center>
                  <User size={92} />
                </Center>
                <br />
                <Center>
                  <p>{name}</p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem onClick={() => navigate('/account')}>Account Settings</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Container>
      </Box>

      <HeaderDrawer/>
    </>
  )
}
