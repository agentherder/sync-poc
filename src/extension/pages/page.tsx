import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { log } from "../../shared/log";
import "../../shared/styles.css";
import { TodoList } from "../../shared/todo-list";
import { PageLink } from "../components/page-link";

log("extension page loading");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <h1>Todo Sync - Extension</h1>
    <PageLink />
    <TodoList />
  </StrictMode>
);
