import { useEffect, useState } from "react"
import { api } from "./api"
import { GET_EMPLOYEES } from "@/constants/api_routes"
import { useAuthentication } from "@/contexts/AuthenticationContext"

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

  const getEmployees = async () => {
    try {
      let market_id = await user.market_id
      if (!market_id) {
        let localUser = JSON.parse(localStorage.getItem('user') || '{}')
        market_id = localUser.market_id
      }
      const response = await api.get(GET_EMPLOYEES(market_id || ''))
     setEmployees(response.data.users.data)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    employees,
    getEmployees,
  }
}