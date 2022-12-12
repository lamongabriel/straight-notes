import { useEffect, useState } from 'react'
import { HeaderLogged } from '../../components/HeaderLogged'
import { NotesEditor } from '../../components/NotesEditor'
import { NotesServices } from '../../services/notes'
import { Note } from '../../types/note'

export function Notes () {
  const [notes, setNotes] = useState<Note[]>([])
  const [currentNote, setCurrentNote] = useState<Note>({} as Note)

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    fetchNotes()
  }, [])

  async function fetchNotes () {
    const { data } = await NotesServices.listNotes()
    const sortedNotes = data.sort(
      (a: Note, b: Note) => (
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
    )
    setNotes(sortedNotes)
    setCurrentNote(sortedNotes[0])
  }

  async function createNote () {
    await NotesServices.createNote()
    fetchNotes()
  }

  async function deleteNote (id: string) {
    await NotesServices.deleteNote(id)
    fetchNotes()
  }

  async function updateNote (oldNote: Note, params: { title: string, body: string }) {
    const updatedNote = await NotesServices.updateNote(oldNote._id, params)

    if (updatedNote.status === 200) {
      const index = notes.indexOf(oldNote)
      const newNotes = notes
      newNotes[index] = updatedNote.data
      setNotes(newNotes)
      setCurrentNote(updatedNote.data)
    }
  }

  return (
    <>
      <HeaderLogged

        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}

        currentNote={currentNote}
        setCurrentNote={(note: Note) => setCurrentNote(note)}

        notes={notes}
        createNote={createNote}
        deleteNote={deleteNote}

      />
      <NotesEditor note={currentNote} updateNote={updateNote} />
    </>
  )
}
