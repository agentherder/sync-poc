export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export type TodoChange =
  | { type: "init"; todos: Todo[] }
  | { type: "create"; todo: Todo }
  | { type: "update"; todo: Todo }
  | { type: "delete"; id: string };

export type ClientRequest =
  | { type: "create"; title: string }
  | { type: "update"; id: string; completed: boolean }
  | { type: "delete"; id: string };
