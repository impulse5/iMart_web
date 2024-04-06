import { DashboardsRoutes } from './routes/dashboards.routers'
import { RegisterRoutes } from './routes/register.routes'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <RegisterRoutes />
      <DashboardsRoutes/>
    </BrowserRouter>
  )
}

export default App
