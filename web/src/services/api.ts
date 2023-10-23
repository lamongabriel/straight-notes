import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const api = axios.create({
  baseURL: API_URL as string
})

api.interceptors.response.use(function (response) {
  return response
}, async function (error) {
  if (error.response.status === 401) {
    localStorage.removeItem('straightnotes@token')
    window.location.href = '/'
  }
  return await Promise.reject(error)
})
