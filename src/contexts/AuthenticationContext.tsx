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
  user: User | null;
  token: string | null;
  authenticate: () => boolean;
}

export const AuthenticationProvider = ({ children }: Props) => {
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginError, setLoginError] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  const storageToken = (token: string) => {
    localStorage.setItem('authToken', token);
  }

  const storageUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
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
      storageToken(response.data.token);
      storageUser(response.data.user.data.attributes);
    } catch (error) {
      setLoginLoading(false)
      setLoginError(true)
    }
  }

  const authenticate = () => {
    const token = localStorage.getItem('authToken')
    const user = localStorage.getItem('user')
    if (!token) {
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      return false
    }
    setToken(token)
    setUser(JSON.parse(user!))
    return true
  }

  return (
    <AuthenticationContext.Provider
      value={{
        loginLoading,
        loginError,
        loginSuccess,
        Login,
        setLoginSuccess,
        user,
        token,
        authenticate,
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