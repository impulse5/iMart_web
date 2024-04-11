import axios from 'axios'
import { API_BASE_URL } from '../constants/api_routes'
import { useLogoutHandler } from '../hooks/useLogoutHandler'
export const api: any = axios.create({
  baseURL: API_BASE_URL,
})

api.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    if (error.response.status === 401) {
      useLogoutHandler();
    }
    return Promise.reject(error);
  }
);
