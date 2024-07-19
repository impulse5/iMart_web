import { useContext, createContext, useState, useEffect } from 'react';
import { GET_CITY_STATE_BY_CEP, MARKET_COLLECTION_ROUTE } from '../constants/api_routes';
import axios from 'axios';
import { api } from '@/services/api';

export const RegisterMarketContext = createContext<any>(null);

type Props = {
  children: React.ReactNode;
}

export const RegisterMarketProvider = ({ children }: Props) => {
  const [enterpriseData, setEnterpriseData] = useState({
    name: '',
    cnpj: '',
    cellphone: '',
  });

  const [enterpriseAddress, setEnterpriseAddress] = useState({
    street: '',
    neighborhood: '',
    number: '',
    zipcode: '',
    city: '',
    state: '',
  });

  const [enterpriseAccess, setEnterpriseAccess] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [successEnterpriseData, setSuccessEnterpriseData] = useState(false);
  const [successEnterpriseAddress, setSuccessEnterpriseAddress] = useState(false);
  const [successEnterpriseAccess, setSuccessEnterpriseAccess] = useState(false);
  const [registerMarketLoading, setRegisterMarketLoading] = useState(false);
  const [registerMarketError, setRegisterMarketError] = useState(null);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const getCityAndState = async () => {
    const response = await axios(GET_CITY_STATE_BY_CEP(enterpriseAddress.zipcode));
    const data = response.data;
    setEnterpriseAddress((prevState) => ({
      ...prevState,
      city: data.localidade,
      state: data.uf,
    }));
  };

  const registerMarket = async () => {
    try {
      setRegisterMarketLoading(true);
      await api.post(MARKET_COLLECTION_ROUTE, {
        market: { ...enterpriseData },
        address: { ...enterpriseAddress },
        user: {
          name: enterpriseAccess.name,
          email: enterpriseAccess.email,
          password: enterpriseAccess.password,
        },
      });
      setRegisterMarketLoading(false);
      setRegisterSuccess(true);
      console.log("Cadastro bem-sucedido, redirecionando...");
    } catch (error) {
      setRegisterMarketLoading(false);
      setRegisterMarketError(error as any);
      console.error("Erro ao cadastrar:", error);
    }
  };
  

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
        registerMarketError,
        registerMarketLoading,
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
