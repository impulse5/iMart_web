import { useState } from "react"
import { api } from "./api"
import { GET_EMPLOYEES, POST_EMPLOYEE, DELETE_EMPLOYEE } from "@/constants/api_routes"
import { useAuthentication } from "@/contexts/AuthenticationContext"
import { userEmployeeInfo } from "@/types/EmployeeInfo"

type Employee = {
  attributes: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: boolean;
    market_id: string;
  }
  id: string;
  type: string;
}

export const EmployeeService = () => {

  const { user } = useAuthentication()
  const [employees, setEmployees] = useState<Employee[]>([])

  const getMarketId = async () => {
    let market_id = await user.market_id
    if (!market_id) {
      let localUser = JSON.parse(localStorage.getItem('user') || '{}')
      market_id = localUser.market_id
    }
    return market_id
  }

  const getEmployees = async () => {
    let market_id = await getMarketId()
    try {
      const response = await api.get(GET_EMPLOYEES(market_id || ''))
      setEmployees(response.data.users.data)
      const emails = response.data.users.data
      return emails
    } catch (error) {
      console.log(error)
    }
  }

  const postEmployee = async (employee: userEmployeeInfo) => {
    try {
      let market_id = await getMarketId()
      const response = await api.post(POST_EMPLOYEE(market_id || ''), employee);
      setEmployees([...employees, response.data.user.data])
      return true
    } catch (error) {
      console.log(error)
    }
  }

  const deleteEmployee = async (employee_id: string) => {
    try {
      const response = await api.delete(DELETE_EMPLOYEE(employee_id))
      console.log(response)
      setEmployees(employees.filter(employee => employee.id !== employee_id))
      return true
    } catch (error) {
      console.log(error)
    }
  }

  return {
    employees,
    getEmployees,
    postEmployee,
    deleteEmployee
  }
}