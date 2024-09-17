export type User = {
    id?: string;
    name?: string;
    email?: string;
    role?: string;
    status?: boolean;
    market_id?: string;
    market?: {
        id: string;
        name: string;
        cnpj?: string;
        cellphone?: string;
        active?: boolean;
    };
}

export type Token = {
    token?: string;
}