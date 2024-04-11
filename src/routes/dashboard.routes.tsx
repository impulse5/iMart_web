import { Routes, Route } from 'react-router-dom'
import { Sidebar } from '../screens/Dashboards/Sidebar'
import { Dashboard } from '../screens/Dashboards/Dashboard'
import { EmployeeDashboard } from '@/screens/Dashboards/EmployeeDashboard'
import { SupplierDashboard } from '@/screens/Dashboards/SupplierDashboard'
import { ProtectedRoutes } from './protected.routes'

export function DashboardRoutes() {

  return (
    <Routes>
      <Route element={<Sidebar/>}>
        <Route element={<ProtectedRoutes/>}>
          <Route index path="/dashboard" element={<Dashboard/>} />
          <Route path='/funcionarios' element={<EmployeeDashboard/>} />
          <Route path='/fornecedores' element={<SupplierDashboard/>} />
        </Route>
      </Route>
    </Routes>
  )
}