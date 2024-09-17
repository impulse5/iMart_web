import { useQuery } from "@tanstack/react-query";
import { utils } from "./utils";

const { getStorage, getStoredProductById } = utils();

export const StorageService = (id?: string) => {
    const { data: storages, isLoading: loading } = useQuery({
      queryKey: ['storage'],
      queryFn: getStorage,
    });

    const { data: product, isLoading: isProductLoading } = useQuery({
      queryKey: ['storage', id],
      queryFn:() => getStoredProductById(id as string),
    })
    return {
        storages,
        loading,
        product,
        isProductLoading
    }
}

