import { CheckCheck } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

function CompleteTodoButton() {
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"outline"}>
              <CheckCheck />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="font-bold">Complete Todo</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
export default CompleteTodoButton;
