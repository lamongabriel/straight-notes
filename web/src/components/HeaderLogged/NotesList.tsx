import React, { useRef, useState } from 'react'
import moment from 'moment'

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useDisclosure
} from '@chakra-ui/react'

import { ClockClockwise, Pencil, TrashSimple } from 'phosphor-react'

import { Note } from '../../types/note'

import { useNotes } from '../../hooks/useNotes'
import { useDrawer } from '../../hooks/useDrawer'

import { NotesServices } from '../../services/notes'

export function NotesList () {
  const cancelRef = useRef<HTMLButtonElement>(null)
  const [noteToDelete, setNoteToDelete] = useState({} as Note)

  const { onClose } = useDrawer()
  const { notes, setNotes, currentNote, setCurrentNote } = useNotes()

  const { isOpen: isOpenDelete, onClose: closeDelete, onOpen: openDelete } = useDisclosure()

  function handleSelectNote (note: Note) {
    setCurrentNote(note)
    onClose()
  }

  async function handleDeleteNote () {
    if (!noteToDelete) return

    await NotesServices.deleteNote(noteToDelete._id)

    const temporaryNotes = [...notes]
    const index = temporaryNotes.findIndex(el => noteToDelete._id === el._id)

    if (index !== -1) {
      temporaryNotes.splice(index, 1)
    }

    closeDelete()
    setNotes(temporaryNotes)
  }

  function openDeleteAlert (note: Note) {
    setNoteToDelete(note)
    openDelete()
  }

  return (

    <>
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
                  {note.body.replace(/(<([^>]+)>)/ig, '')}
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
                    onClick={() => openDeleteAlert(note)}
                  >
                    <TrashSimple />
                  </Button>

                </Flex>
              </AccordionPanel>
            </AccordionItem>
          ))
        }
      </Accordion>
      <AlertDialog
        isOpen={isOpenDelete}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete {noteToDelete.title}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={closeDelete}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleDeleteNote} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
