import { api } from "../api"
import { GET_CATEGORIES } from "@/constants/api_routes"


export const utils = () => {

  const getCategories = async () => {
    try {
      const response = await api.get(GET_CATEGORIES())
      return response.data.categories
    } catch (error) {
      console.error('Error fetching categories:', error)
      throw error
    }
  }
  
  return { getCategories }
}
