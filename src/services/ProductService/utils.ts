import { api } from "../api";
import { PRODUCT_COLLECTION_ROUTE, PRODUCT_MEMBER_ROUTE } from "@/constants/api_routes";
import { ProductRequest } from "@/types/products";

export const utils = () => {

  const getProducts = async () => {
    try {
      const response = await api.get(PRODUCT_COLLECTION_ROUTE());
      return response.data.products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  const createProduct = async (product: ProductRequest) => {
    try {
      const response = await api.post(PRODUCT_COLLECTION_ROUTE(), product);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  const updateProduct = async (product: ProductRequest) => {
    try {
      const response = await api.put(PRODUCT_MEMBER_ROUTE(product.product.id), product);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  const deleteProduct = async (productId: string) => {
    try {
      const response = await api.delete(PRODUCT_MEMBER_ROUTE(productId));
      return response.data;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  return { getProducts, createProduct, updateProduct, deleteProduct }
};
