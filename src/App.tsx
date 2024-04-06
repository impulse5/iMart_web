import { DashboardRoutes } from './routes/dashboard.routes'
import { RegisterRoutes } from './routes/register.routes'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <RegisterRoutes />
      <DashboardRoutes />
    </BrowserRouter>
  )
}

export default App
