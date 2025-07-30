import { WorkerClient } from "@triplit/client/worker-client";
import { schema } from "./schema";
import workerUrl from "@triplit/client/worker-client-operator?url";

export const triplit = new WorkerClient({
  workerUrl,
  storage: "indexeddb",
  schema,
  serverUrl: import.meta.env.VITE_TRIPLIT_SERVER_URL,
  token: import.meta.env.VITE_TRIPLIT_TOKEN,
});
