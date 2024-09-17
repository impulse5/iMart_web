import { api } from "../api"
import { CATEGORY_COLLECTION_ROUTE, CATEGORY_MEMBER_ROUTE } from "@/constants/api_routes"
import { CategoryRequest } from "@/types/category"

export const utils = () => {

  const getCategories = async () => {
    try {
      const response = await api.get(CATEGORY_COLLECTION_ROUTE())
      return response.data.categories
    } catch (error) {
      console.error('Error fetching categories:', error)
      throw error
    }
  }

  const createCategory = async (category: CategoryRequest) => {
    try {
      const response = await api.post(CATEGORY_COLLECTION_ROUTE(), category)
      return response.data
    } catch (error) {
      console.error('Error creating category:', error)
      throw error
    }
  }

  const updateCategory = async (category: CategoryRequest) => {
    try {
      const response = await api.put(CATEGORY_MEMBER_ROUTE(category.category.id), category)
      return response.data
    } catch (error) {
      console.error('Error updating category:', error)
      throw error
    }
  }

  const deleteCategory = async (categoryId: string) => {
    try {
      const response = await api.delete(CATEGORY_MEMBER_ROUTE(categoryId))
      return response.data
    } catch (error) {
      console.error('Error deleting category:', error)
      throw error
    }
  }

  return { getCategories,
           createCategory,
           updateCategory,
           deleteCategory
          }
}
