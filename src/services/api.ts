import axios from 'axios'
import { API_BASE_URL } from '../constants/api_routes'

export const api: any = axios.create({
  baseURL: API_BASE_URL,
})

