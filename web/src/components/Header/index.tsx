import logoWhite from '../../assets/images/logo-white.png'
import logoColor from '../../assets/images/logo.png'

import {
  Box,
  Container,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Image,
  HStack
} from '@chakra-ui/react'

import { List } from 'phosphor-react'

interface HeaderProps {
  loggedIn?: boolean
}

export function Header ({ loggedIn = false }: HeaderProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

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
          height='full'
        >

          {loggedIn && <Box>
            <Button colorScheme='whiteAlpha' onClick={onOpen} variant='ghost'>
              <List size={24} color='#fff' />
            </Button>
          </Box>}

          <Box flex={1}>
            <Image w='130px' src={loggedIn ? logoWhite : logoColor} alt='Straight notes logo'/>
          </Box>

          <Box>
            {!loggedIn &&
              <HStack>
                <Button colorScheme='purple' variant='ghost'>
                  Login
                </Button>
                <Button colorScheme='purple' variant='solid'>
                  Sign up
                </Button>
              </HStack>
            }

          </Box>
        </Container>
      </Box>

      <HeaderDrawer isOpen={isOpen} onClose={onClose} />
    </>
  )
}

interface HeaderDrawerProps {
  isOpen: boolean
  onClose: () => void
}

function HeaderDrawer ({ isOpen, onClose }: HeaderDrawerProps) {
  return (
    <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader>
        <DrawerBody>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
