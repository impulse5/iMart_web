import { Routes, Route } from 'react-router-dom'
import { Sidebar } from '../screens/Dashboards/Sidebar'
import { Dashboard } from '../screens/Dashboards/Dashboard'
import { ProtectedRoutes } from './protected.routes'

export function DashboardRoutes() {

  return (
    <Routes>
      <Route element={<Sidebar/>}>
        <Route element={<ProtectedRoutes/>}>
          <Route index path="/dashboard" element={<Dashboard/>} />
        </Route>
      </Route>
    </Routes>
  )
}