import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { NotesServices } from '../../services/notes'

import { Note } from '../../types/note'

interface HeaderDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function HeaderDrawer ({ isOpen, onClose }: HeaderDrawerProps) {
  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    NotesServices.fetchNotes().then(response => setNotes(response.data))
  }, [])

  return (
    <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth='1px'>Your notes</DrawerHeader>
        <DrawerBody>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Search</FormLabel>
              <Input type='search' />
            </FormControl>

            <Text fontWeight='medium'>2 Notes</Text>

            <ListNotes notes={notes}/>

          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

interface ListNotesProps {
  notes: Note[]
}

export function ListNotes ({ notes }: ListNotesProps) {
  return (
    <Accordion>
      {notes.map(note => (
        <AccordionItem key={note._id}>
          <h2>
            <AccordionButton>
              <Box flex='1' textAlign='left'>
                <Text noOfLines={1}>{note.title}</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {note.body}
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
