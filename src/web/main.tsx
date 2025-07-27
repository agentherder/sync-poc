import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TodoList } from "../shared/todo-list";
import "../styles.css";

console.log("[TodoSync] web app loading on", location?.href);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <h1>Todo Sync - Web</h1>
    <TodoList />
  </StrictMode>
);
