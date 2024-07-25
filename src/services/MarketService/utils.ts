import { api } from "../api"
import { GET_CITY_STATE_BY_CEP, MARKET_COLLECTION_ROUTE } from "@/constants/api_routes"
import { MarketRequest } from "@/types/market"

export interface CityAndState {
    localidade: string;
    uf: string;
  }

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
    const getCityAndState = async (zipcode: string): Promise<CityAndState> => {
        try {
            const response = await api.get(GET_CITY_STATE_BY_CEP(zipcode))
            return response.data
        } catch (error) {
            console.log("Error getting city and state by zipcode:", error)
            throw error
        }
    }
    
    return {
        registerMarket,
        getCityAndState
    }
}


