import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthentication } from '@/contexts/AuthenticationContext'

export const ProtectedRoutes = () => {
  const navigate = useNavigate()
  const { authenticate } = useAuthentication()

  useEffect(() => {
    if (!authenticate()) {
      navigate('/login')
    }
  }, [])

  return (
    <Outlet />
  )
}
