import { api } from "./api";
import { POST_SUPPLIER } from "@/constants/api_routes";
import { useState } from "react";
import { useGetMarketId } from "@/hooks/useGetMarketId";
import { dataSupplierInfo } from "@/types/SupplierInfo";

type Supplier = {
  attributes: {
    id: string;
    name: string;
    email: string;
    cnpj: string;
    cellphone: string;
  }
  id: string;
  type: string;
}[]

export const SupplierService = () => {

  const { getMarketId } = useGetMarketId()
  const [suppliers, setSuppliers] = useState<Supplier>([]);

  const postSupplier = async (supplier: dataSupplierInfo) => {
    try {
      let market_id = await getMarketId()
      const response = await api.post(POST_SUPPLIER(market_id || ''), supplier);
      setSuppliers([...suppliers, response.data.supplier.data])
      return true
    } catch (error) {
      console.log(error)
    }
  }

  return { postSupplier }
}