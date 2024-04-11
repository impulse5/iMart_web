import { useNavigate } from "react-router-dom";


export const useLogoutHandler = () => {

  const navigate = useNavigate();

  try {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
    return true;
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    return false;
  }
};