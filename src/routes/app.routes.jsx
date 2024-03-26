import { Routes, Route } from 'react-router-dom';
import Home from '../screens/Home';
import TestComponents from '../screens/TestComponents';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test-components" element={<TestComponents />} />
    </Routes>
  );
}
