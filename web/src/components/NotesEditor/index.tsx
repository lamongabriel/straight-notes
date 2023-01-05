import { useEffect, useState } from 'react'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { Box } from '@chakra-ui/react'

import { toast } from 'react-toastify'

import { useNotes } from '../../hooks/useNotes'
import { NotesServices } from '../../services/notes'

import './quill.css'

export function NotesEditor () {
  const [currentContent, setCurrentContent] = useState('')
  const [timer, setTimer] = useState<any>({})

  const { notes, setNotes, currentNote, setCurrentNote } = useNotes()

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

  return (
    <Box w='full' bg='white' my={4} borderRadius={8} height='full'>
      <ReactQuill value={currentContent} modules={modules} onChange={handleChange}/>
    </Box>
  )
}
