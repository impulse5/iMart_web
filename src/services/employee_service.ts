import { useState } from "react"
import { api } from "./api"
import { GET_EMPLOYEES, POST_EMPLOYEE } from "@/constants/api_routes"
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
    } catch (error) {
      console.log(error)
    }
  }

  const postEmployee = async (employee: userEmployeeInfo) => {
    try {
      let market_id = await getMarketId()
      const response = await api.post(POST_EMPLOYEE(market_id || ''), employee);
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    employees,
    getEmployees,
    postEmployee
  }
}