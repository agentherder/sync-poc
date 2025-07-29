const DEBUG = import.meta.env.VITE_DEBUG;

export function log(msg: string, ...data: unknown[]) {
  if (!DEBUG) return;
  console.log(
    `[TodoSync] ${msg} | ${self?.constructor.name} | ${location?.href}`,
    ...data
  );
}
