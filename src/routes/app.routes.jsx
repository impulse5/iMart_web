import { Routes, Route } from 'react-router-dom';
import Home from '../screens/Home';
import TestComponents from '../screens/TestComponents';
import { EnterpriseData } from '../screens/MarketRegister/EnterpriseData';
import { EnterpriseAccess } from '../screens/MarketRegister/EnterpriseAccess';
import { EnterpriseAddress } from '../screens/MarketRegister/EnterpriseAddress';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test-components" element={<TestComponents />} />
      <Route path="/cadastre-se/dados-empresariais" element={<EnterpriseData />} />
      <Route path="/cadastre-se/acesso" element={<EnterpriseAccess/>} />
      <Route path="/cadastre-se/endereco" element={<EnterpriseAddress />} />
    </Routes>
  );
}
