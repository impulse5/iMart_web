import { STORAGE_COLLECTION_ROUTE, STORAGE_MEMBER_ROUTE } from "@/constants/api_routes";
import { api } from "../api";
import { StorageRequest } from "@/types/storage";

export const utils = () => {
    const getStorage = async (): Promise<StorageRequest[]> => {
        try {
            const response = await api.get(STORAGE_COLLECTION_ROUTE());
            return response.data.storages.data;
        } catch (error) {
            console.error('Error fetching storages:', error);
            throw error;
        }
    }

    const getStoredProductById = async (storageId: string): Promise<StorageRequest> => {
        try {
            const response = await api.get(STORAGE_MEMBER_ROUTE(storageId));
            return response.data.storage.data;
        } catch (error) {
            console.error('Error fetching storageaaaaaa:', error);
            throw error;
        }
    }


    return { getStorage, getStoredProductById };
}