import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3001'
})

api.interceptors.response.use(function (response) {
  return response
}, async function (error) {
  if (error.response.status === 403) {
    localStorage.removeItem('straightnotes@token')
    window.location.href = '/'
  }
  return await Promise.reject(error)
})
