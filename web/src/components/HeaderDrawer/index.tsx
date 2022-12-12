import moment from 'moment'

import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
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
import { Search } from '../Search'

interface HeaderDrawerProps {
  isOpen: boolean
  onClose: () => void

  currentNote: Note
  setCurrentNote: (note: Note) => void

  notes: Note[]
  fetchNotes: () => void
  createNote: () => void
  deleteNote: (id: string) => void
  searchNotes: (query: string) => void
}

export function HeaderDrawer (
  {
    isOpen,
    onClose,
    currentNote,
    setCurrentNote,
    notes,
    fetchNotes,
    createNote,
    deleteNote,
    searchNotes
  }: HeaderDrawerProps
) {
  function handleSelectNote (note: Note) {
    setCurrentNote(note)
    onClose()
  }

  return (
    <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth='1px'>Your notes</DrawerHeader>
        <DrawerBody p={0}>
          <Stack spacing={4}>

            <Search fetchNotes={fetchNotes} searchNotes={searchNotes} />

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
                    <AccordionPanel pb={4} onClick={() => handleSelectNote(note)} cursor='pointer'>

                      <Text noOfLines={3} mb={4}>
                        { note.body.replace(/(<([^>]+)>)/ig, '') }
                      </Text>

                      <Flex justifyContent='space-between'>
                        <Badge colorScheme='green'>Updated {moment(note.updatedAt).fromNow()}</Badge>
                        <Box onClick={async () => deleteNote(note._id)} _hover={{ transform: 'scale(1.3)' }} transition='200ms'>
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
