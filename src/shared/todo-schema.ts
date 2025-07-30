import {
  type ExtractDocumentTypeFromTypedRxJsonSchema,
  type RxCollection,
  type RxJsonSchema,
  toTypedRxJsonSchema,
} from "rxdb";

// https://rxdb.info/tutorials/typescript.html

const todoSchemaLiteral = {
  title: "todo",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: { type: "string", maxLength: 128 },
    title: { type: "string" },
    completed: { type: "boolean", default: false },
    updatedAt: { type: "string", format: "date-time" },
    _deleted: { type: "boolean", default: false },
  },
  required: ["id", "title", "updatedAt"],
} as const;

const _todoSchema = toTypedRxJsonSchema(todoSchemaLiteral);

export type TodoDoc = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof _todoSchema
>;

export const todoSchema = _todoSchema as RxJsonSchema<TodoDoc>;

export type TodoCollection = RxCollection<TodoDoc>;
