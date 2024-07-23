import { api } from "../api"
import { MARKET_COLLECTION_ROUTE } from "@/constants/api_routes"
import { MarketRequest } from "@/types/market"

export const utils = () => {
    const registerMarket = async (marketData: MarketRequest) => {
        try {
          const response = await api.post(MARKET_COLLECTION_ROUTE(), marketData)
          return response.data
        } catch (error) {
            console.log("Error registering market:", error)
            throw error
        }
    }
    return {
        registerMarket
    }
}


