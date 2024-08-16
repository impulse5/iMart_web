import { MARKET_COLLECTION_ROUTE, MARKET_MEMBER_ROUTE } from "@/constants/api_routes"
import { api } from "../api";


const utils = () => {
    const getMarkets = async () => {
        try {
            const response = await api.get(MARKET_COLLECTION_ROUTE());
            return response.data.markets;
        } catch (error) {
            console.error('Error fetching markets:', error);
            throw error;
        }
    }

    const deleteMarket = async (marketId: string) => {
        try {
            const response = await api.delete(MARKET_MEMBER_ROUTE(marketId));
            return response.data;
        } catch (error) {
            console.error('Error deleting market:', error);
            throw error;
        }
    }
    return {
        getMarkets,
        deleteMarket
    }
}
 
export default utils;