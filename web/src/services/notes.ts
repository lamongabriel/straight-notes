import { api } from './api'
import { getAuthorization } from '../utils/getAuthorization'
import { Note } from '../types/note'

export const NotesServices = {

  listNotes: async () => {
    const { data } = await api.get('/notes', {
      headers: {
        Authorization: getAuthorization()
      }
    })

    const notesSorted = data.sort((a: Note, b: Note) => (
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    ))

    return notesSorted
  },

  createNote: async () => {
    const response = await api.post('/notes', { title: 'New Note', body: 'Hey, thanks for using Straight Notes!' }, {
      headers: {
        Authorization: getAuthorization()
      }
    })

    const newNote = {
      _id: response.data.createdNote._id,
      title: response.data.createdNote.title,
      body: response.data.createdNote.body,
      createdAt: response.data.createdNote.createdAt,
      updatedAt: response.data.createdNote.updatedAt
    } as Note

    return newNote
  },

  deleteNote: async (id: string) => {
    return await api.delete(`/notes/${id}`, {
      headers: {
        Authorization: getAuthorization()
      }
    })
  },

  updateNote: async (id: string, params: { title: string, body: string }) => {
    return await api.put(`/notes/${id}`, params, {
      headers: {
        Authorization: getAuthorization()
      }
    })
  },

  searchNote: async (query: string) => {
    return await api.get(`/notes/search?q=${query}`, {
      headers: {
        Authorization: getAuthorization()
      }
    })
  }
}
