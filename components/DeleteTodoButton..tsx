import { Trash2 } from "lucide-react"
import { Button } from "./ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

function EditTodoButton() {
  return (
    <div>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
        <Button variant={"outline"}><Trash2 /></Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-bold">Delete Todo</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
  )
}
export default EditTodoButton