import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Pencil } from "lucide-react";
import { Button } from "./ui/button";
import { EditTodoForm } from "./EditTodoForm";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface props {
  currentTodoContent: string;
  onSubmit: (values: { todoContent: string }) => void;
  isEditButtonLoading: boolean;
}

function EditTodoButton({
  currentTodoContent,
  onSubmit,
  isEditButtonLoading,
}: props) {
  return (
    <div>
      <Popover>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Pencil />
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">Edit Todo</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <PopoverContent>
          <div>
            <EditTodoForm
              currentTodoContent={currentTodoContent}
              onSubmit={onSubmit}
              isEditButtonLoading={isEditButtonLoading}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
export default EditTodoButton;
