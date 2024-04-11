import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";
import { Trash2 } from "lucide-react";

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
