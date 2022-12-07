import { api } from './api'
import { getAuthorization } from '../utils/getAuthorization'

const Authorization = getAuthorization()

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
