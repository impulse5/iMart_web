import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";
import { Trash2, Pencil, Check, X } from "lucide-react";

export const RemoveIcon = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Trash2 className="cursor-pointer text-error" />
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-medium">Excluir</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const EditIcon = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Pencil className="cursor-pointer text-secondary" />
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-medium">Editar</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export const ActivateIcon = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Check className="cursor-pointer text-success" />
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-medium">Ativar</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export const DeactivateIcon = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <X size={30} className="cursor-pointer text-error" />
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-medium">Desativar</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}