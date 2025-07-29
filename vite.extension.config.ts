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
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        popup: resolve(extensionDir, "pages/popup.html"),
        sidepanel: resolve(extensionDir, "pages/sidepanel.html"),
        page: resolve(extensionDir, "pages/page.html"),
        background: resolve(extensionDir, "scripts/background.ts"),
        content: resolve(extensionDir, "scripts/content.ts"),
      },
      output: {
        entryFileNames: "scripts/[name].js",
        chunkFileNames: "scripts/[name]-[hash].js",
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
});
