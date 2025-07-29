import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

const extensionDir = resolve(__dirname, "src/extension");

export default defineConfig({
  root: extensionDir,
  plugins: [react()],
  publicDir: "public",
  envDir: __dirname,
  build: {
    outDir: resolve(__dirname, "dist-extension"),
    emptyOutDir: false,
    sourcemap: true,
    rollupOptions: {
      input: {
        content: resolve(extensionDir, "scripts/content.ts"),
      },
      output: {
        format: "iife",
        entryFileNames: "scripts/content.js",
      },
    },
  },
});
