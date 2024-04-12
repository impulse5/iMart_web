import { useState } from "react"
import { api } from "./api"
import { GET_SUPPLIERS } from "@/constants/api_routes"
import { useAuthentication } from "@/contexts/AuthenticationContext"

type Supplier = {
    attributes: {
      id: string;
      name: string;
      email: string;
      cnpj: string;
      cellphone: string;
      market_id: string;
    }
    id: string;
    type: string;
  }

export const SuppliersService = () => {
  const { user } = useAuthentication()
  const [suppliers, setSuppliers] = useState<Supplier[]>([])

  const getMarketId = async () => {
    let market_id = await user.market_id
    if (!market_id) {
      let localUser = JSON.parse(localStorage.getItem('user') || '{}')
      market_id = localUser.market_id
    }
    return market_id
  }

  const getSuppliers = async () => {
    let market_id = await getMarketId()
    try {
      const response = await api.get(GET_SUPPLIERS(market_id || ''))
      setSuppliers(response.data.suppliers.data)
    } catch (error) {
      console.log(error)
    }
  }

 
  return {
    getSuppliers,
    suppliers
  }
}