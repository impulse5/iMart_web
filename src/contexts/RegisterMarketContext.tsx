import { useContext, createContext, useState, useEffect } from 'react';
import { MarketService,  } from "@/services/MarketService/index"
import { EnterpriseAccess, EnterpriseAddress, EnterpriseData, MarketRequest } from '@/types/market';

interface RegisterMarketContextData {
  enterpriseData: EnterpriseData;
  setEnterpriseData: (data: EnterpriseData) => void;
  enterpriseAddress: EnterpriseAddress;
  setEnterpriseAddress: (data: EnterpriseAddress) => void;
  enterpriseAccess: EnterpriseAccess;
  setEnterpriseAccess: (data: EnterpriseAccess) => void;
  successEnterpriseData: boolean;
  setSuccessEnterpriseData: (data: boolean) => void;
  successEnterpriseAddress: boolean;
  setSuccessEnterpriseAddress: (data: boolean) => void;
  successEnterpriseAccess: boolean;
  setSuccessEnterpriseAccess: (data: boolean) => void;
  setRegisterSuccess: (data: boolean) => void;
  registerMarket: () => void;
  registerSuccess: boolean;
  IsLoading: boolean;
  isError: boolean
}

export const RegisterMarketContext = createContext({} as RegisterMarketContextData );

type Props = {
  children: React.ReactNode;
}

export const RegisterMarketProvider = ({ children }: Props) => {
  const [enterpriseData, setEnterpriseData] = useState<EnterpriseData>({
    name: '',
    cnpj: '',
    cellphone: '',
  });

  const [enterpriseAddress, setEnterpriseAddress] = useState<EnterpriseAddress>({
    street: '',
    neighborhood: '',
    number: '',
    zipcode: '',
    city: '',
    state: '',
  });

  const [enterpriseAccess, setEnterpriseAccess] = useState<EnterpriseAccess>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [successEnterpriseData, setSuccessEnterpriseData] = useState(false);
  const [successEnterpriseAddress, setSuccessEnterpriseAddress] = useState(false);
  const [successEnterpriseAccess, setSuccessEnterpriseAccess] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const { register, IsLoading, isError, fetchCityAndStateByZipcode} = MarketService();

  const getCityAndState = async () => {
    try {
      if (fetchCityAndStateByZipcode) {
        const data = await fetchCityAndStateByZipcode(enterpriseAddress.zipcode);
        setEnterpriseAddress((prevState) => ({
          ...prevState,
          city: data.localidade,
          state: data.uf,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const registerMarket = async () => {
    const marketData: MarketRequest = {
      address: enterpriseAddress,
      user: {
        name: enterpriseAccess.name,
        email: enterpriseAccess.email,
        password: enterpriseAccess.password,
      },
      market: enterpriseData,
    };  
     try {
       await register(marketData)
       setRegisterSuccess(true);
       console.log("Mercado cadastrado com sucesso")     
     } catch (error) {
      console.log("Erro ao cadastrar", error)
     }
  }
  

  useEffect(() => {
    if (/^\d{5}-\d{3}$/.test(enterpriseAddress.zipcode)) {
      getCityAndState();
    }
  }, [enterpriseAddress.zipcode]);

  return (
    <RegisterMarketContext.Provider
      value={{
        enterpriseData,
        setEnterpriseData,
        enterpriseAddress,
        setEnterpriseAddress,
        enterpriseAccess,
        setEnterpriseAccess,
        successEnterpriseData,
        setSuccessEnterpriseData,
        successEnterpriseAddress,
        setSuccessEnterpriseAddress,
        successEnterpriseAccess,
        setSuccessEnterpriseAccess,
        setRegisterSuccess,
        registerMarket,
        registerSuccess,
        isError,
        IsLoading
      }}
    >
      {children}
    </RegisterMarketContext.Provider>
  );
};

export const useRegisterMarket = () => {
  const context = useContext(RegisterMarketContext);

  if (!context) {
    throw new Error('useRegisterMarket must be used within a RegisterMarketProvider');
  }

  return context;
};
