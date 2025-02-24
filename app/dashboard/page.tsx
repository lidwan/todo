"use client"

import { useEffect, useState } from "react";
import { NewTodoForm } from "@/components/NewTodoForm";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface Todo {
  uuid: string;
  todo_content: string;
  created_at: string;
  updated_at: string | null;
  is_completed: boolean;
  is_archived: boolean;
  due_date: string | null;
}

export default function Dashboard() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddButtonLoading, setAddButtonLoading] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);
  
  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    if (res.ok) {
      const data = await res.json();
      setTodos(data);
    } else {
      console.error("Failed to fetch todos");
    }
    setIsLoading(false);
  };

  const handleAddTodo = async (values: { todoContent: string }) => {
    setAddButtonLoading(true);
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo_content: values.todoContent }),
    });

    if (res.ok) {
      const newTodo = await res.json();
      console.log("Todo added:", newTodo);
      if (newTodo) fetchTodos();
      setAddButtonLoading(false);
    } else {
      console.error("Failed to add todo");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4 justify-center items-center">
        <h1 className="text-3xl">Your Todos</h1>
        <NewTodoForm onSubmit={handleAddTodo} isAddButtonLoading={isAddButtonLoading}/>
      </div>

      <div className=" flex flex-col justify-center items-center mt-10">
        {isLoading ? (
          <div className="space-y-4 w-3/4 md:w-1/2 flex flex-col justify-center items-center">
            <Skeleton className="h-4 w-[85%]" />
            <Skeleton className="h-5 w-[70%]" />
            <Skeleton className="h-4 w-[65%]" />
            <Skeleton className="h-4 w-[85%]" />
            <Skeleton className="h-5 w-[55%]" />
            <Skeleton className="h-4 w-[65%]" />
            <Skeleton className="h-4 w-[85%]" />
            <Skeleton className="h-5 w-[70%]" />
            <Skeleton className="h-4 w-[50%]" />
          </div>
        ) : (
          <div className="w-3/4 md:w-1/2 flex flex-col gap-6">
            {todos.length > 0 ? (
              todos.map((todo) => (
              <div key={todo.uuid} className="flex items-center justify-between gap-8 bg-card">
                <div className="w">{todo.todo_content}</div>
                  <div className="flex gap-2">
                    <div className="">
                    <Button variant={"outline"}><Pencil /></Button>
                  </div>
                  <div className="">
                    <Button variant={"outline"}><Trash2 /></Button>
                  </div>
                  </div>
              </div>
            ))) : (
              <div className="self-center">
                No Todos added yet, Add a new Todo!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}