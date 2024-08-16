import {MARKET_COLLECTION_ROUTE } from "@/constants/api_routes"
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
    return {
        getMarkets
    }
}
 
export default utils;