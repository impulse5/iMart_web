import { useAuthentication } from "@/contexts/AuthenticationContext";

export const useGetMarketId = () => {
    const { user } = useAuthentication();
    const getMarketId = async () => {
        let market_id = await user.market_id;
        if (!market_id) {
            let localUser = JSON.parse(localStorage.getItem('user') || '{}');
            market_id = localUser.market_id;
        }
        return market_id;
    };
    return { getMarketId };
}