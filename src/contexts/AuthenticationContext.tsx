import { useContext, createContext, useState } from 'react'
import { api } from '@/services/api'
import { POST_USER_LOGIN } from '../constants/api_routes'

export const AuthenticationContext = createContext<any>(null)

type Props = {
  children: React.ReactNode
}

export const AuthenticationProvider = ({ children }: Props) => {
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginError, setLoginError] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)

  const Login = async (email: string, password: string) => {
    try {
      setLoginLoading(true)
      await api.post(POST_USER_LOGIN, {
        user: {
          email,
          password,
        },
      })
      setLoginLoading(false)
      setLoginSuccess(true)
    } catch (error) {
      setLoginLoading(false)
      setLoginError(true)
    }
  }

  return (
    <AuthenticationContext.Provider
      value={{
        loginLoading,
        loginError,
        loginSuccess,
        Login,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext)

  if (!context) {
    throw new Error(
      'useAuthentication must be used within a AuthenticationProvider',
    )
  }

  return context
}
