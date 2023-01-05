import { ChangeEvent, useState } from 'react'
import { NotesServices } from '../../services/notes'

import { useNotes } from '../../hooks/useNotes'

import { FormControl, FormLabel, InputGroup, Input, InputRightElement, Button, Box } from '@chakra-ui/react'

import { X } from 'phosphor-react'

export function Search () {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { notes, setNotes, setCurrentNote } = useNotes()

  function handleChange (e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value)
  }

  async function handleRemoveSearch () {
    try {
      setIsLoading(true)

      setQuery('')

      const notes = await NotesServices.listNotes()
      if (notes.length > 0) {
        setCurrentNote(notes[0])
      }

      setNotes(notes)
    } catch {} finally {
      setIsLoading(false)
    }
  }

  async function searchNotes () {
    try {
      setIsLoading(true)

      const temporaryNotes = notes.filter(note => (
        note.body.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      ))

      setNotes(temporaryNotes)
    } catch {} finally {
      setIsLoading(false)
    }
  }

  return (
    <Box px={4} pt={4} pb={2} borderBottomWidth='1px'>
      <FormControl id="search" isDisabled={isLoading}>
        <FormLabel>Search</FormLabel>
        <InputGroup>
          <Input
            name='search'
            type='text'
            focusBorderColor='black'
            value={query}
            onChange={handleChange}
          />
          <InputRightElement h={'full'}>
            <Button
              variant={'ghost'}
              style={{ padding: 0 }}
              onClick={handleRemoveSearch}
            >
              <X />
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button
          disabled={query.length === 0}
          mt={4}
          w='full'
          variant='ghost'
          colorScheme='brand'
          size='sm'
          onClick={searchNotes}
        >
          Search it!
        </Button>
      </FormControl>
    </Box>
  )
}
