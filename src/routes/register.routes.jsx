import { Routes, Route } from 'react-router-dom';
import { EnterpriseData } from '../screens/MarketRegister/EnterpriseData';
import { EnterpriseAccess } from '../screens/MarketRegister/EnterpriseAccess';
import { EnterpriseAddress } from '../screens/MarketRegister/EnterpriseAddress';
import { Redirect } from '@/components/Redirect';
import { RegisterMarketProvider } from '@/contexts/RegisterMarketContext';

export function RegisterRoutes() {
  return (
    <RegisterMarketProvider>
      <Routes>
        <Route path="/cadastre-se/dados-empresariais" element={<EnterpriseData />} />
        <Route path="/cadastre-se/acesso" element={<EnterpriseAccess />} />
        <Route path="/cadastre-se/endereco" element={<EnterpriseAddress />} />
        <Route path="/" element={<Redirect route="/cadastre-se/dados-empresariais" />} />
      </Routes>
    </RegisterMarketProvider>
  );
}
