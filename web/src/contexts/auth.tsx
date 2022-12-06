import { AxiosError } from 'axios'
import { createContext, ReactNode, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Loading } from '../components/Loading'
import { api } from '../services/api'

interface UserLoginParams {
  email: string
  password: string
  rememberMe: boolean
}

interface UserRegisterParams {
  name: string
  email: string
  password: string
}

interface AuthContextProps {
  authenticated: boolean

  login: (data: UserLoginParams) => Promise<void>
  register: (data: UserRegisterParams) => Promise<void>
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider ({ children }: AuthProviderProps) {
  const [authenticated, setAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const defaultErrorMessage = 'Sorry, we could not process your request now, please try again later.'

  useEffect(() => {
    const token = localStorage.getItem('straightnotes')
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token) as string}`
      setAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  async function handleLogin (params: UserLoginParams) {
    try {
      const response = await api.post('/users/login', params)

      const { token } = response.data

      localStorage.setItem('straightnotes@token', JSON.stringify(token))

      api.defaults.headers.Authorization = `Bearer ${token as string}`

      setAuthenticated(true)

      toast.success('Welcome back! redirecting you...')
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
        return
      }
      toast.error(defaultErrorMessage)
    }
  }

  async function handleRegister (params: UserRegisterParams) {
    try {
      await api.post('/users/register', params)

      toast.success('Thank you for joining us! redirecting...')
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
        return
      }
      toast.error(defaultErrorMessage)
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <AuthContext.Provider value={
        {
          authenticated,
          login: handleLogin,
          register: handleRegister
        }
      }
    >
      {children}
    </AuthContext.Provider>
  )
}
