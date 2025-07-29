import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  root: resolve(__dirname, "src/web"),
  plugins: [
    react(),
    VitePWA({
      strategies: "injectManifest",
      srcDir: ".",
      filename: "sw.ts",
      registerType: "autoUpdate",
      pwaAssets: {
        preset: "minimal-2023",
        image: "public/vite.svg",
        overrideManifestIcons: true,
      },
      manifest: {
        name: "Todo Sync PoC",
        short_name: "TodoSync",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
      },
      includeAssets: ["/vite.svg"],
      devOptions: {
        enabled: true, // let SW run during `vite dev`
        type: "module",
      },
    }),
  ],
  publicDir: "public",
  envDir: __dirname,
  build: {
    outDir: resolve(__dirname, "dist-web"),
    emptyOutDir: true,
    sourcemap: true,
  },
});
