import { useContext, createContext, useState, useEffect } from 'react';
import { api } from '@/services/api';
import { POST_USER_LOGIN } from '../constants/api_routes';
import { User } from '@/types/User';
import { Props } from '@/types/Props';

export const AuthenticationContext = createContext<AuthContextType>(null!);

export type AuthContextType = {
  loginLoading: boolean;
  loginError: boolean;
  loginSuccess: boolean;
  Login: (email: string, password: string) => Promise<void>;
  setLoginSuccess: (value: boolean) => void;
  user: User | null;
  token: string | null;
  authenticate: () => boolean;
  logout: () => boolean;
  getRole: () => any | '';
};

export const AuthenticationProvider = ({ children }: Props) => {
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      api.defaults.headers = {
        Authorization: `Bearer ${storedToken}`,
      };
    }
  }, []);

  const storageToken = (token: string) => {
    localStorage.setItem('authToken', token);
    setToken(token);
  };

  const storageUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const Login = async (email: string, password: string) => {
    try {
      setLoginLoading(true);
      const response = await api.post(POST_USER_LOGIN, {
        user: {
          email,
          password,
        },
      });
      setLoginLoading(false);
      setLoginSuccess(true);
      storageToken(response.data.token);
      storageUser(response.data.user.data.attributes);
    } catch (error) {
      setLoginLoading(false);
      setLoginError(true);
    }
  };

  const authenticate = () => {
    return !!token && !!user;
  };

  const logout = () => {
    try {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
      api.defaults.headers = {};
      return true;
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      return false;
    }
  };

  const getRole = (): any | '' => {
    return user?.role || '';
  };

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
        logout,
        getRole,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);

  if (!context) {
    throw new Error('useAuthentication must be used within a AuthenticationProvider');
  }

  return context;
};
