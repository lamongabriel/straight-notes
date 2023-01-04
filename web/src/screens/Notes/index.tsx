import { useEffect, useState } from 'react'
import { HeaderLogged } from '../../components/HeaderLogged'
import { NotesEditor } from '../../components/NotesEditor'
import { NotesServices } from '../../services/notes'
import { Note } from '../../types/note'

export function Notes () {
  const [notes, setNotes] = useState<Note[]>([])
  const [currentNote, setCurrentNote] = useState<Note>({} as Note)

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
    if (sortedNotes.length > 0) {
      setCurrentNote(sortedNotes[0])
    }
  }

  async function createNote () {
    const response = await NotesServices.createNote()

    const newNote = {
      _id: response.data.createdNote._id,
      title: response.data.createdNote.title,
      body: response.data.createdNote.body,
      createdAt: response.data.createdNote.createdAt,
      updatedAt: response.data.createdNote.updatedAt
    }

    setNotes(prev => ([newNote, ...prev]))
    setCurrentNote(newNote)
  }

  async function deleteNote (id: string) {
    await NotesServices.deleteNote(id)

    const temporaryNotes = [...notes]

    const index = temporaryNotes.findIndex(note => note._id === id)

    if (index !== -1) {
      temporaryNotes.splice(index, 1)
    }

    setNotes(temporaryNotes)
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

  async function searchNotes (query: string) {
    const response = await NotesServices.searchNote(query)
    setNotes(response.data)
  }

  return (
    <>
      <HeaderLogged
        currentNote={currentNote}
        setCurrentNote={(note: Note) => setCurrentNote(note)}

        notes={notes}
        fetchNotes={fetchNotes}
        createNote={createNote}
        deleteNote={deleteNote}
        searchNotes={searchNotes}

      />
      <NotesEditor note={currentNote} updateNote={updateNote} />
    </>
  )
}
