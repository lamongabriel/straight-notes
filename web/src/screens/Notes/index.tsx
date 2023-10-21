import { useEffect } from 'react'

import { Layout } from '../../components/Layout'
import { NotesEditor } from '../../components/NotesEditor'

import { useNotes } from '../../hooks/useNotes'

export function Notes () {
  const { loadNotes } = useNotes()

  useEffect(() => { loadNotes() }, [])

  return (
    <Layout logged>
      <NotesEditor />
    </Layout>
  )
}
