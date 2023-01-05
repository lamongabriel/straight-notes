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
  Button,
  Icon
} from '@chakra-ui/react'

import { Note } from '../../types/note'

import { ClockClockwise, Pencil, TrashSimple } from 'phosphor-react'
import { Search } from '../Search'
import { useDrawer } from '../../hooks/useDrawer'
import { useNotes } from '../../hooks/useNotes'
import { NotesServices } from '../../services/notes'

export function HeaderDrawer () {
  const { isOpen, onClose } = useDrawer()
  const { notes, setNotes, currentNote, setCurrentNote } = useNotes()

  function handleSelectNote (note: Note) {
    setCurrentNote(note)
    onClose()
  }

  async function handleDeleteNote (note: Note) {
    const isOkToDelete = window.confirm(`Are you sure you to delete ${note.title}?`)

    if (isOkToDelete) {
      await NotesServices.deleteNote(note._id)

      const temporaryNotes = [...notes]
      const index = temporaryNotes.findIndex(el => note._id === el._id)

      if (index !== -1) {
        temporaryNotes.splice(index, 1)
      }
      setNotes(temporaryNotes)
    }
  }

  async function handleCreateNote () {
    const newNote = await NotesServices.createNote()

    setNotes(prev => ([newNote, ...prev]))
    setCurrentNote(newNote)
  }

  return (
    <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth='1px'>Your notes</DrawerHeader>
        <DrawerBody p={0}>
          <Stack spacing={4}>

            <Search />

            <Flex justifyContent='space-between' alignItems='center' px={4}>
              <Text fontWeight='medium'>{notes.length} Notes</Text>
              <Button size='sm' colorScheme='brand' variant='solid' onClick={handleCreateNote}>Note +</Button>
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
                            color={currentNote._id === note._id ? 'brand.500' : 'inherit'}
                          >
                            {note.title}
                          </Text>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>

                      <Text noOfLines={3} mb={4}>
                        { note.body.replace(/(<([^>]+)>)/ig, '') }
                      </Text>

                      <Flex justifyContent='space-between'>
                        <Button
                          size='sm'
                          colorScheme='brand'
                          variant='outline'
                          onClick={() => handleSelectNote(note)}
                        >
                          <Pencil />
                        </Button>

                        <Button
                          leftIcon={<Icon as={ClockClockwise} />}
                          size='sm'
                          colorScheme='brand'
                          variant='outline'
                        >
                          {moment(note.updatedAt).fromNow()}
                        </Button>

                        <Button
                          size='sm'
                          colorScheme='red'
                          variant='outline'
                          onClick={() => handleDeleteNote(note)}
                        >
                          <TrashSimple />
                        </Button>

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
