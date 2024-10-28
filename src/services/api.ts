import axios from 'axios';
import { API_BASE_URL } from '../constants/api_routes';
import logout from '@/hooks/logout';

export const api: any = axios.create({
  baseURL: API_BASE_URL,
});


api.interceptors.request.use(
  (config: any) => {
    config.headers["ngrok-skip-browser-warning"] = "true";
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    if (error.response && error.response.status === 401) {
      logout();
    }
    return Promise.reject(error);
  }
);
