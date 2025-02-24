import { Pencil } from "lucide-react"
import { Button } from "./ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

function EditTodoButton() {
  return (
    <div>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant={"outline"}><Pencil /></Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-bold">Edit Todo</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
  )
}
export default EditTodoButton