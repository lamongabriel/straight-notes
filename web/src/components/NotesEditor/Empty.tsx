import { Box, Heading, Text, Image } from '@chakra-ui/react'

import woman from '../../assets/images/woman.jpg'

export function Empty () {
  return (
    <Box p={6} textAlign='center'>
      <Heading>
        You don't have any notes yet.
      </Heading>
      <Text>
        To start using the app just click on the top and click the <span>Note +</span> button.
      </Text>
      <Image src={woman} maxW='md' w='full' mx='auto' mt={8} alt='A woman secretary sits at a desk and writes. Work in the office.' />
    </Box>
  )
}
