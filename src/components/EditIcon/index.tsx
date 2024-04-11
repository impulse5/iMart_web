import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip/tooltip";
import { Pencil } from "lucide-react";

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
