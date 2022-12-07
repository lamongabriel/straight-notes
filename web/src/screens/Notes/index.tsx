import { useState } from 'react'
import { Header } from '../../components/Header'
import { NotesEditor } from '../../components/NotesEditor'
import { Note } from '../../types/note'

export function Notes () {
  const [isOpen, setIsOpen] = useState(false)
  const [currentNote, setCurrentNote] = useState<Note>({} as Note)

  return (
    <>
      <Header
        loggedIn
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
        currentNote={currentNote}
        setCurrentNote={(note: Note) => setCurrentNote(note)}
      />
      <NotesEditor note={currentNote} />
    </>
  )
}
