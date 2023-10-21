import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  Text,
  Flex,
  Button,
  Heading
} from '@chakra-ui/react'

import { Search } from './Search'
import { useDrawer } from '../../hooks/useDrawer'
import { useNotes } from '../../hooks/useNotes'
import { NotesServices } from '../../services/notes'
import { NotesList } from './NotesList'

export function HeaderDrawer () {
  const { isOpen, onClose } = useDrawer()
  const { notes, setNotes, setCurrentNote } = useNotes()

  async function handleCreateNote () {
    const newNote = await NotesServices.createNote()

    setNotes([newNote, ...notes])
    setCurrentNote(newNote)
  }

  return (
    <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth='1px'>
          <Heading size='md'>Your notes</Heading>
        </DrawerHeader>
        <DrawerBody p={0}>
          <Stack spacing={4}>

            <Search />

            <Flex justifyContent='space-between' alignItems='center' px={4}>
              <Text fontWeight='medium'>{notes.length} Notes</Text>
              <Button size='sm' colorScheme='brand' variant='solid' onClick={handleCreateNote}>Note +</Button>
            </Flex>

            <NotesList />

          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
