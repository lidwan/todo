import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
}

export function NewTodoForm({ onSubmit }: NewTodoFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      todoContent: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="todoContent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Todo Content</FormLabel>
              <FormControl>
                <Input placeholder="Add your todo" {...field} />
              </FormControl>
              <FormDescription>
                Add a new Todo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant={"outline"}>Add Todo</Button>
      </form>
    </Form>
  );
}
