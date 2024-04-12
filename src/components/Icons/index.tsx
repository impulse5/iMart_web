import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";
import { Trash2, Pencil } from "lucide-react";

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
