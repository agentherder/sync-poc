import { createStore } from "tinybase";

export const todoStore = createStore().setTables({
  todos: {},
});
