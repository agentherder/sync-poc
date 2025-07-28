import { useEffect, useRef, useState } from "react";
import {
  isTodoSyncEnvelope,
  type Todo,
  type TodoCommand,
  type TodoEvent,
} from "./types";

const connect = chrome?.runtime?.connect as
  | typeof chrome.runtime.connect
  | undefined;

export function useTodoSync() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const portRef = useRef<chrome.runtime.Port>(null);

  useEffect(() => {
    function onEvent(evt: TodoEvent) {
      switch (evt.action) {
        case "init":
          setTodos(evt.todos);
          break;
        case "create":
          setTodos((prev) => [...prev, evt.todo]);
          break;
        case "update":
          setTodos((prev) =>
            prev.map((t) => (t.id === evt.todo.id ? evt.todo : t))
          );
          break;
        case "delete":
          setTodos((prev) => prev.filter((t) => t.id !== evt.id));
          break;
      }
    }
    if (connect) {
      const port = connect({ name: "todos" });
      port.onMessage.addListener((msg: unknown) => {
        if (!isTodoSyncEnvelope(msg)) return;
        if (!msg.evt) return;
        onEvent(msg.evt);
      });
      portRef.current = port;
      return () => port.disconnect();
    } else {
      const listener = (e: MessageEvent) => {
        if (e.source !== window) return;
        if (!isTodoSyncEnvelope(e.data) || !e.data.evt) return;
        onEvent(e.data.evt);
      };
      window.addEventListener("message", listener);
      return () => window.removeEventListener("message", listener);
    }
  }, []);

  function sendCmd(cmd: TodoCommand) {
    if (portRef.current) {
      portRef.current.postMessage({ todoSync: true, cmd });
    } else {
      window.postMessage({ todoSync: true, cmd }, "*");
    }
  }

  return {
    todos,
    create: (title: string) => sendCmd({ action: "create", title }),
    update: (id: string, completed: boolean) =>
      sendCmd({ action: "update", id, completed }),
    remove: (id: string) => sendCmd({ action: "delete", id }),
  };
}
