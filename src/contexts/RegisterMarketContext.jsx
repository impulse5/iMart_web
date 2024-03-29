import { useContext, createContext, useState } from 'react';

export const RegisterMarketContext = createContext();

export const RegisterMarketProvider = ({ children }) => {
  const [enterpriseData, setEnterpriseData] = useState({
    name: '',
    cnpj: '',
    phone: '',
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
  });

  const [successEnterpriseData, setSuccessEnterpriseData] = useState(false);
  const [successEnterpriseAddress, setSuccessEnterpriseAddress] = useState(false);
  const [successEnterpriseAccess, setSuccessEnterpriseAccess] = useState(false);

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
