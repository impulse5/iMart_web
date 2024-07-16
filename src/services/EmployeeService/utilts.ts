import { api } from "../api"
import { USER_COLLECTION_ROUTE, USER_MEMBER_ROUTE, USER_MEMBER_TURN_STATUS_ROUTE } from "@/constants/api_routes"

export const utils = () => {

  const getEmployees = async () => {
    try {
      const response = await api.get(USER_COLLECTION_ROUTE())
      return response.data.users
    } catch (error) {
      console.error('Error fetching categories:', error)
      throw error
    }
  }

  const deleteEmployee = async (employeeId: string) => {
    try {
      const response = await api.delete(USER_MEMBER_ROUTE(employeeId))
      return response.data
    } catch (error) {
      console.error('Error deleting employee:', error)
      throw error
    }
  }

  const turnEmployeeStatus = async (employeeId: string) => {
    try {
      const response = await api.put(USER_MEMBER_TURN_STATUS_ROUTE(employeeId))
      return response.data
    } catch (error) {
      console.error('Error turning employee status:', error)
      throw error
    }
  }

  return {
    getEmployees,
    deleteEmployee,
    turnEmployeeStatus
  }
}