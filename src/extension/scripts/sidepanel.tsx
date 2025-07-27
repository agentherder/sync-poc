import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TodoList } from "../../shared/todo-list";
import { PageLink } from "../components/page-link";

console.log("[TodoSync] extension sidepanel loading on", location?.href);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <h1>Todo Sync - Side Panel</h1>
    <PageLink />
    <TodoList />
  </StrictMode>
);
