import React from "react";
import type { Todo } from "./types";

const initialTodos: Todo[] = [
  { id: crypto.randomUUID(), title: "apples", completed: false },
  { id: crypto.randomUUID(), title: "bananas", completed: false },
];

export function TodoList() {
  const [todos, setTodos] = React.useState<Todo[]>(initialTodos);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSetCompleted = (id: string, completed: boolean) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id !== id) return todo;
        return { ...todo, completed };
      })
    );
  };

  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    if (!inputRef.current?.value) return;
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: inputRef.current.value,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={todo.completed ? "completed" : undefined}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(e) => handleSetCompleted(todo.id, e.target.checked)}
            />
            <span>{todo.title}</span>
            <button onClick={() => handleDelete(todo.id)}>x</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={inputRef} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
