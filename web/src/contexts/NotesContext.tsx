import { createContext, ReactNode, useCallback, useState } from 'react'
import { Note } from '../types/note'

interface NotesContextProps {
  notes: Note[]
  currentNote: Note
  loading: boolean

  setNotes: (notes: Note[]) => void
  setCurrentNote: (note: Note) => void
  setLoading: (isLoading: boolean) => void
}

export const NotesContext = createContext<NotesContextProps>({} as NotesContextProps)

interface NotesContextProviderProps {
  children: ReactNode
}

export function NotesContextProvider ({ children }: NotesContextProviderProps) {
  const [notes, setNotes] = useState([] as Note[])
  const [currentNote, setCurrentNote] = useState({} as Note)
  const [loading, setLoading] = useState(false)

  const updateNotes = useCallback((notes: Note[]) => {
    setNotes(notes)
  }, [])

  const updateCurrentNote = useCallback((note: Note) => {
    setCurrentNote(note)
  }, [])

  const updateLoading = useCallback((isLoading: boolean) => {
    setLoading(isLoading)
  }, [])

  return (
    <NotesContext.Provider value={{
      notes,
      currentNote,
      loading,
      setNotes: updateNotes,
      setCurrentNote: updateCurrentNote,
      setLoading: updateLoading
    }}>
      {children}
    </NotesContext.Provider>
  )
}
