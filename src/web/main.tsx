import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../shared/styles.css";
import { TodoList } from "../shared/todo-list";

console.log("[TodoSync] web app loading on", location?.href);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <h1>Todo Sync - Web</h1>
    <TodoList />
  </StrictMode>
);
