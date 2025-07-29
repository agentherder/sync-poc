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
      manifest: {
        name: "Todo Sync PoC",
        short_name: "TodoSync",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
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
