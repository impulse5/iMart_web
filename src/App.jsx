import { RegisterRoutes } from './routes/register.routes';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <RegisterRoutes />
    </BrowserRouter>
  );
}

export default App;
