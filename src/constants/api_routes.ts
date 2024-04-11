export const API_BASE_URL = 'https://imart-zzva.onrender.com/'

// markets
export const POST_CREATE_MARKET = `markets`

// cep
export const GET_CITY_STATE_BY_CEP = (cep: string) =>
  `https://viacep.com.br/ws/${cep}/json/`

// login
export const POST_USER_LOGIN = `login`

export const GET_EMPLOYEES = (id: string) =>
  `market/${id}/employees`

export const POST_EMPLOYEE = (market_id: string) =>
  `market/${market_id}/employee`