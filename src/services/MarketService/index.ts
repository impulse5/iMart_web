import { useMutation, useQuery} from "@tanstack/react-query"
import { utils } from "./utils"

export const MarketService = () => {

    const { registerMarket, getCityAndState} = utils()

    const { data: fetchCityAndStateByZipcode } = useQuery({
        queryKey: ['cityAndState'],
        queryFn: () => getCityAndState,
    })
    

    const { mutateAsync: register, isPending: IsLoading, isError} = useMutation({
        mutationFn: registerMarket,
    })

    return {
        register,
        IsLoading,
        isError,
        fetchCityAndStateByZipcode
    }
}