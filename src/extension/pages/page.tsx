import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider as TinyBaseProvider } from "tinybase/ui-react";
import { log } from "../../shared/log";
import "../../shared/styles.css";
import { TodoList } from "../../shared/todo-list";
import { todoStore } from "../../shared/todo-store";
import { PageLink } from "../components/page-link";

log("extension page loading");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TinyBaseProvider store={todoStore}>
      <h1>Todo Sync - Extension</h1>
      <PageLink />
      <TodoList />
    </TinyBaseProvider>
  </StrictMode>
);
