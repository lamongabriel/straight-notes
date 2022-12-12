import { useEffect, useState } from 'react'
import { Note } from '../../types/note'

import ReactQuill, { } from 'react-quill'

import 'react-quill/dist/quill.snow.css'

import {
  Container
} from '@chakra-ui/react'
import { toast } from 'react-toastify'

interface NotesEditorProps {
  note: Note
  updateNote: (oldNote: Note, params: { title: string, body: string }) => Promise<void>
}

export function NotesEditor (props: NotesEditorProps) {
  const [currentContent, setCurrentContent] = useState('')
  const [timer, setTimer] = useState<any>({})

  useEffect(() => {
    props.note?.body && setCurrentContent(props.note.body)
  }, [props.note])

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

  async function handleUpdateNote (note: string) {
    const matched = note.match(/(?<=>)([\w\s]+)(?=<\/)/ig)
    let title = ''
    if (matched) {
      title = matched[0]
    }

    await props.updateNote(props.note, { title, body: note })

    toast.success('Saved', { autoClose: 1000 })
  }

  function handleChange (value: string, delta: any, source: any) {
    clearTimeout(timer)
    if (source === 'user') {
      setCurrentContent(value)
      setTimer(setTimeout(async () => await handleUpdateNote(value), 3000))
    }
  }

  return (
    <Container maxW='8xl' padding='0'>
      <ReactQuill value={currentContent} modules={modules} onChange={handleChange}/>
    </Container>
  )
}
