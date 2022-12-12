import { api } from './api'
import { getAuthorization } from '../utils/getAuthorization'

export const NotesServices = {

  listNotes: async () => {
    return await api.get('/notes', {
      headers: {
        Authorization: getAuthorization()
      }
    })
  },

  createNote: async () => {
    return await api.post('/notes', { title: 'New Note', body: 'Hey, thanks for using Straight Notes!' }, {
      headers: {
        Authorization: getAuthorization()
      }
    })
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
  }
}
