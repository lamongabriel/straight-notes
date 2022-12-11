import logoWhite from '../../assets/images/logo-white.png'
import logoColor from '../../assets/images/logo.png'

import {
  Box,
  Container,
  Button,
  Image,
  HStack,
  MenuList,
  Center,
  MenuDivider,
  MenuItem,
  Menu,
  MenuButton
} from '@chakra-ui/react'

import { List, User } from 'phosphor-react'
import { Link } from 'react-router-dom'
import { HeaderDrawer } from '../HeaderDrawer'
import { Note } from '../../types/note'

interface HeaderProps {
  loggedIn?: boolean

  isOpen?: boolean
  onOpen?: () => void
  onClose?: () => void

  currentNote: Note
  setCurrentNote: (note: Note) => void
}

export function Header (
  {
    loggedIn = false,
    isOpen = false,
    onClose,
    onOpen,
    currentNote,
    setCurrentNote
  }: HeaderProps
) {
  return (
    <>
      <Box
        bgColor={loggedIn ? 'purple.700' : 'white'}
        boxShadow='lg'
        borderBottom={loggedIn ? 'none' : 'solid 1px #ccc'}
        height={{ base: '60px', md: '70px' }}
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
              display={loggedIn ? { base: 'none', md: 'block' } : 'block'}
              w={{ base: '100px', md: '120px' }}
              src={loggedIn ? logoWhite : logoColor}
              alt='Straight notes logo'
            />
            {loggedIn &&
              <Button colorScheme='whiteAlpha' p={0} onClick={onOpen} variant='ghost'>
                <List size={30} color='#fff' />
              </Button>
            }
          </Box>

          <Box display={loggedIn ? 'flex' : 'none'}>
            <Image
              display={{ base: 'block', md: 'none' }}
              w='100px'
              src={logoWhite}
              alt='Straight notes logo'
            />
          </Box>

          <Box>
            {loggedIn
              ? <Menu>
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
                      <p>Username</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem>Logout</MenuItem>
                  </MenuList>
                </Menu>
              : <HStack>
                <Button size={{ base: 'sm', md: 'md' }} as={Link} to='/login' colorScheme='purple' variant='ghost'>
                  Login
                </Button>
                <Button size={{ base: 'sm', md: 'md' }} as={Link} to='/register' colorScheme='purple' variant='solid'>
                  Sign up
                </Button>
              </HStack>
            }
          </Box>
        </Container>
      </Box>
      {onClose &&
        <HeaderDrawer isOpen={isOpen} onClose={onClose} currentNote={currentNote} setCurrentNote={setCurrentNote} />
      }
    </>
  )
}
