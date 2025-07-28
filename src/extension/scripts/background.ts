import { openDB, type DBSchema } from "idb";
import { log } from "../../shared/log";
import {
  isTodoSyncEnvelope,
  type Todo,
  type TodoEvent,
  type TodoSyncEnvelope,
} from "../../shared/types";

log("extension background service worker loading");

interface TodoDB extends DBSchema {
  todos: {
    key: string;
    value: Todo;
    indexes: { "by-completed": 0 | 1 };
  };
}

const dbPromise = openDB<TodoDB>("todo-sync", 1, {
  upgrade(db) {
    const store = db.createObjectStore("todos", { keyPath: "id" });
    store.createIndex("by-completed", "completed");
  },
});

dbPromise.then((db) => log("extensionDB ready", db));

export async function getAllTodos() {
  return (await dbPromise).getAll("todos");
}

export async function addTodo(title: string) {
  const todo: Todo = { id: crypto.randomUUID(), title, completed: false };
  await (await dbPromise).put("todos", todo);
  return todo;
}

export async function updateTodo(id: string, completed: boolean) {
  const db = await dbPromise;
  const todo = await db.get("todos", id);
  if (!todo) return;
  todo.completed = completed;
  await db.put("todos", todo);
  return todo;
}

export async function deleteTodo(id: string) {
  await (await dbPromise).delete("todos", id);
}

const ports = new Set<chrome.runtime.Port>();

chrome.runtime.onConnect.addListener((port) => {
  if (port.name !== "todos") return;
  ports.add(port);

  // send initial snapshot
  getAllTodos().then((todos) => {
    const msg: TodoSyncEnvelope = {
      todoSync: true,
      evt: { action: "init", todos },
    };
    port.postMessage(msg);
  });

  port.onMessage.addListener(async (msg: unknown) => {
    if (!isTodoSyncEnvelope(msg) || !msg.cmd) return;
    log("extension background service worker received message", msg);
    const { cmd } = msg;
    switch (cmd.action) {
      case "create": {
        const todo = await addTodo(cmd.title);
        broadcast({ action: "create", todo });
        break;
      }
      case "update": {
        const todo = await updateTodo(cmd.id, cmd.completed);
        if (!todo) break;
        broadcast({ action: "update", todo });
        break;
      }
      case "delete": {
        await deleteTodo(cmd.id);
        broadcast({ action: "delete", id: cmd.id });
        break;
      }
    }
  });

  port.onDisconnect.addListener(() => ports.delete(port));
});

function broadcast(evt: TodoEvent) {
  const msg: TodoSyncEnvelope = { todoSync: true, evt };
  for (const p of ports) p.postMessage(msg);
}
