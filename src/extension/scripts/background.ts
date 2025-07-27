import { openDB, type DBSchema } from "idb";
import type { ClientRequest, Todo, TodoChange } from "../../shared/types";

console.log(
  "[TodoSync] extension background service worker loading on",
  location?.href
);

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

dbPromise.then((db) => console.log("[TodoSync] extensionDB ready", db));

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
  getAllTodos().then((todos) =>
    port.postMessage({ type: "init", todos } as TodoChange)
  );

  port.onMessage.addListener(async (msg: ClientRequest) => {
    console.log(
      "[TodoSync] extension background service worker received message",
      msg
    );
    switch (msg.type) {
      case "create": {
        const todo = await addTodo(msg.title);
        broadcast({ type: "create", todo });
        break;
      }
      case "update": {
        const todo = await updateTodo(msg.id, msg.completed);
        if (todo) broadcast({ type: "update", todo });
        break;
      }
      case "delete": {
        await deleteTodo(msg.id);
        broadcast({ type: "delete", id: msg.id });
        break;
      }
    }
  });

  port.onDisconnect.addListener(() => ports.delete(port));
});

function broadcast(change: TodoChange) {
  for (const p of ports) p.postMessage(change);
}
