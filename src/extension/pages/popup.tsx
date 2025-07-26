import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TodoList } from "../../components/todo-list";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TodoList />
  </StrictMode>
);
