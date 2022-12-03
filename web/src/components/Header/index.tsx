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
  primary?: boolean
}

export function Header ({ primary = false }: HeaderProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box bgColor={primary ? 'purple.700' : 'white'} boxShadow='lg' borderBottom={primary ? 'none' : 'solid 1px #ccc'}>
        <Container
          py={4}
          maxW='full'
          flexDir='row'
          display='flex'
          gap={8}
          alignItems='center'
        >

          {primary && <Box>
            <Button colorScheme='whiteAlpha' onClick={onOpen} variant='ghost'>
              <List size={24} color='#fff' />
            </Button>
          </Box>}

          <Box flex={1} maxH='60px'>
            <Image w='130px' src={primary ? logoWhite : logoColor} alt='Straight notes logo'/>
          </Box>

          <Box>
            {!primary &&
              <HStack>
                <Button colorScheme='purple' onClick={onOpen} variant='ghost'>
                  Login
                </Button>
                <Button colorScheme='purple' onClick={onOpen} variant='solid'>
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
