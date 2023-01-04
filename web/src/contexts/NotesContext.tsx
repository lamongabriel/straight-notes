import { createContext, ReactNode, useState } from 'react'
import { Note } from '../types/note'

interface NotesContextProps {
  notes: Note[]
  currentNote: Note

  setNotes: React.Dispatch<React.SetStateAction<Note[]>>
  setCurrentNote: React.Dispatch<React.SetStateAction<Note>>
}

export const NotesContext = createContext<NotesContextProps>({} as NotesContextProps)

interface NotesContextProviderProps {
  children: ReactNode
}

export function NotesContextProvider ({ children }: NotesContextProviderProps) {
  const [notes, setNotes] = useState([] as Note[])
  const [currentNote, setCurrentNote] = useState({} as Note)

  return (
    <NotesContext.Provider value={{
      notes,
      currentNote,
      setNotes,
      setCurrentNote
    }}>
      {children}
    </NotesContext.Provider>
  )
}
