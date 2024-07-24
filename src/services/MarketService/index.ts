import { useMutation } from "@tanstack/react-query"
import { utils } from "./utils"

export const MarketService = () => {

    const { registerMarket } = utils()

    const { mutateAsync: register, isPending: IsLoading, isError} = useMutation({
        mutationFn: registerMarket,
    })

    return {
        register,
        IsLoading,
        isError
    }
}