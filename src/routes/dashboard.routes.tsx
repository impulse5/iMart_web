import { Routes, Route } from 'react-router-dom'
import { Sidebar } from '../screens/Dashboards/Sidebar'
import { Dashboard } from '../screens/Dashboards/Dashboard'
import { ProtectedRoutes } from './protected.routes'
import CategoryDashboard from '@/screens/Dashboards/CategoryDashboard'
import SupplierDashboard from '@/screens/Dashboards/SupplierDashboard'
import EmployeeDashboard from '@/screens/Dashboards/EmployeeDashboard'
import ProductDashboard from '@/screens/Dashboards/ProductDashboard'

export function DashboardRoutes() {

  return (
    <Routes>
      <Route element={<Sidebar/>}>
        <Route element={<ProtectedRoutes/>}>
          <Route index path="/dashboard" element={<Dashboard/>} />
          <Route path='/funcionarios' element={<EmployeeDashboard/>} />
          <Route path='/fornecedores' element={<SupplierDashboard/>} />
          <Route path='/categorias' element={<CategoryDashboard/>} />
          <Route path='/produtos' element={<ProductDashboard/>} />
        </Route>
      </Route>
    </Routes>
  )
}