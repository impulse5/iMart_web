import { DashboardRoutes } from './routes/dashboard.routes'
import { RegisterRoutes } from './routes/register.routes'
import { BrowserRouter } from 'react-router-dom'
import { AuthenticationProvider } from './contexts/AuthenticationContext'

function App() {
  return (
    <AuthenticationProvider>
      <BrowserRouter>
        <RegisterRoutes />
        <DashboardRoutes />
      </BrowserRouter>
    </AuthenticationProvider>
  )
}

export default App
