import { DropdownMenu,DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup,  DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { LogOut } from "lucide-react";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import { CircleUserRound } from "lucide-react";

export function UserDropdown() {

    const { logout } = useAuthentication();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
                <CircleUserRound className="text-neutral-400 size-12 cursor-pointer" />
            </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-[#171717] border border-neutral-400/70 rounded p-3">
            <DropdownMenuLabel className="text-neutral-400">Minha conta</DropdownMenuLabel>
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