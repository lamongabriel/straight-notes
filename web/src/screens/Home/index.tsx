import { Header } from '../../components/Header'

import {
  Box,
  Image,
  Container,
  Text,
  Heading,
  Stack,
  Button
} from '@chakra-ui/react'

import presentation from '../../assets/images/presentation.png'

export function Home () {
  return (
    <Box minH='100vh' bg='purple.700' w='full'>
      <Header />
      <Container
        display='flex'
        minH='calc(100vh - 70px)'
        alignItems='center'
        flexDirection={{ base: 'column', lg: 'row' }}
        justifyContent={{ base: 'center', lg: 'space-between' }}
        py={{ base: 8, lg: 'none' }}
        gap={{ base: 8, lg: 'none' }}
        maxW='8xl'
        w='full'
      >
        <Stack spacing={6} maxW='500px' order={{ base: 1, lg: 0 }}>
          <Heading color='white' fontSize={{ base: '4xl', lg: '5xl' }}>
            Create notes easily and access then when you need on the cloud.
          </Heading>
          <Text color='white'>
            Straight notes let's you create your notes and safely store then in the cloud for you to access when you want.
          </Text>
          <Text color='white'>
            It's free! just create your account and start using it, we will never bill you anything.
          </Text>
          <Button color='white' variant='outline' size='lg' border='2px' _hover={{ bg: 'white', color: 'purple.700' }}>
            Register for free now
          </Button>
        </Stack>
        <Image src={presentation} maxW={{ base: '90%', md: '500px', lg: '460px', xl: '600px' }}/>
      </Container>
    </Box>
  )
}
