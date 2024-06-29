import { api } from "@/services/api";
import { useNavigate } from "react-router-dom";

const logout = () => {

  const navigate = useNavigate();

  try {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    api.defaults.headers = {};
    navigate('/login');
    return true;
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    return false;
  }
};

export default logout;