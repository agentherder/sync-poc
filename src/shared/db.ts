import { addRxPlugin, createRxDatabase } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { todoSchema } from "./todo-schema";

export async function initDB() {
  if (import.meta.env.DEV) {
    const module = await import("rxdb/plugins/dev-mode");
    addRxPlugin(module.RxDBDevModePlugin);
  }
  const db = await createRxDatabase({
    name: "todos",
    storage: getRxStorageDexie(),
    multiInstance: false,
    eventReduce: true,
  });
  await db.addCollections({ todos: { schema: todoSchema } });
  return db;
}
