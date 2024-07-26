export const API_BASE_URL = 'https://imart-s238.onrender.com/'

export const GET_CITY_STATE_BY_CEP = (cep: string) =>
  `https://viacep.com.br/ws/${cep}/json/`

export const POST_USER_LOGIN = `users/login`

export const MARKET_COLLECTION_ROUTE = () =>
  `markets`

export const USER_COLLECTION_ROUTE = () =>
  `users`

export const USER_MEMBER_ROUTE = (user_id: string) =>
  `users/${user_id}`

export const USER_MEMBER_TURN_STATUS_ROUTE = (user_id: string) =>
  `users/${user_id}/turn_status`

export const SUPPLIER_COLLECTION_ROUTE = () =>
  `suppliers`

export const SUPPLIER_MEMBER_ROUTE = (supplier_id: string) =>
  `suppliers/${supplier_id}`

export const SUPPLIER_MEMBER_TURN_STATUS_ROUTE = (supplier_id: string) =>
  `suppliers/${supplier_id}/turn_status`

export const CATEGORY_COLLECTION_ROUTE = () =>
  `categories`

export const CATEGORY_MEMBER_ROUTE = (category_id: string) =>
  `categories/${category_id}`