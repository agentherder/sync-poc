import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider as TinyBaseProvider } from "tinybase/ui-react";
import { registerSW } from "virtual:pwa-register";
import { log } from "../shared/log";
import "../shared/styles.css";
import { TodoList } from "../shared/todo-list";
import { todoStore } from "../shared/todo-store";

log("web app loading");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TinyBaseProvider store={todoStore}>
      <h1>Todo Sync - Web</h1>
      <TodoList />
    </TinyBaseProvider>
  </StrictMode>
);

registerSW({ immediate: true });
