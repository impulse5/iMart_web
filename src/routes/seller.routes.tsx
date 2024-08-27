import { Routes, Route } from 'react-router-dom'
import { ProtectedRoutes } from './protected.routes'
import CashierDashboard from '@/screens/Dashboards/CashierDashboard'

export function SellerRouter() {

  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
         <Route path='/caixa' element={<CashierDashboard/>}/> 
      </Route>  
    </Routes>
  )
}