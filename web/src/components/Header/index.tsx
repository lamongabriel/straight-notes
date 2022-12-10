import logoWhite from '../../assets/images/logo-white.png'
import logoColor from '../../assets/images/logo.png'

import {
  Box,
  Container,
  Button,
  Image,
  HStack
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
        height='70px'
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
            <Image w='120px' src={loggedIn ? logoWhite : logoColor} alt='Straight notes logo'/>
            {loggedIn &&
              <Button colorScheme='whiteAlpha' onClick={onOpen} variant='ghost'>
                <List size={32} color='#fff' />
              </Button>
            }
          </Box>

          <Box alignSelf='flex-end'>
            {loggedIn
              ? <Button colorScheme='whiteAlpha' variant='ghost'>
                  <User size={32} color='#fff' />
                </Button>
              : <HStack>
                  <Button as={Link} to='/login' colorScheme='purple' variant='ghost'>
                    Login
                  </Button>
                  <Button as={Link} to='/register' colorScheme='purple' variant='solid'>
                    Sign up
                  </Button>
                </HStack>
            }
          </Box>

        </Container>
      </Box>
      {onClose &&
        <HeaderDrawer isOpen={isOpen} onClose={onClose} currentNote={currentNote} setCurrentNote={setCurrentNote}/>
      }
    </>
  )
}
