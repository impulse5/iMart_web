import { api } from "./api";
import { POST_SUPPLIER, GET_SUPPLIERS, PUT_SUPPLIER_STATUS, DELETE_SUPPLIER, PUT_SUPPLIER } from "@/constants/api_routes";
import { useState } from "react";
import { dataSupplierInfo } from "@/types/SupplierInfo";

type SupplierService = {
  suppliers: Supplier;
  getSuppliers: () => Promise<void>;
  postSupplier: (supplier: dataSupplierInfo) => Promise<boolean> | undefined;
  switchSupplierStatus: (supplier_id: string) => Promise<boolean> | undefined;
  deleteSupplier: (supplier_id: string) => Promise<boolean> | undefined;
  editSupplier: (supplier_id: string, supplier: dataSupplierInfo) => Promise<boolean> | undefined;
  loading?: boolean;
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

  const [suppliers, setSuppliers] = useState<Supplier>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getSuppliers = async () => {
    setLoading(true)
    try {
      const response = await api.get(GET_SUPPLIERS())
      setSuppliers(response.data.suppliers.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const postSupplier = async (supplier: dataSupplierInfo) => {
    setLoading(true)
    try {
      const response = await api.post(POST_SUPPLIER(), supplier);
      setSuppliers([...suppliers, response.data.supplier.data])
      setLoading(false)
      return true
    } catch (error) {
      setLoading(false)
      console.log(error)
      return false
    }
  }

  const deleteSupplier = async (supplier_id: string) => {
    setLoading(true)
    try {
      const response = await api.delete(DELETE_SUPPLIER(supplier_id))
      console.log(response)
      setSuppliers(suppliers.filter(supplier => supplier.id !== supplier_id))
      setLoading(false)
      return true
    } catch (error) {
      setLoading(false)
      console.log(error)
      return false
    }
  }

  const switchSupplierStatus = async (supplier_id: string) => {
    setLoading(true)
    try {
      const response = await api.put(PUT_SUPPLIER_STATUS(supplier_id))
      console.log(response)
      setSuppliers(suppliers.map(supplier => {
        if (supplier.id === supplier_id) {
          supplier.attributes.active = response.data.supplier.data.attributes.active
        }
        return supplier
      }))
      setLoading(false)
      return true
    } catch (error) {
      console.log(error)
      setLoading(false)
      return false
    }
  }

  const editSupplier = async (supplier_id: string, supplier: dataSupplierInfo) => {
    setLoading(true)
    try {
      const response = await api.put(PUT_SUPPLIER(supplier_id), supplier)
      console.log(response)
      setSuppliers(suppliers.map(supplier => {
        if (supplier.id === supplier_id) {
          supplier.attributes = response.data.supplier.data.attributes
        }
        return supplier
      }))
      setLoading(false)
      return true
    } catch (error) {
      console.log(error)
      setLoading(false)
      return false
    }
  }

  return { suppliers, getSuppliers, postSupplier, switchSupplierStatus, deleteSupplier, editSupplier, loading } as SupplierService;
}