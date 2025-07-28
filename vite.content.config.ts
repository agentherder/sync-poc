import { resolve } from "node:path";
import { defineConfig } from "vite";

const root = resolve(__dirname, "src/extension");

export default defineConfig({
  root,
  publicDir: "public",
  build: {
    outDir: resolve(__dirname, "dist-extension"),
    emptyOutDir: false,
    sourcemap: true,
    rollupOptions: {
      input: {
        content: resolve(root, "scripts/content.ts"),
      },
      output: {
        format: "iife",
        entryFileNames: "scripts/content.js",
      },
    },
  },
});
