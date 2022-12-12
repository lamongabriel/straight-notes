import { ChangeEvent, useState } from 'react'

import { FormControl, FormLabel, InputGroup, Input, InputRightElement, Button } from '@chakra-ui/react'
import { X } from 'phosphor-react'

interface SearchProps {
  fetchNotes: () => void
  searchNotes: (query: string) => void
}

export function Search ({ fetchNotes, searchNotes }: SearchProps) {
  const [query, setQuery] = useState('')

  function handleChange (e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value)
  }

  function handleKeyDown (e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      searchNotes(query)
    }
  }

  function handleRemoveSearch () {
    fetchNotes()
    setQuery('')
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
