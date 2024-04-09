import { useContext, createContext, useState } from 'react'
import { api } from '@/services/api'
import { POST_USER_LOGIN } from '../constants/api_routes'
import { User } from '@/types/User'
import { Props } from '@/types/Props'

export const AuthenticationContext = createContext<AuthContextType>(null!)

export type AuthContextType = {
  loginLoading: boolean;
  loginError: boolean;
  loginSuccess: boolean;
  Login: (email: string, password: string) => Promise<void>;
  setLoginSuccess: (value: boolean) => void;
}

export const AuthenticationProvider = ({ children }: Props) => {
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginError, setLoginError] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)

  const setToken = (token: string) => {
    localStorage.setItem('authToken', token);
  }

  const setUser = (user: User) => {
    setUser(user);
  }

  const Login = async (email: string, password: string) => {
    try {
      setLoginLoading(true)
      const response = await api.post(POST_USER_LOGIN, {
        user: {
          email,
          password,
        },
      })
      setLoginLoading(false);
      setLoginSuccess(true);
      setToken(response.data.token);
      setUser(response.data.user.data.attributes);
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
        setLoginSuccess,
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