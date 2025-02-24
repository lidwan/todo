import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Zod schema for validation
const formSchema = z.object({
  todoContent: z.string().min(1, {
    message: "Todo must contain more than one char!",
  }),
});

interface NewTodoFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void; // Prop type for onSubmit function
  isAddButtonLoading: boolean;
}

export function NewTodoForm({
  onSubmit,
  isAddButtonLoading,
}: NewTodoFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      todoContent: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-[40vw]">
        <FormField
          control={form.control}
          name="todoContent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add new Todo</FormLabel>
              <FormControl>
                <Input placeholder="What needs to be done?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isAddButtonLoading ? (
          <Button variant={"outline"} disabled>
            <Loader2 className="animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit" variant={"outline"}>
            Add Todo
          </Button>
        )}
      </form>
    </Form>
  );
}
