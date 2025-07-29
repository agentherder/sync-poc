import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../../shared/styles.css";
import { TodoList } from "../../shared/todo-list";
import { PageLink } from "../components/page-link";
import { log } from "../../shared/log";

log("extension sidepanel loading");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <h1>Todo Sync - Side Panel</h1>
    <PageLink />
    <TodoList />
  </StrictMode>
);
