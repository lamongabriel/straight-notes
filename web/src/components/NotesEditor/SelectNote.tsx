import { Box, Heading, Text, Image, Icon } from '@chakra-ui/react'
import { Pencil } from 'phosphor-react'

import pencil from '../../assets/images/pencil.jpg'

export function SelectNote () {
  return (
    <Box p={6} textAlign='center'>
      <Heading>
        Select a note and start editing.
      </Heading>
      <Text>
        Open a note in the side menu and click on the <Icon as={Pencil} fontSize={18} /> to manage this note.
      </Text>
      <Image src={pencil} maxW='md' w='full' mx='auto' mt={8} alt='A woman secretary sits at a desk and writes. Work in the office.' />
    </Box>
  )
}
