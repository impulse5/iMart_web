import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import utils from "./utils";
import { useNotify } from "@/hooks/useNotify";

export const AdminService = () => {
    const { getMarkets, deleteMarket } = utils();
    const { notifySuccess, notifyError } = useNotify();
    const queryClient = useQueryClient();
    
    const { data, isLoading } = useQuery({
        queryKey: ["markets"],
        queryFn: getMarkets,
    });
    
    const { mutateAsync: destroy } = useMutation({
        mutationFn: deleteMarket,
        onSuccess: () => {
            notifySuccess('Mercado deletado', 'Mercado deletado com sucesso!')
            queryClient.invalidateQueries({queryKey: ["markets"]});
        },
        onError: () => {
            notifyError('Erro ao deletar mercado', 'Ocorreu um erro ao deletar o mercado. Tente novamente')
        }
    })
    
    return { 
        markets: data, 
        isLoading, 
        destroy
    }
}