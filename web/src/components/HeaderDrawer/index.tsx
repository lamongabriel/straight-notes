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
  Badge,
  Button
} from '@chakra-ui/react'

import { Note } from '../../types/note'

import { Trash } from 'phosphor-react'

interface HeaderDrawerProps {
  isOpen: boolean
  onClose: () => void
  currentNote: Note
  setCurrentNote: (note: Note) => void
}

export function HeaderDrawer ({ isOpen, onClose, currentNote, setCurrentNote }: HeaderDrawerProps) {
  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    fetchNotes()
  }, [])

  async function fetchNotes () {
    const { data } = await NotesServices.listNotes()
    const sortedNotes = data.sort(
      (a: Note, b: Note) => (
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
    )
    setNotes(sortedNotes)
    setCurrentNote(sortedNotes[0])
  }

  async function createNote () {
    await NotesServices.createNote()
    fetchNotes()
  }

  async function deleteNote (id: string) {
    await NotesServices.deleteNote(id)
    fetchNotes()
  }

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

            <Flex justifyContent='space-between' alignItems='center' px={4}>
              <Text fontWeight='medium'>{notes.length} Notes</Text>
              <Button size='sm' colorScheme='purple' variant='solid' onClick={createNote}>Note +</Button>
            </Flex>

            <Accordion>
              {
                notes.map(note => (
                  <AccordionItem key={note._id}>
                    <h2>
                      <AccordionButton>
                        <Box flex='1' textAlign='left'>
                          <Text
                            noOfLines={1}
                            fontWeight='bold'
                            color={currentNote._id === note._id ? 'purple.500' : 'inherit'}
                          >
                            {note.title}
                          </Text>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} onClick={() => { setCurrentNote(note); onClose() }} cursor='pointer'>
                      <Text noOfLines={3} mb={4}>{note.body}</Text>
                      <Flex justifyContent='space-between'>
                        <Badge colorScheme='green'>Updated {moment(note.updatedAt).fromNow()}</Badge>
                        <Box onClick={async () => await deleteNote(note._id)} _hover={{ transform: 'scale(1.3)' }} transition='200ms'>
                          <Trash />
                        </Box>
                      </Flex>
                    </AccordionPanel>
                  </AccordionItem>
                ))
              }
            </Accordion>

          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
