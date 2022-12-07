import { api } from './api'

const token = localStorage.getItem('straightnotes@token') as string
const Authorization = `Bearer ${JSON.parse(token) as string}`

export const NotesServices = {

  listNotes: async () => {
    return await api.get('/notes', {
      headers: {
        Authorization
      }
    })
  },

  createNote: async () => {
    return await api.post('/notes', { title: 'New Note', body: 'Hey, thanks for using Straight Notes!' }, {
      headers: {
        Authorization
      }
    })
  }
}
