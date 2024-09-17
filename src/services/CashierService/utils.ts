import { useMutation } from "@tanstack/react-query"
import { cash_withdrawal } from "."
import { useNotify } from "@/hooks/useNotify";


export const CashierService = () => {
    const { notifySuccess, notifyError } = useNotify();

    const { mutateAsync: cashWithdrawal } = useMutation({
        mutationFn: cash_withdrawal,
        onSuccess: () => {
            notifySuccess('Sangria realizada', 'A sangria foi realizada com sucesso')
        },
        onError: (error: any) => {
            const errorMessage = error.message || 'Ocorreu um erro ao realizar a sangria';
            notifyError('Erro na sangria', errorMessage);
          }
    })

    return { 
        cashWithdrawal
    }
}