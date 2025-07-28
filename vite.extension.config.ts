import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";

const root = resolve(__dirname, "src/extension");

export default defineConfig({
  root,
  plugins: [react()],
  publicDir: "public",
  build: {
    outDir: resolve(__dirname, "dist-extension"),
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        popup: resolve(root, "popup.html"),
        sidepanel: resolve(root, "sidepanel.html"),
        page: resolve(root, "page.html"),
        background: resolve(root, "scripts/background.ts"),
      },
      output: {
        entryFileNames: "scripts/[name].js",
        chunkFileNames: "scripts/[name]-[hash].js",
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
});
