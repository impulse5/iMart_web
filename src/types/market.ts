export interface EnterpriseData {
    name: string,
    cnpj: string,
    cellphone: string
}

export interface EnterpriseAddress {
    street: string,
    neighborhood: string,
    number: string,
    zipcode: string,
    city: string,
    state: string,
}

export interface EnterpriseAccess {
    name: string,
    email: string,
    password: string,
    password_confirmation: string
}

export type MarketRequest = {
    market: EnterpriseData,
    address: EnterpriseAddress,
    user: {
        name: string,
        email: string,
        password: string
    }
}