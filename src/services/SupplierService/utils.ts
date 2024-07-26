import { api } from "../api"
import { SUPPLIER_COLLECTION_ROUTE, SUPPLIER_MEMBER_TURN_STATUS_ROUTE, SUPPLIER_MEMBER_ROUTE } from "@/constants/api_routes"
import { SupplierRequest } from "@/types/supplier"

export const utils = () => {

  const getSuppliers = async () => {
    try {
      const response = await api.get(SUPPLIER_COLLECTION_ROUTE())
      return response.data.suppliers
    } catch (error) {
      console.error('Error fetching suppliers:', error)
      throw error
    }
  }
  const createSupplier = async (supplier: SupplierRequest) => {
    try {
      const response = await api.post(SUPPLIER_COLLECTION_ROUTE(), supplier)
      return response.data
    } catch (error) {
      console.error('Error creating supplier:', error)
      throw error
    }
  }

  const updateSupplier = async (supplier: SupplierRequest) => {
    try {
      const response = await api.put(SUPPLIER_MEMBER_ROUTE(supplier.supplier.id), supplier)
      return response.data
    } catch (error) {
      console.error('Error updating supplier:', error)
      throw error
    }
  }

  const deleteSupplier = async (supplierId: string) => {
    try {
      const response = await api.delete(SUPPLIER_MEMBER_ROUTE(supplierId))
      return response.data
    } catch (error) {
      console.error('Error deleting supplier:', error)
      throw error
    }
  }

  const turnSupplierStatus = async (supplierId: string) => {
    try {
      const response = await api.put(SUPPLIER_MEMBER_TURN_STATUS_ROUTE(supplierId))
      return response.data
    } catch (error) {
      console.error('Error turning supplier status:', error)
      throw error
    }
  }

  return { getSuppliers,
           createSupplier,
           updateSupplier,
           deleteSupplier,
           turnSupplierStatus
   }
}
