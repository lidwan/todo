"use client"

import { useEffect, useState } from "react";
import { NewTodoForm } from "@/components/NewTodoForm";
import LoadingState from "@/components/LoadingState";
import DeleteTodoButton from "@/components/DeleteTodoButton.";
import { toHumanReadbleDate } from "@/lib/toHumanReadbleDate";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import CompleteTodoButton from "@/components/CompleteTodoButton";

interface Todo {
  uuid: string;
  todo_content: string;
  created_at: string;
  completed_at: string | null;
  is_completed: boolean;
}

export default function Dashboard() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddButtonLoading, setAddButtonLoading] = useState(false);
  const [completingTodoId, setCompletingTodoId] = useState<string | null>(null);
  const [deletingTodoId, setDeletingTodoId] = useState<string | null>(null);

  const [showCompleted, setShowCompleted] = useState(false);

  function handleToggle () {
    showCompleted ? setTodos(todos.filter((todo) => todo.is_completed)) : fetchTodos();
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    handleToggle();
  }, [showCompleted]);
  
  const fetchTodos = async () => {
    setIsLoading(true);
    const res = await fetch("/api/todos");
    if (res.ok) {
      const data = await res.json();
      setTodos(data.toReversed().sort((a: Todo, b: Todo) => Number(a.is_completed) - Number(b.is_completed)));

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
      fetchTodos();
    } else {
      console.error("Failed to add todo");
    }
    setAddButtonLoading(false);
  };

  const handleDeleteButton = async (uuid: string) => {
    setDeletingTodoId(uuid);
    const res = await fetch("/api/todos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todoId: uuid }),
    });
  
    if (res.ok) {
      fetchTodos();
    }
    setDeletingTodoId(null);
  };

  const handleCompleteButton = async (uuid: string) => {
    setCompletingTodoId(uuid);
    // TODO
  
    if (res.ok) {
      fetchTodos();
    }
    setCompletingTodoId(null);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4 justify-center items-center">
        <h1 className="text-3xl font-bold">Your Todos</h1>
        <NewTodoForm onSubmit={handleAddTodo} isAddButtonLoading={isAddButtonLoading}/>
      </div>

      <div className="flex items-center space-x-2 self-center mt-10">
        <Switch id="only-completed" checked={showCompleted} onCheckedChange={setShowCompleted}/>
        <Label htmlFor="only-completed">Only Show completed Todos</Label>
      </div>

      <div className=" flex flex-col justify-center items-center mt-10 mb-10">
        {isLoading ? (
          <div className="space-y-4 w-3/4 md:w-1/2 flex flex-col justify-center items-center">
            <LoadingState />
          </div>
        ) : (
          <div className="w-3/4 md:w-1/2 flex flex-col gap-6">
            {todos.length > 0 ? (
              todos.map((todo) => (
              <div key={todo.uuid} className="flex items-center justify-between gap-8 bg-primary-foreground min-h-[100px] p-4 rounded-lg ">
                <div className="flex flex-col justify-between  gap-1">
                  <div className={todo.is_completed ? "text-green-700 font-bold" : "font-bold"}>{todo.todo_content}</div>
                  <div className="text-muted-foreground text-xs">Created: {toHumanReadbleDate(todo.created_at)}</div>
                  <div className="text-muted-foreground text-xs">{todo.completed_at && "Completed: "+toHumanReadbleDate(todo.completed_at)}</div>
                </div>
                  <div className="flex flex-col gap-2">
                    <div onClick={() => handleCompleteButton(todo.uuid)}>
                        {completingTodoId === todo.uuid ? <div className="justify-self-center"><Loader2 className="animate-spin" /></div> : <CompleteTodoButton />}
                    </div>
                    <div onClick={() => handleDeleteButton(todo.uuid)}>
                        {deletingTodoId === todo.uuid ? <div className="justify-self-center"><Loader2 className="animate-spin" /></div> : <DeleteTodoButton />}
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