import { AxiosError } from 'axios'

import { api } from './api'

interface UserRegisterParams {
  name: string
  email: string
  password: string
}

interface UserLoginParams {
  email: string
  password: string
  rememberMe: boolean
}

const defaultErrorMessage = 'Sorry, we could not process your request now, please try again later.'

export const UserServices = {
  async register (params: UserRegisterParams) {
    try {
      const response = await api.post('/users/register', params)
      return {
        ok: true,
        message: response.data.message
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        return {
          ok: false,
          message: error.response?.data.message
        }
      }
      return {
        ok: false,
        message: defaultErrorMessage
      }
    }
  },
  async login (params: UserLoginParams) {
    try {
      const response = await api.post('/users/login', params)
      localStorage.setItem('straightnotes@user', JSON.stringify(response.data))
      return {
        ok: true,
        message: response.data.message
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        return {
          ok: false,
          message: error.response?.data.message
        }
      }
      return {
        ok: false,
        message: defaultErrorMessage
      }
    }
  }
}
