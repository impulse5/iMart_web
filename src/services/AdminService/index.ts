import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import utils from "./utils";
import { useNotify } from "@/hooks/useNotify";

export const AdminService = () => {
    const { getMarkets, deleteMarket, turnMarketStatus } = utils();
    const { notifySuccess, notifyError } = useNotify();
    const queryClient = useQueryClient();
    
    const { data, isLoading } = useQuery({
        queryKey: ["markets"],
        queryFn: getMarkets,
    });
    
    const { mutateAsync: destroy } = useMutation({
        mutationFn: deleteMarket,
        onSuccess: () => {
            console.log('destroy')
            notifySuccess('Mercado deletado', 'Mercado deletado com sucesso!')
            queryClient.invalidateQueries({queryKey: ["markets"]});
        },
        onError: () => {
            console.log('destroy error')
            notifyError('Erro ao deletar mercado', 'Ocorreu um erro ao deletar o mercado. Tente novamente')
        }
    })
    
    const { mutateAsync: turnStatus } = useMutation({
        mutationFn: turnMarketStatus,
        onSuccess: () => {
          notifySuccess('Status do Mercado alterado', 'Status do Mercado alterado com sucesso!')
          queryClient.invalidateQueries({queryKey: ["markets"]});
        },
        onError: () => {
          notifyError('Erro ao alterar status do Mercado', 'Ocorreu um erro ao alterar o status do Mercado. Tente novamente')
        }
      })

    return { 
        markets: data, 
        isLoading, 
        destroy,
        turnStatus
    }
}