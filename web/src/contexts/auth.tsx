import { AxiosError } from 'axios'
import { createContext, ReactNode, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Loading } from '../components/Loading'
import { api } from '../services/api'
import { useNavigate } from 'react-router-dom'
import { getAuthorization } from '../utils/getAuthorization'
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
  logout: () => void
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider ({ children }: AuthProviderProps) {
  const [authenticated, setAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const defaultErrorMessage = 'Sorry, we could not process your request now, please try again later.'

  useEffect(() => {
    const Authorization = getAuthorization()
    if (Authorization) {
      api.defaults.headers.Authorization = Authorization
      setAuthenticated(true)
      setIsLoading(false)
      return navigate('/notes')
    }
    setIsLoading(false)
  }, [])

  async function handleLogin (params: UserLoginParams) {
    try {
      const response = await api.post('/users/login', params)

      const { token, user } = response.data

      localStorage.setItem('straightnotes@token', JSON.stringify(token))
      localStorage.setItem('straightnotes@user', JSON.stringify(user))

      api.defaults.headers.Authorization = `Bearer ${token as string}`

      setAuthenticated(true)

      toast.success('Welcome to Straight Notes')

      return navigate('/notes')
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

      return await handleLogin({
        email: params.email,
        password: params.password,
        rememberMe: true
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
        return
      }
      toast.error(defaultErrorMessage)
    }
  }

  function handleLogout () {
    setAuthenticated(false)
    localStorage.removeItem('straightnotes@token')
    api.defaults.headers.Authorization = null
    return navigate('/')
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <AuthContext.Provider value={
        {
          authenticated,
          login: handleLogin,
          register: handleRegister,
          logout: handleLogout
        }
      }
    >
      {children}
    </AuthContext.Provider>
  )
}
