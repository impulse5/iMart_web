export const API_BASE_URL = 'https://b1a6-177-37-184-213.ngrok-free.app/'

export const GET_CITY_STATE_BY_CEP = (cep: string) =>
  `https://viacep.com.br/ws/${cep}/json/`

export const POST_USER_LOGIN = `users/login`

export const MARKET_COLLECTION_ROUTE = () =>
  `markets`

export const MARKET_MEMBER_ROUTE = (market_id: string) =>
  `markets/${market_id}`

export const MARKET_MEMBER_TURN_STATUS_ROUTE = (market_id: string) => 
  `markets/${market_id}/update_status`

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

export const PRODUCT_COLLECTION_ROUTE = () =>
  `products`

export const PRODUCT_MEMBER_ROUTE = (product_id: string) =>
  `products/${product_id}`

export const STORAGE_COLLECTION_ROUTE = () =>
  `storages`

export const STORAGE_MEMBER_ROUTE = (storage_id: string) => 
  `storages/${storage_id}`;

export const PRODUCT_READ_BARCODE_ROUTE = (barcode: string) => 
  `products/${barcode}/on_cashier`; 

export const PACKAGE_SELLS_ROUTE = () => 
  `package_sells`;

export const CASH_WITHDRAWAL_ROUTE = () => 
  `cash_withdrawals`;

export const GET_BALANCE = (cashierId: any) => 
  `users/${cashierId}`;