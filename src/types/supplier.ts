export interface SupplierAttributes {
  id: string;
  name: string;
  cnpj: string;
  cellphone: string;
  email: string;
  active: boolean;
}

export type SupplierResponse = {
  id: string
  attributes: SupplierAttributes
}

export type SupplierRequest = {
  supplier: Omit<SupplierAttributes, 'active'>
}