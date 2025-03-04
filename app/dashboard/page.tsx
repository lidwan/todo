"use client";

import CompleteTodoButton from "@/components/CompleteTodoButton";
import DeleteTodoButton from "@/components/DeleteTodoButton.";
import EditTodoButton from "@/components/EditTodoButton";
import Footer from "@/components/Footer";
import LoadingState from "@/components/LoadingState";
import { NewTodoForm } from "@/components/NewTodoForm";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toHumanReadbleDate } from "@/lib/toHumanReadbleDate";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Todo {
  uuid: string;
  todo_content: string;
  created_at: string;
  completed_at: string | null;
  is_completed: boolean;
  updated_at: string | null;
}

export default function Dashboard() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddButtonLoading, setAddButtonLoading] = useState(false);
  const [isEditButtonLoading, setEditButtonLoading] = useState(false);
  const [completingTodoId, setCompletingTodoId] = useState<string | null>(null);
  const [deletingTodoId, setDeletingTodoId] = useState<string | null>(null);

  const [showCompleted, setShowCompleted] = useState(false);

  function handleToggle() {
    if (showCompleted) {
      setTodos(todos.filter((todo) => todo.is_completed));
    } else {
      fetchTodos();
    }
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
      setTodos(
        data.sort(
          (a: Todo, b: Todo) => Number(a.is_completed) - Number(b.is_completed)
        )
      );
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

    const completedAt = new Date().toISOString();
    const res = await fetch("/api/todos", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todoId: uuid,
        is_completed: true,
        completed_at: completedAt,
      }),
    });

    if (res.ok) {
      fetchTodos();
    }
    setCompletingTodoId(null);
  };

  const handleEditTodo = async (
    values: { todoContent: string },
    uuid: string
  ) => {
    setEditButtonLoading(true);
    const updatedAt = new Date().toISOString();
    const res = await fetch("/api/todos", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todoId: uuid,
        todo_content: values.todoContent,
        updated_at: updatedAt,
      }),
    });

    if (res.ok) {
      fetchTodos();
    }
    setEditButtonLoading(false);
  };

  return (
    <div className="flex flex-col justify-between mt-4 h-[90vh]">
      <div>
        <div className="flex flex-col gap-4 justify-center items-center">
          <h1 className="text-3xl font-bold">Your Todos</h1>
          <div className="w-3/4 md:w-[50vw] flex justify-center items-center">
            <NewTodoForm
              onSubmit={handleAddTodo}
              isAddButtonLoading={isAddButtonLoading}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 self-center justify-center mt-10">
          <Switch
            id="only-completed"
            checked={showCompleted}
            onCheckedChange={setShowCompleted}
          />
          <Label htmlFor="only-completed">Only Show completed Todos</Label>
        </div>

        <div className=" flex flex-col justify-center items-center mt-10 mb-10">
          {isLoading ? (
            <div className="space-y-4 w-3/4 md:w-1/2 flex flex-col justify-center items-center">
              <LoadingState />
            </div>
          ) : (
            <div className="w-[88%] md:w-1/2 flex flex-col gap-6">
              {todos.length > 0 ? (
                todos.map((todo) => (
                  <div
                    key={todo.uuid}
                    className="flex items-center justify-between gap-8 bg-primary-foreground min-h-[100px] p-4 rounded-lg ">
                    <div className="flex flex-col justify-between  gap-1">
                      <div
                        className={
                          todo.is_completed
                            ? "text-green-700 font-bold"
                            : "font-bold"
                        }>
                        {todo.todo_content}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        Created: {toHumanReadbleDate(todo.created_at)}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        {todo.updated_at &&
                          "Last Edited: " + toHumanReadbleDate(todo.updated_at)}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        {todo.completed_at &&
                          "Completed: " + toHumanReadbleDate(todo.completed_at)}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div onClick={() => handleCompleteButton(todo.uuid)}>
                        {!todo.is_completed &&
                          (completingTodoId === todo.uuid ? (
                            <div className="justify-self-center">
                              <Loader2 className="animate-spin" />
                            </div>
                          ) : (
                            <CompleteTodoButton />
                          ))}
                      </div>
                      <div>
                        {!todo.is_completed && (
                          <EditTodoButton
                            currentTodoContent={todo.todo_content}
                            isEditButtonLoading={isEditButtonLoading}
                            onSubmit={(values: { todoContent: string }) =>
                              handleEditTodo(values, todo.uuid)
                            }
                          />
                        )}
                      </div>
                      <div onClick={() => handleDeleteButton(todo.uuid)}>
                        {deletingTodoId === todo.uuid ? (
                          <div className="justify-self-center">
                            <Loader2 className="animate-spin" />
                          </div>
                        ) : (
                          <DeleteTodoButton />
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : showCompleted ? (
                <div className="self-center">
                  No Completed Todos yet, Mark a Todo as completed!
                </div>
              ) : (
                <div className="self-center">
                  No Todos added yet, Add a new Todo!
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
