import { AuthenticationContext } from "@/contexts/AuthenticationContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const auth = useContext(AuthenticationContext)
    const navigate = useNavigate();

    const handleLogout = async () => {
        await auth.signout();
        navigate('/login')
    }

    return (
        <div className="min-h-screen flex justify-center items-center">
            <h1 className="font-bold">pagina privada!</h1>
            <p>olá {auth.user?.name}</p>
            <button onClick={handleLogout}>Sair</button>
        </div>
    );
}