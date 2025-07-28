import { Schema as S } from "@triplit/client";

export const schema = S.Collections({
  todos: {
    schema: S.Schema({
      id: S.Id(),
      title: S.String(),
      completed: S.Boolean({ default: false }),
      createdAt: S.Date({ default: S.Default.now() }),
      updatedAt: S.Date({ default: S.Default.now() }),
    }),
  },
});
