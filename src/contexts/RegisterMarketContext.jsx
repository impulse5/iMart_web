import { useContext, createContext, useState, useEffect } from 'react';
import { GET_CITY_STATE_BY_CEP, POST_CREATE_MARKET } from '@/constants/api_routes';
import axios from 'axios';
import api from '../services/api';

export const RegisterMarketContext = createContext();

export const RegisterMarketProvider = ({ children }) => {
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
      const response = await api.post(POST_CREATE_MARKET, {
        market: {
          ...enterpriseData,
        },
        address: {
          ...enterpriseAddress,
        },
        user: {
          name: enterpriseAccess.name,
          email: enterpriseAccess.email,
          password: enterpriseAccess.password,
        },
      });
      setRegisterMarketLoading(false);
      setRegisterSuccess(true);
    } catch (error) {
      setRegisterMarketLoading(false);
      setRegisterMarketError(error);
    }
  };

  useEffect(() => {
    if (/^\d{5}-\d{3}$/.test(enterpriseAddress.zipcode)) {
      getCityAndState();
    }
  }, [enterpriseAddress]);

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
