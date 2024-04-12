import { api } from "./api";
import { POST_SUPPLIER, GET_SUPPLIERS } from "@/constants/api_routes";
import { useState } from "react";
import { useGetMarketId } from "@/hooks/useGetMarketId";
import { dataSupplierInfo } from "@/types/SupplierInfo";

type SupplierService = {
  getSuppliers: () => Promise<void>;
  postSupplier: (supplier: dataSupplierInfo) => Promise<boolean> | undefined;
  suppliers: Supplier;
}

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

export const SupplierService = (): SupplierService => {

  const { getMarketId } = useGetMarketId()
  const [suppliers, setSuppliers] = useState<Supplier>([]);

  const getSuppliers = async () => {
    let market_id = await getMarketId()
    try {
      const response = await api.get(GET_SUPPLIERS(market_id || ''))
      setSuppliers(response.data.suppliers.data)
    } catch (error) {
      console.log(error)
    }
  }

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

  return { suppliers, getSuppliers, postSupplier } as SupplierService;
}