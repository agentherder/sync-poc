import { useEffect, useState } from "react";
import { initDB } from "./db";
import { type TodoDoc } from "./todo-schema";

const db = await initDB();

export function useTodoState() {
  const [todos, setTodos] = useState<TodoDoc[]>([]);

  const collection = db.todos;

  useEffect(() => {
    const sub = collection
      .find()
      .$.subscribe((docs) => setTodos(docs.map((d) => d.toJSON())));
    return () => sub.unsubscribe();
  }, [collection]);

  return {
    todos,
    create: (title: string) => {
      collection.insert({
        id: crypto.randomUUID(),
        title,
        completed: false,
        updatedAt: new Date().toISOString(),
      });
    },
    update: (id: string, completed: boolean) => {
      collection.upsert({
        id,
        completed,
        updatedAt: new Date().toISOString(),
      });
    },
    delete: (id: string) => {
      collection.upsert({ id, _deleted: true });
    },
  };
}
