import React from "react";
import {
  useAddRowCallback,
  useDelRowCallback,
  useRow,
  useRowIds,
  useSetCellCallback,
} from "tinybase/ui-react";

export function TodoList() {
  const todoIds = useRowIds("todos");

  const inputRef = React.useRef<HTMLInputElement>(null);

  const addTodo = useAddRowCallback("todos", (title: string) => ({ title }));

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    if (!inputRef.current?.value) return;
    addTodo(inputRef.current.value);
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

  const toggleTodo = useSetCellCallback(
    "todos",
    id,
    "completed",
    (e: React.ChangeEvent<HTMLInputElement>) => e.target.checked
  );

  const delTodo = useDelRowCallback("todos", id);

  return (
    <li key={id} className={todo.completed ? "completed" : undefined}>
      <input type="checkbox" checked={!!todo.completed} onChange={toggleTodo} />
      <span>{todo.title}</span>
      <button onClick={delTodo}>x</button>
    </li>
  );
}
