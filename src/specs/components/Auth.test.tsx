import { renderHook, act } from '@testing-library/react';
import { AuthenticationProvider, useAuthentication } from '../../contexts/AuthenticationContext';
import { api } from '@/services/api';

const localStorageMock = (() => {
    let store: Record<string, string> = {};
  
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value.toString();
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  })();
  
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
  

  jest.mock('@/services/api', () => ({
    api: {
      post: jest.fn(),
    },
  }));


describe('AuthenticationContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  
    it('should handle login error', async () => {
      (api.post as jest.Mock).mockRejectedValueOnce(new Error('Login failed'));
  
      const wrapper = ({ children }: { children?: React.ReactNode }) => (
        <AuthenticationProvider>{children}</AuthenticationProvider>
      );
  
      const { result } = renderHook(() => useAuthentication(), { wrapper });
  
      expect(result.current.loginLoading).toBeFalsy();
      expect(result.current.loginError).toBeFalsy();
  
      await act(async () => {
        await result.current.Login('test@example.com', 'password');
      });
  
      expect(result.current.loginLoading).toBeFalsy();
      expect(result.current.loginError).toBeTruthy();
    });
  });