export const API_BASE_URL = 'https://imart-zzva.onrender.com/'

// markets
export const POST_CREATE_MARKET = `markets`

// cep
export const GET_CITY_STATE_BY_CEP = (cep: string) =>
  `https://viacep.com.br/ws/${cep}/json/`

// login
export const POST_USER_LOGIN = `login`

export const GET_EMPLOYEES = () =>
  `market/employees`

export const POST_EMPLOYEE = () =>
  `market/employee`

export const DELETE_EMPLOYEE = (employee_id: string) =>
  `employee/${employee_id}`

export const PUT_EMPLOYEE_STATUS = (employee_id: string) =>
  `employee/${employee_id}/status`

export const PUT_EMPLOYEE = (employee_id: string) =>
  `employee/${employee_id}`

export const POST_SUPPLIER = () =>
  `market/supplier`

export const GET_SUPPLIERS = () =>
  `market/suppliers`

export const DELETE_SUPPLIER = (supplier_id: string) =>
  `supplier/${supplier_id}`

export const PUT_SUPPLIER_STATUS = (supplier_id: string) => 
  `supplier/${supplier_id}/status`

export const PUT_SUPPLIER = (supplier_id: string) =>
  `supplier/${supplier_id}`