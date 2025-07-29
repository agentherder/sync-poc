import { clientsClaim } from "workbox-core";
import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import {
  CacheFirst,
  NetworkFirst,
  StaleWhileRevalidate,
} from "workbox-strategies";

declare const self: ServiceWorkerGlobalScope;

self.skipWaiting();
clientsClaim();

// Pre‑cache the static assets that Vite tells Workbox about
cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);

// Offline SPA navigation
registerRoute(
  ({ request }) => request.mode === "navigate",
  new NetworkFirst({ cacheName: "pages", networkTimeoutSeconds: 3 })
);

// Hot CSS/JS/wasm
registerRoute(
  ({ request }) => ["style", "script", "worker"].includes(request.destination),
  new StaleWhileRevalidate({ cacheName: "assets" })
);

// Images and icons
registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({ cacheName: "images", matchOptions: { ignoreSearch: true } })
);
