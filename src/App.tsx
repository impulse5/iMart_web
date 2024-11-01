import { DashboardRoutes } from './routes/dashboard.routes'
import { RegisterRoutes } from './routes/register.routes'
import { BrowserRouter } from 'react-router-dom'
import { AuthenticationProvider } from './contexts/AuthenticationContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SellerRouter } from './routes/seller.routes'

export const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticationProvider>
        <BrowserRouter>
          <RegisterRoutes />
          <DashboardRoutes />
          <SellerRouter />
        </BrowserRouter>
      </AuthenticationProvider>
    </QueryClientProvider>
  )
}

export default App
