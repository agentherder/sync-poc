# Todo Sync PoC

A basic todo component that renders in a web app and browser extension.

No sync between any: components, tabs, web, extension.
This serves as a barebones foundation for exploring sync solutions.

## Planned PoC

Try a proof-of-concept for the core features:

1. A Chrome-only web SPA with persistent offline state
2. A Chrome-only browser extension with persistent offline state
3. Sync state offline between extension and web SPA and across tabs

## Current Tech Stack

- Bundler: [Vite](https://vite.dev/guide/)
- UI: [React](https://react.dev/)
- Types: [TypeScript](https://www.typescriptlang.org/docs/)
- Web app: Slightly reorganized [Vite + React + TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts)
- PWA: [Vite PWA plugin](https://vite-plugin-pwa.netlify.app/) using [inject manifest](https://vite-pwa-org.netlify.app/guide/inject-manifest.html) strategy
- Chrome extension: Custom Vite config based on [Chrome Extensions docs](https://developer.chrome.com/docs/extensions)

## Repository Structure

```
./
├── src/
│   ├── web/                   # Web app source
│   │   ├── public/
│   │   ├── index.html
│   │   ├── main.tsx
│   │   └── sw.ts                # PWA service worker
│   │
│   ├── extension/             # Chome extension source
│   │   ├── public/
│   │   │   └── manifest.json
│   │   ├── components/
│   │   │   └── page-link.tsx
│   │   ├── pages/
│   │   │   ├── popup.html
│   │   │   ├── popup.tsx
│   │   │   ├── sidepanel.html
│   │   │   ├── sidepanel.tsx
│   │   │   ├── page.html
│   │   │   └── page.tsx
│   │   └── scripts/
│   │       ├── background.ts
│   │       └── content.ts
│   │
│   └── shared/                # Shared source
│       ├── todo-list.tsx        # UI only component
│       ├── todo-state.tsx       # Ephemeral `React.useState` hook
│       ├── log.ts               # Console logging + info util
│       └── styles.css           # Basic styles
│
├── .env                       # Local env vars (git ignored)
├── .env.example               # Local env vars example
│
├── tsconfig.json               # Root TS config
├── tsconfig.app.json             # Web + extension + shared TS config
├── tsconfig.node.json            # Vite TS config
│
├── vite.web.config.ts          # Web build config
├── vite.extension.config.ts    # Extension primary build config
├── vite.content.config.ts      # Extension content IIFE build config
│
├── dist-web/                  # Web build output
└── dist-extension/            # Extension build output
```

## Command Cheatsheet

- `npm run build` Build web + extension
- `npm run typecheck` Typecheck web + extension + shared
- `npm run lint` ESLint web + extension + shared

**Web App**

- `npm run dev:web` Web app hot module reloading dev server
- `npm run build:web` Build web app to `dist-web/`
- `npm run preview:web` Preview the web app build

**Extension**

- `npm run build:extension` Build extension to `dist-extension/`
