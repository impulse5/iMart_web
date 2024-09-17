import { useQuery, useMutation } from "@tanstack/react-query"
import { utils } from "./utils"
import { queryClient } from "@/App"
import { useNotify } from "@/hooks/useNotify"

export const CategoryService = () => {
  const { getCategories, createCategory, updateCategory, deleteCategory } = utils()
  const { notifySuccess, notifyError } = useNotify()

  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const { mutateAsync: create } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      notifySuccess('Categoria criada', 'Categoria criada com sucesso')
      queryClient.invalidateQueries({ queryKey: ['categories']})
    },
    onError: () => {
      notifyError('Erro ao criar categoria', 'Ocorreu um erro ao criar a categoria. tente novamente')
    }
  })

  const { mutateAsync: update } = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      notifySuccess('Categoria atualizada', 'Categoria atualizada com sucesso')
      queryClient.invalidateQueries({ queryKey: ['categories']})
    },
    onError: () => {
      notifyError('Erro ao atualizar categoria', 'Ocorreu um erro ao atualizar a categoria. tente novamente')
    }
  })

  const { mutateAsync: remove } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      notifySuccess('Categoria removida', 'Categoria removida com sucesso')
      queryClient.invalidateQueries({ queryKey: ['categories']})
    },
    onError: () => {
      notifyError('Erro ao remover categoria', 'Ocorreu um erro ao remover a categoria. tente novamente')
    }
  })
  
  return { categories: data,
           loading: isLoading,
           create,
           update,
           remove
          }
}