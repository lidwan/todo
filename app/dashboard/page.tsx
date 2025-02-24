"use client"


import { useEffect, useState } from "react";
import { NewTodoForm } from "@/components/NewTodoForm";

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
  };


  const handleAddTodo = async (values: { todoContent: string }) => {
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
      if(newTodo)
        fetchTodos();
    } else {
      console.error("Failed to add todo");
    }
  };

    return (
      <>
        <h1>Your Todos</h1>
        <NewTodoForm onSubmit={handleAddTodo} />

      <ul>
        {todos.map((todo) => (
          <li key={todo.uuid}>{todo.todo_content}</li>
        ))}
      </ul>
      </>
    );
}
  