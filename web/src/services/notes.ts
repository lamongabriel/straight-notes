import { api } from './api'

export const NotesServices = {
  fetchNotes: async () => {
    return await api.get('/notes')
  }
}
