import React from "react";
import { useTodoState } from "./todo-state";

export function TodoList() {
  const state = useTodoState();

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    if (!inputRef.current?.value) return;
    state.create(inputRef.current.value);
    inputRef.current.value = "";
  };

  return (
    <div>
      <ul>
        {state.todos.map((todo) => (
          <li
            key={todo.id}
            className={todo.completed ? "completed" : undefined}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(e) => state.update(todo.id, e.target.checked)}
            />
            <span>{todo.title}</span>
            <button onClick={() => state.delete(todo.id)}>x</button>
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
