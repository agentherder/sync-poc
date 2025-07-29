import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  root: resolve(__dirname, "src/web"),
  plugins: [react()],
  publicDir: "public",
  envDir: __dirname,
  build: {
    outDir: resolve(__dirname, "dist-web"),
    emptyOutDir: true,
    sourcemap: true,
  },
});
