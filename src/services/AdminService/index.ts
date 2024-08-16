import { useQuery } from "@tanstack/react-query";
import utils from "./utils";

export const AdminService = () => {
    const { getMarkets } = utils();
    
    const { data, isLoading } = useQuery({
        queryKey: ["markets"],
        queryFn: getMarkets,
    });
    
    return { 
        markets: data, 
        isLoading, 
    }
}