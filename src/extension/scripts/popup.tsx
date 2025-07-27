import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TodoList } from "../../shared/todo-list";
import { PageLink } from "../components/page-link";

console.log("[TodoSync] extension popup loading on", location?.href);

console.log(chrome?.runtime.getURL("page.html"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <h1>Todo Sync - Popup</h1>
    <PageLink />
    <TodoList />
  </StrictMode>
);
