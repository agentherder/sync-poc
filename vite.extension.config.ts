import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// https://vite.dev/config/
export default defineConfig({
  root: resolve(__dirname, "src", "extension"),
  plugins: [react()],
  publicDir: ".",
  build: {
    outDir: resolve(__dirname, "dist-extension"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "src", "extension", "pages", "popup.html"),
      },
      output: {
        entryFileNames: "scripts/[name].js",
        chunkFileNames: "scripts/[name]-[hash].js",
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
});
