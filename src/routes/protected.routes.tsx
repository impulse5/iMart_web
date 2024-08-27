import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthentication } from '@/contexts/AuthenticationContext';

export const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authenticate, getRole, token } = useAuthentication();

  useEffect(() => {
    if (!authenticate()) {
      if (location.pathname !== '/login') {
        navigate('/login');
      }
      return;
    }

    const role = getRole();

    if (role === 'stockist') {
      if (location.pathname !== '/sem-permissao') {
        navigate('/sem-permissao');
      }
    } else if (role === 'seller' && location.pathname !== '/caixa') {
      navigate('/caixa');
    } else if ((role === 'owner' || role === 'caixista') && location.pathname === '/sem-permissao') {
      navigate('/dashboard');
    } else if (role !== 'seller' && location.pathname.startsWith('/caixa')) {
      navigate('/dashboard');
    }
  }, [authenticate, getRole, location.pathname, navigate, token]);

  return <Outlet />;
};
