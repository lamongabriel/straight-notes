import { useEffect, useState } from 'react'
import moment from 'moment'

import { NotesServices } from '../../services/notes'

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
  Text,
  Flex,
  Badge
} from '@chakra-ui/react'

import { Note } from '../../types/note'

import { Trash } from 'phosphor-react'

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
        <DrawerBody p={0}>
          <Stack spacing={4}>
            <FormControl px={4} pt={2}>
              <FormLabel>Search</FormLabel>
              <Input type='search' />
            </FormControl>

            <Text px={4} fontWeight='medium'>{notes.length} Notes</Text>

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
  const [selectedNote, setSelectedNote] = useState('')

  const sortedNotes = notes.sort(
    (a, b) => (
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
  )

  return (
    <Accordion>
      {sortedNotes.map(note => (
        <AccordionItem key={note._id} onClick={() => setSelectedNote(note._id)}>
          <h2>
            <AccordionButton>
              <Box flex='1' textAlign='left'>
                <Text noOfLines={1} fontWeight='bold'>{note.title}</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Text noOfLines={2} mb={4}>{note.body}</Text>
            <Flex justifyContent='space-between'>
              <Badge colorScheme='green'>Updated {moment(note.updatedAt).fromNow()}</Badge>
              <Trash />
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
