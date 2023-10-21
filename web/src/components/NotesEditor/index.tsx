import { useEffect, useState } from 'react'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { Box, Flex, Spinner } from '@chakra-ui/react'

import { toast } from 'react-toastify'

import { useNotes } from '../../hooks/useNotes'
import { NotesServices } from '../../services/notes'

import './quill.css'
import { Empty } from './Empty'
import { SelectNote } from './SelectNote'

export function NotesEditor () {
  const [currentContent, setCurrentContent] = useState('')
  const [timer, setTimer] = useState<any>({})

  const { notes, setNotes, currentNote, setCurrentNote, loading } = useNotes()

  useEffect(() => {
    currentNote && setCurrentContent(currentNote.body)
  }, [currentNote])

  const modules = {
    toolbar: [
      [
        { header: '1' },
        { header: '2' },
        { font: [] }
      ],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' }
      ],
      ['link'],
      ['clean']
    ]
  }

  function handleChange (value: string, delta: any, source: any) {
    clearTimeout(timer)
    if (source === 'user') {
      setCurrentContent(value)
      setTimer(setTimeout(async () => await handleUpdateNote(value), 3000))
    }
  }

  async function handleUpdateNote (fullNote: string) {
    const title = fullNote.replace(/<\/?[^>]+(>|$)/g, '').slice(0, 30)

    const response = await NotesServices.updateNote(currentNote._id, { title, body: fullNote })

    if (response.status === 200) {
      const index = notes.indexOf(currentNote)
      const updatedNotes = [...notes]

      updatedNotes[index] = response.data

      setNotes(updatedNotes)
      setCurrentNote(response.data)
      toast.success('Saved', { autoClose: 1000 })
    }
  }

  if (loading) {
    return (
      <Flex w='full' bg='white' my={8} borderRadius={8} align="center" justify="center">
        <Spinner />
      </Flex>
    )
  }

  return (
    <Box w='full' bg='white' my={8} borderRadius={8} height='full'>
      {currentContent
        ? <ReactQuill value={currentContent} modules={modules} onChange={handleChange}/>
        : notes.length === 0
          ? <Empty />
          : <SelectNote />
      }
    </Box>
  )
}
