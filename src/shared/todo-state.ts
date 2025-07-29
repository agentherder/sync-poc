import React from "react";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export function useTodoState() {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  return {
    todos,
    create: (title: string) =>
      setTodos((prev) => [
        ...prev,
        { id: crypto.randomUUID(), title, completed: false },
      ]),
    update: (id: string, completed: boolean) =>
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
      ),
    delete: (id: string) =>
      setTodos((prev) => prev.filter((todo) => todo.id !== id)),
  };
}
