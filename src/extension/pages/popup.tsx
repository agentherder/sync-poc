import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { log } from "../../shared/log";
import "../../shared/styles.css";
import { TodoList } from "../../shared/todo-list";
import { PageLink } from "../components/page-link";

log("extension popup loading");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <h1>Todo Sync - Popup</h1>
    <PageLink />
    <TodoList />
  </StrictMode>
);
