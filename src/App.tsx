import { DashboardRoutes } from './routes/dashboard.routes'
import { RegisterRoutes } from './routes/register.routes'
import { BrowserRouter } from 'react-router-dom'
import { AuthenticationProvider } from './contexts/AuthenticationContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticationProvider>
        <BrowserRouter>
          <RegisterRoutes />
          <DashboardRoutes />
        </BrowserRouter>
      </AuthenticationProvider>
    </QueryClientProvider>
  )
}

export default App
