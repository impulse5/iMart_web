import { Routes, Route } from 'react-router-dom';
import Home from '../screens/Home';
import TestComponents from '../screens/TestComponents';
import { EnterpriseData } from '../screens/MarketRegister/EnterpriseData';
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test-components" element={<TestComponents />} />
      <Route path="/cadastre-se/dados-empresariais" element={<EnterpriseData />} />
    </Routes>
  );
}
