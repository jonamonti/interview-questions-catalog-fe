# Interview Questions Catalog: Frontend

React + TypeScript + Vite app for browsing the interview questions catalog.
It reads data from the [backend API](https://github.com/jonamonti/interview-questions-catalog-be).

## Prerequisites

- Node.js 22+
- npm
- The backend running locally (see below)

## Setup

```bash
cp .env.example .env
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## Environment variables

| Variable       | Default                 | Description                                     |
| -------------- | ----------------------- | ----------------------------------------------- |
| `VITE_API_URL` | `http://localhost:3000` | Base URL of the backend API (no trailing slash) |

Vite only exposes variables that start with `VITE_` to the browser, and they end
up in the public bundle. Never put secrets in them. The app only reads data, so
it does not need the API key. `.env` is git-ignored; `.env.example` is the
committed template.

## Running with the backend

The backend allows requests from `http://localhost:5173` by default (its
`CORS_ORIGINS` variable). If something else is already using port 5173, Vite
picks another port and the browser will block the API calls. Stop the other
process, or add the new origin to `CORS_ORIGINS` in the backend `.env`.

From the backend repo:

```bash
npm run db:up      # start Postgres
npm run dev        # start the API on port 3000
npm run db:seed    # optional: load dummy questions
```

## Scripts

| Command             | What it does                         |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Start the dev server with hot reload |
| `npm run build`     | Type-check and build to `dist/`      |
| `npm run preview`   | Serve the production build locally   |
| `npm run typecheck` | Type-check without emitting files    |
| `npm run lint`      | Lint with ESLint                     |
| `npm run format`    | Format with Prettier                 |

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs on every push to `main` and on
every pull request: `npx prettier --check .`, lint, typecheck and build. If any
step fails, the check on the pull request turns red. Run the same four commands
locally before pushing.

## Editor setup

The repo includes VS Code settings that format with Prettier and apply ESLint
fixes on save. Install the recommended extensions when VS Code offers them
(Prettier and ESLint).

## Project structure

```
src/
  main.tsx      entry point, mounts the router
  router.tsx    route table (React Router)
  App.tsx       app shell, renders the matching page
  config.ts     reads environment variables
  pages/        one component per route, each with its CSS Module
  components/   shared components, one folder each (component + CSS Module)
  styles/       global CSS: tokens.css (colours, fonts) and base.css (reset)
```

## Styling

Styling is plain CSS plus CSS Modules, following `docs/design-spec.md`.

- **`src/styles/tokens.css`:** the design tokens as CSS custom properties. Dark
  is the default; the light values apply under `:root[data-theme="light"]`.
  Components use `var(--...)`, never hex values.
- **`src/styles/base.css`:** the reset, body styles, the global focus ring,
  themed selection and caret, and the `prefers-reduced-motion` rule.
- **`*.module.css`:** styles for one component, next to its `.tsx`. Class names
  are scoped to the component.
