import { api } from "../api";
import { PRODUCT_READ_BARCODE_ROUTE } from "@/constants/api_routes";

export const productBarcodeService = async (barcode: string) => {
  try {
    const response = await api.get(PRODUCT_READ_BARCODE_ROUTE(barcode));
    return response.data;
  } catch (error) {
    console.error('Error reading barcode:', error);
    throw error;
  }
};

export const createSale = async (saleData: any) => {
  try {
    const response = await api.post('package_sells', saleData);
    return response.data;
  } catch (error) {
    console.error('Error creating sale:', error);
    throw error;
  }
};
