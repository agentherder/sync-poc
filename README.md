# Todo App

A simple todo app built with React and TypeScript.

## Repository Structure

```
./
├── src/
│   ├── web/                   # Web app source
│   │   ├── public/
│   │   ├── index.html
│   │   └── main.tsx
│   ├── extension/             # Extension source
│   │   ├── public/
│   │   │   └── manifest.json
│   │   ├── scripts/
│   │   ├── components/
│   │   ├── page.html
│   │   ├── popup.html
│   │   └── sidepanel.html
│   └── shared/                # Shared code and styles
├── tsconfig.json               # Root TS config
├── tsconfig.app.json             # Web app + extension TS config
├── tsconfig.node.json            # Vite TS config
├── vite.config.ts              # Web app build config
├── vite.extension.config.ts    # Extension modules build config
├── vite.content.config.ts      # Extension IIFE content script build config
├── dist/                      # Web app build output
└── dist-extension/            # Extension build output
```

## Command Cheatsheet

**Web App**

- `npm run dev` Web app hot module reloading dev server
- `npm run build` Build web app to `dist/`
- `npm run preview` Preview the web app build

**Extension**

- `npm run build:extension` Build extension to `dist-extension/`

**Both**

- `npm run lint` ESLint

## Tech Stack

- [Vite](https://vite.dev/guide/) Bundler
- [React](https://react.dev/) UI library
- [TypeScript](https://www.typescriptlang.org/docs/) Typechecking
- [Vercel](https://vercel.com/docs) Web app hosting
- [Chrome Extensions docs](https://developer.chrome.com/docs/extensions) Browser extension
- [idb](https://github.com/jakearchibald/idb) IndexedDB wrapper

## Planned PoC

This app is a proof-of-concept for the following features:

1. A Chrome-only web SPA with persistent offline state
2. A Chrome-only browser extension with persistent offline state
3. Sync state offline between extension and web SPA and across tabs
