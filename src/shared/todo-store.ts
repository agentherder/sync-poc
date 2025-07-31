import { createStore } from "tinybase";
import { createLocalPersister } from "tinybase/persisters/persister-browser";

export const todoStore = createStore().setTablesSchema({
  todos: {
    title: { type: "string" },
    completed: { type: "boolean", default: false },
  },
});

createLocalPersister(todoStore, "todo-poc-store").startAutoPersisting();
