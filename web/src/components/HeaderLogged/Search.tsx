import { ChangeEvent, useState } from 'react'

import { useNotes } from '../../hooks/useNotes'

import { FormControl, FormLabel, InputGroup, Input, InputRightElement, Button } from '@chakra-ui/react'

import { X } from 'phosphor-react'

import { NotesServices } from '../../services/notes'

export function Search () {
  const [query, setQuery] = useState('')
  const { setNotes } = useNotes()

  function handleChange (e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value)
  }

  function handleKeyDown (e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      searchNotes(query)
    }
  }

  function handleRemoveSearch () {
    setQuery('')
  }

  async function searchNotes (query: string) {
    const response = await NotesServices.searchNote(query)
    setNotes(response.data)
  }

  return (
    <FormControl px={4} pt={2} id="search">
      <FormLabel>Search</FormLabel>
      <InputGroup>
        <Input
          name='sarch'
          type='text'
          focusBorderColor='black'
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
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
    </FormControl>
  )
}
