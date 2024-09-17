import { api } from "../api";
import { POST_USER_LOGIN, PRODUCT_READ_BARCODE_ROUTE } from "@/constants/api_routes";
import { PACKAGE_SELLS_ROUTE } from "@/constants/api_routes";
import { CASH_WITHDRAWAL_ROUTE } from "@/constants/api_routes";

export const productBarcodeService = async (barcode: string) => {

  try {
    const response   = await api.get(PRODUCT_READ_BARCODE_ROUTE(barcode));
    return response.data;
  } catch (error) {
    console.error('Error reading barcode:', error);
    throw error;
  }
};

export const createSale = async (saleData: any) => {
  try {
    const response = await api.post(PACKAGE_SELLS_ROUTE(), saleData);
    return response.data;
  } catch (error) {
    console.error('Error creating sale:', error);
    throw error;
  }
};

interface CashData {
  value: number;
  authorized_by: string;
}


export const cash_withdrawal = async ({ value, authorized_by }: CashData) => {
  try {
    const response = await api.post(CASH_WITHDRAWAL_ROUTE(), {
      cash_withdrawal: {
        value,
        authorized_by
      }
    });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Erro ao criar a sangria';
    console.error('Error creating cash withdrawal:', errorMessage);
    throw new Error(errorMessage);
  }
}

export const getUserId = async (email: string, password: string): Promise<string> => {
  try {
      const response = await api.post(POST_USER_LOGIN, {
          user: { email, password }
      });
      return response.data.user.data.id; 
  } catch (error) {
      console.error("Erro ao buscar o ID do usuário:", error);
      throw error;
  }
};