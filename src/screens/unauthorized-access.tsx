import { Button } from "@/components/ui/Button/button";
import { LogoWhite } from "../assets/imart_logo_white"
import { useAuthentication } from "@/contexts/AuthenticationContext";
import { useNavigate } from "react-router-dom";

export function UnauthorizedAccess() {
  const { logout } = useAuthentication()
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
}
  return (
    <>
      <div className="flex justify-center items-center flex-col bg-primary w-full h-screen text-secondary text-center gap-4 ">
        <LogoWhite height={100} width={200} />
        <div className="space-y-4">
          <h1 className="font-bold text-2xl">Você não tem autorização para acessar esse recurso!</h1>
          <Button variant="ghost" onClick={handleLogout}>Voltar para login</Button>
        </div>      
      </div>
    </>
  );
}
