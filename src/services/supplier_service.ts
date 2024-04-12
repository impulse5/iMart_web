import { api } from "./api";
import { POST_SUPPLIER, GET_SUPPLIERS, PUT_SUPPLIER_STATUS } from "@/constants/api_routes";
import { useState } from "react";
import { useGetMarketId } from "@/hooks/useGetMarketId";
import { dataSupplierInfo } from "@/types/SupplierInfo";

type SupplierService = {
  suppliers: Supplier;
  getSuppliers: () => Promise<void>;
  postSupplier: (supplier: dataSupplierInfo) => Promise<boolean> | undefined;
  switchSupplierStatus: (supplier_id: string) => Promise<boolean> | undefined;
}

type Supplier = {
  attributes: {
    id: string;
    name: string;
    email: string;
    cnpj: string;
    cellphone: string;
    active: string;
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

  const switchSupplierStatus = async (supplier_id: string) => {
    try {
      const response = await api.put(PUT_SUPPLIER_STATUS(supplier_id))
      console.log(response)
      setSuppliers(suppliers.map(supplier => {
        if (supplier.id === supplier_id) {
          supplier.attributes.active = response.data.supplier.data.attributes.active
        }
        return supplier
      }))
      return true
    } catch (error) {
      console.log(error)
    }
  }

  return { suppliers, getSuppliers, postSupplier, switchSupplierStatus } as SupplierService;
}