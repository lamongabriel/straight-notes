import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3001'
})

api.interceptors.response.use(response => response, error => {
  if (error.response.status === 403) {
    localStorage.removeItem('straightnotes@token')
  }
})
