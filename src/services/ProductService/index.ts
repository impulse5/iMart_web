import { useQuery, useMutation } from "@tanstack/react-query";
import { useNotify } from "@/hooks/useNotify";
import { useQueryClient } from "@tanstack/react-query";
import { utils } from "./utils";

export const ProductService = () => {
  const { getProducts, createProduct, updateProduct, deleteProduct } = utils();
  const { notifySuccess, notifyError } = useNotify();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const { mutateAsync: create } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      notifySuccess('Produto criado', 'Produto criado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: () => {
      notifyError('Erro ao criar o produto', 'Ocorreu um erro ao criar o produto. Tente novamente.');
    }
  });

  const { mutateAsync: update } = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      notifySuccess('Produto atualizado', 'Produto atualizado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: () => {
      notifyError('Erro ao atualizar o produto', 'Ocorreu um erro ao atualizar o produto. Tente novamente.');
    }
  });

  const { mutateAsync: destroy } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      notifySuccess('Produto excluído', 'Produto excluído com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: () => {
      notifyError('Erro ao excluir o produto', 'Ocorreu um erro ao excluir o produto. Tente novamente.');
    }
  });

  return {
    products: data,
    loading: isLoading,
    create,
    update,
    destroy
  }
};
