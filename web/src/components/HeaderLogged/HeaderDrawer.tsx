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

interface HeaderDrawerProps {
  currentNote: Note
  setCurrentNote: (note: Note) => void

  notes: Note[]
  fetchNotes: () => Promise<void>
  createNote: () => Promise<void>
  deleteNote: (id: string) => Promise<void>
  searchNotes: (query: string) => Promise<void>
}

export function HeaderDrawer (
  {
    currentNote,
    setCurrentNote,
    notes,
    fetchNotes,
    createNote,
    deleteNote,
    searchNotes
  }: HeaderDrawerProps
) {
  const { isOpen, onClose } = useDrawer()

  function handleSelectNote (note: Note) {
    setCurrentNote(note)
    onClose()
  }

  async function handleDeleteNote (note: Note) {
    const isOkToDelete = window.confirm(`Are you sure you to delete ${note.title}?`)
    if (isOkToDelete) {
      await deleteNote(note._id)
    }
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
                    <AccordionPanel pb={4}>

                      <Text noOfLines={3} mb={4}>
                        { note.body.replace(/(<([^>]+)>)/ig, '') }
                      </Text>

                      <Flex justifyContent='space-between'>
                        <Button
                          size='sm'
                          colorScheme='purple'
                          variant='outline'
                          onClick={() => handleSelectNote(note)}
                        >
                          <Pencil />
                        </Button>

                        <Button
                          leftIcon={<Icon as={ClockClockwise} />}
                          size='sm'
                          colorScheme='purple'
                          variant='outline'
                        >
                          {moment(note.updatedAt).fromNow()}
                        </Button>

                        <Button
                          size='sm'
                          colorScheme='red'
                          variant='outline'
                          onClick={async () => await handleDeleteNote(note)}
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
