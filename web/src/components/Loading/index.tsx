import { Spinner, Box } from '@chakra-ui/react'

export function Loading () {
  return (
    <Box backgroundColor='brand.500' display='flex' justifyContent='center' alignItems='center' minH='100vh' minW='100vw'>
      <Spinner size='xl' color='white'/>
    </Box>
  )
}
