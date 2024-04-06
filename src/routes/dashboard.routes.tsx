import { Routes, Route } from 'react-router-dom'
import { Sidebar } from '../screens/Dashboards/Sidebar'

import { Dashboard } from '../screens/Dashboards/Dashboard'
import { SupplierDashboard } from '@/screens/Dashboards/SupplierDashboard'

export function DashboardRoutes() {
  return (
    <Routes>
        <Route element={<Sidebar/>}>
        <Route index path='/dashboard' element={<Dashboard/>} />
        <Route path='/fornecedores' element={<SupplierDashboard/>}/>
      </Route>
    </Routes>
  )
}