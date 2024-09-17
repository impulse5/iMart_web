import { useNavigate } from 'react-router-dom';
import { useRegisterMarket } from '@/contexts/RegisterMarketContext';
import { useAuthentication } from '@/contexts/AuthenticationContext';
import { useEnterpriseDataValidation } from './useEnterpriseDataValidation';
import { EnterpriseDataForm } from './components/EnterpriseDataForm';
import { useEffect } from 'react';

export function EnterpriseData() {
  const navigate = useNavigate();
  const { enterpriseData, setEnterpriseData, setSuccessEnterpriseData } = useRegisterMarket();
  const { authenticate } = useAuthentication();

  useEffect(() => {
    if (authenticate()) {
      navigate('/dashboard');
    }
  }, [authenticate, navigate]);

  const breadcrumbItems = [
    { text: 'Dados empresariais', current: true },
    { text: 'Endereço', current: false },
    { text: 'Acesso', current: false },
  ];

  const handleNextStep = () => {
    setSuccessEnterpriseData(true);
    navigate('/cadastre-se/endereco');
  };

  const handleValidation = useEnterpriseDataValidation(enterpriseData, handleNextStep);

  return (
    <EnterpriseDataForm
      enterpriseData={enterpriseData}
      setEnterpriseData={setEnterpriseData}
      handleValidation={handleValidation}
      breadcrumbItems={breadcrumbItems}
      navigate={navigate}
    />
  );
}
