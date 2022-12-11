import { useEffect, useState } from 'react'
import { Note } from '../../types/note'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import {
  Container
} from '@chakra-ui/react'

interface NotesEditorProps {
  note: Note
}

export function NotesEditor (props: NotesEditorProps) {
  const [currentContent, setCurrentContent] = useState('')

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

  return (
    <Container maxW='8xl' padding='0'>
      <ReactQuill value={currentContent} modules={modules}/>
    </Container>
  )
}
