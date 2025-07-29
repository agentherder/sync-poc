# Todo Sync PoC

A basic todo component that renders in a web app and browser extension.

No sync between any components, tabs, web or extension.
This serves as a barebones foundation for exploring sync solutions.

## Planned PoC

Try a proof-of-concept for the core features:

1. A Chrome-only web SPA with persistent offline state
2. A Chrome-only browser extension with persistent offline state
3. Sync state offline between extension and web SPA and across tabs

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
│   └── shared/                # Shared source
│       ├── todo-list.tsx        # UI only component
│       ├── todo-state.tsx       # Ephemeral `React.useState` hook
│       └── styles.css           # Basic styles
├── tsconfig.json               # Root TS config
├── tsconfig.app.json             # Web + extension + TS config
├── tsconfig.node.json            # Vite TS config
├── vite.config.ts              # Web app build config
├── vite.extension.config.ts    # Extension build config
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
- `npm run watch:extension` Watch and build extension on change

**Both**

- `npm run lint` ESLint

## Tech Stack

- [Vite](https://vite.dev/guide/) Bundler
- [React](https://react.dev/) UI library
- [TypeScript](https://www.typescriptlang.org/docs/) Typechecking
- [Chrome Extensions docs](https://developer.chrome.com/docs/extensions) Browser extension
