import { Routes, Route } from 'react-router-dom'
import { Sidebar } from '../screens/Dashboards/Sidebar'
import { Dashboard } from '../screens/Dashboards/Dashboard'
import { ProtectedRoutes } from './protected.routes'
import CategoryDashboard from '@/screens/Dashboards/CategoryDashboard'
import SupplierDashboard from '@/screens/Dashboards/SupplierDashboard'
import EmployeeDashboard from '@/screens/Dashboards/EmployeeDashboard'
import ProductDashboard from '@/screens/Dashboards/ProductDashboard'
import StorageDashboard from '@/screens/Dashboards/StorageDashboard'
import StoredProductDetails from '@/screens/Dashboards/StorageDashboard/StoredProductDetails'
import AdminDashboard from '@/screens/Dashboards/AdminDashboard'
import { UnauthorizedAccess } from '@/screens/unauthorized-access'

export function DashboardRoutes() {

  return (
    <Routes>
      <Route element={<ProtectedRoutes/>}>
        <Route element={<Sidebar/>}>
          <Route index path="/dashboard" element={<Dashboard/>} />
          <Route path='/funcionarios' element={<EmployeeDashboard/>} />
          <Route path='/fornecedores' element={<SupplierDashboard/>} />
          <Route path='/categorias' element={<CategoryDashboard/>} />
          <Route path='/produtos' element={<ProductDashboard/>} />
          <Route path='/estoque' element={<StorageDashboard />} />
          <Route path='/admin' element={<AdminDashboard />} />
        </Route>
        <Route path="/sem-permissao" element={<UnauthorizedAccess />}/>
      </Route>  
        <Route path="/estoques/:storageId" element={<StoredProductDetails/>} />
    </Routes>
  )
}