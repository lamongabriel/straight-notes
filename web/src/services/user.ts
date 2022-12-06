import { AxiosError } from 'axios'

import { api } from './api'

interface UserRegisterParams {
  name: string
  email: string
  password: string
}

export const UserServices = {
  async register (params: UserRegisterParams) {
    try {
      const response = await api.post('/register', params)
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
        message: 'Sorry, we could not process your request now, please try again later.'
      }
    }
  }
}
