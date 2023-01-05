import { useEffect } from 'react'

import { Layout } from '../../components/Layout'
import { NotesEditor } from '../../components/NotesEditor'

import { useNotes } from '../../hooks/useNotes'

import { NotesServices } from '../../services/notes'
import { Note } from '../../types/note'

export function Notes () {
  const { setNotes, setCurrentNote } = useNotes()

  useEffect(() => {
    NotesServices.listNotes().then(notes => handleNotes(notes))
  }, [])

  function handleNotes (notes: Note[]) {
    if (notes.length > 0) {
      setNotes(notes)
      setCurrentNote(notes[0])
    }
  }

  return (
    <Layout logged>
      <NotesEditor />
    </Layout>
  )
}
