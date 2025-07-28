export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export type TodoCommand =
  | { action: "create"; title: string }
  | { action: "update"; id: string; completed: boolean }
  | { action: "delete"; id: string };

export type TodoEvent =
  | { action: "init"; todos: Todo[] }
  | { action: "create"; todo: Todo }
  | { action: "update"; todo: Todo }
  | { action: "delete"; id: string };

export type TodoSyncEnvelope =
  | { todoSync: true; cmd: TodoCommand; evt?: never }
  | { todoSync: true; evt: TodoEvent; cmd?: never };

export function isTodoSyncEnvelope(x: unknown): x is TodoSyncEnvelope {
  return !!(
    x &&
    typeof x === "object" &&
    "todoSync" in x &&
    x.todoSync === true &&
    ("evt" in x || "cmd" in x)
  );
  // Skip deep check
}
