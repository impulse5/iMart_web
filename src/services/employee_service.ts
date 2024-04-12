import { useState } from "react"
import { api } from "./api"
import { GET_EMPLOYEES, POST_EMPLOYEE, DELETE_EMPLOYEE, PUT_EMPLOYEE_STATUS, PUT_EMPLOYEE } from "@/constants/api_routes"
import { userEmployeeInfo } from "@/types/EmployeeInfo"
import { useGetMarketId } from "@/hooks/useGetMarketId"

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
  const { getMarketId } = useGetMarketId()
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const getEmployees = async () => {
    setLoading(true)
    let market_id = await getMarketId()
    try {
      const response = await api.get(GET_EMPLOYEES(market_id || ''))
      setEmployees(response.data.users.data)
      setLoading(false)
      return true
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const postEmployee = async (employee: userEmployeeInfo) => {
    setLoading(true)
    try {
      let market_id = await getMarketId()
      const response = await api.post(POST_EMPLOYEE(market_id || ''), employee);
      setEmployees([...employees, response.data.user.data])
      setLoading(false)
      return true
    } catch (error) {
      setLoading(false)
      console.log(error)
      return false
    }
  }

  const deleteEmployee = async (employee_id: string) => {
    setLoading(true)
    try {
      const response = await api.delete(DELETE_EMPLOYEE(employee_id))
      console.log(response)
      setEmployees(employees.filter(employee => employee.id !== employee_id))
      setLoading(false)
      return true
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const switchEmployeeStatus = async (employee_id: string) => {
    setLoading(true)
    try {
      const response = await api.put(PUT_EMPLOYEE_STATUS(employee_id))
      console.log(response)
      const updatedEmployees = employees.map(employee => {
        if (employee.id === employee_id) {
          return {
            ...employee,
            attributes: {
              ...employee.attributes,
              status: !employee.attributes.status
            }
          }
        }
        return employee
      })
      setEmployees(updatedEmployees)
      setLoading(false)
      return true
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  
  const editEmployee = async (employee_id: string, editedEmployee: userEmployeeInfo) => {
    setLoading(true)
    try {
      const response = await api.put(PUT_EMPLOYEE(employee_id), editedEmployee)
      console.log(response)
      const updatedEmployees = employees.map(employee => {
        if (employee.id === employee_id) {
          return {
            ...employee,
            attributes: {
              ...employee.attributes,
              name: response.data.user.data.attributes.name,
              email: response.data.user.data.attributes.email,
              role: response.data.user.data.attributes.role,
            }
          }
        }
        return employee
      })
      setEmployees(updatedEmployees)
      setLoading(false)
      return true
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return {
    employees,
    getEmployees,
    postEmployee,
    deleteEmployee,
    switchEmployeeStatus,
    editEmployee,
    loading
  }
}