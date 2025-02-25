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
        <PopoverTrigger>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant={"outline"}>
                  <Pencil />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-bold">Edit Todo</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </PopoverTrigger>
        <PopoverContent>
          <div className="">
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
