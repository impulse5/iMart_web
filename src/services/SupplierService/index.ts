import { useQuery, useMutation } from "@tanstack/react-query"
import { useNotify } from "@/hooks/useNotify"
import { useQueryClient } from "@tanstack/react-query"

import { utils } from "./utils"

export const SupplierService = () => {
  const { getSuppliers, createSupplier, updateSupplier, deleteSupplier, turnSupplierStatus } = utils()
  const { notifySuccess, notifyError } = useNotify()
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['suppliers'],
    queryFn: getSuppliers,
  })

  const { mutateAsync: create } = useMutation({
    mutationFn: createSupplier,
    onSuccess: () => {
      notifySuccess('Fornecedor criado', 'Fornecedor criado com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['suppliers']})
    },
    onError: () => {
      notifyError('Erro ao criar o fornecedor', 'Ocorreu um erro ao criar o fornecedor. tente novamente')
    }
  })

  const { mutateAsync: update } = useMutation({
    mutationFn: updateSupplier,
    onSuccess: () => {
      notifySuccess('Fornecedor atualizado', 'Fornecedor atualizado com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['suppliers']})
    },
    onError: () => {
      notifyError('Erro ao atualizar o fornecedor', 'Ocorreu um erro ao atualizar o fornecedor. tente novamente')
    }
  })

  const { mutateAsync: destroy } = useMutation({
    mutationFn: deleteSupplier,
    onSuccess: () => {
      notifySuccess('Fornecedor excluído', 'Fornecedor excluído com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['suppliers']})
    },
    onError: () => {
      notifyError('Erro ao excluir o fornecedor', 'Ocorreu um erro ao excluir o fornecedor. tente novamente')
    }
  })

  const { mutateAsync: turnStatus } = useMutation({
    mutationFn: turnSupplierStatus,
    onSuccess: () => {
      notifySuccess('Status do fornecedor alterado', 'Status do fornecedor alterado com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['suppliers']})
    },
    onError: () => {
      notifyError('Erro ao alterar o status do fornecedor', 'Ocorreu um erro ao alterar o status do fornecedor. tente novamente')
    }
  })

  return {
    suppliers: data,
    loading: isLoading,
    create,
    update,
    destroy,
    turnStatus
  }
}