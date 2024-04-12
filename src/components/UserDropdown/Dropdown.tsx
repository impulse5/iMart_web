import { DropdownMenu,DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup,  DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { LogOut } from "lucide-react";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import { useNavigate } from "react-router-dom";

interface DropdownProps {
    title: string;
    trigger: React.ReactElement,
}

export function UserDropdown({title, trigger}: DropdownProps) {

    const { logout } = useAuthentication();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
                {trigger}
            </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-[#171717] border border-neutral-400/70 rounded p-3">
            <DropdownMenuLabel className="text-neutral-400">{title}</DropdownMenuLabel>
          <DropdownMenuRadioGroup>
              <DropdownMenuItem onClick={handleLogout} className="flex justify-between mt-2 outline-none cursor-pointer">
                    Sair
                  <LogOut size={20}/>
              </DropdownMenuItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
}