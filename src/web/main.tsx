import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { log } from "../shared/log";
import "../shared/styles.css";
import { TodoList } from "../shared/todo-list";

log("web app loading");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <h1>Todo Sync - Web</h1>
    <TodoList />
  </StrictMode>
);
