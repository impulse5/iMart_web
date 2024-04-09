import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import authenticate from '@/hooks/authenticate'
import { useEffect } from 'react'

export const ProtectedRoutes = () => {

  useEffect(() => {
    authenticate() || <Navigate to="/login" />
  }, [])

  return (
    <Outlet />
  )
}
