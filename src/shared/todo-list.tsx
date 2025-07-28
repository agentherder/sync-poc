import { useQuery } from "@triplit/react";
import React from "react";
import { triplit } from "../../triplit/client";

function useTodos() {
  const todosQuery = triplit.query("todos").Order("createdAt", "DESC");
  const { results: todos, error } = useQuery(triplit, todosQuery);
  return { todos, error };
}

export function TodoList() {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputRef.current?.value) return;
    await triplit.insert("todos", { title: inputRef.current.value });
    inputRef.current.value = "";
  };

  const { todos, error } = useTodos();

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={inputRef} />
        <button type="submit">Add</button>
      </form>
      {error && <div>{error.message}</div>}
      <ul>
        {todos?.map((todo) => (
          <li
            key={todo.id}
            className={todo.completed ? "completed" : undefined}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(e) =>
                triplit.update("todos", todo.id, {
                  completed: e.target.checked,
                })
              }
            />
            <span>{todo.title}</span>
            <button onClick={() => triplit.delete("todos", todo.id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
