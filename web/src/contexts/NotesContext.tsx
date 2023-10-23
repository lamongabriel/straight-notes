import { createContext, ReactNode, useCallback, useState } from 'react'
import { NotesServices } from '../services/notes'
import { Note } from '../types/note'
import { toast } from 'react-toastify'

interface NotesContextProps {
  notes: Note[]
  currentNote: Note
  loading: boolean

  setNotes: (notes: Note[]) => void
  setCurrentNote: (note: Note) => void
  setLoading: (isLoading: boolean) => void
  loadNotes: () => Promise<void>
}

export const NotesContext = createContext<NotesContextProps>({} as NotesContextProps)

interface NotesContextProviderProps {
  children: ReactNode
}

export function NotesContextProvider ({ children }: NotesContextProviderProps) {
  const [notes, setNotes] = useState([] as Note[])
  const [currentNote, setCurrentNote] = useState({} as Note)
  const [loading, setLoading] = useState(true)

  const updateNotes = useCallback((notes: Note[]) => {
    setNotes(notes)
  }, [])

  const updateCurrentNote = useCallback((note: Note) => {
    setCurrentNote(note)
  }, [])

  const updateLoading = useCallback((isLoading: boolean) => {
    setLoading(isLoading)
  }, [])

  const loadNotes = useCallback(async () => {
    try {
      setLoading(true)

      let userNotes: Note[] = await NotesServices.listNotes()

      if (!userNotes || userNotes?.length === 0) {
        userNotes = []
      }

      setNotes(userNotes)
      setCurrentNote(userNotes[0])
    } catch (err) {
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <NotesContext.Provider value={{
      notes,
      currentNote,
      loading,
      setNotes: updateNotes,
      setCurrentNote: updateCurrentNote,
      setLoading: updateLoading,
      loadNotes
    }}>
      {children}
    </NotesContext.Provider>
  )
}
