import React from "react";
import { useRow, useRowIds } from "tinybase/ui-react";
import { todoStore } from "./todo-store";

export function TodoList() {
  const todoIds = useRowIds("todos");

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    if (!inputRef.current?.value) return;
    todoStore.setRow("todos", crypto.randomUUID(), {
      title: inputRef.current.value,
      completed: false,
    });
    inputRef.current.value = "";
  };

  return (
    <div>
      <ul>
        {todoIds.map((id) => (
          <TodoItem key={id} id={id} />
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={inputRef} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

function TodoItem({ id }: { id: string }) {
  const todo = useRow("todos", id);
  return (
    <li key={id} className={todo.completed ? "completed" : undefined}>
      <input
        type="checkbox"
        checked={!!todo.completed}
        onChange={(e) =>
          todoStore.setRow("todos", id, { completed: e.target.checked })
        }
      />
      <span>{todo.title}</span>
      <button onClick={() => todoStore.delRow("todos", id)}>x</button>
    </li>
  );
}
