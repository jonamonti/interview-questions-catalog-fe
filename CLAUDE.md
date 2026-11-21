# Interview Questions Catalog: Frontend

React + TypeScript + Vite single-page app. It reads from the backend API
(separate repo, `interview-questions-catalog-be`). Linear team:
Interview-questions-catalog (tickets `INT-xx`).

`docs/design-spec.md` is the source of truth for layout, colour tokens,
typography, components, states and motion. Read it before helping with any UI
work, and say so if the spec and the code disagree.

## How we work (important)

I am building this project to learn, so **I write all the code myself**.

- Do not create or edit files in this repo, and do not write full
  implementations, even if I ask vaguely. Ask first if you are unsure.
- Do: explain concepts, break tickets into small ordered steps, give hints,
  point to docs, review my diffs when I ask, and answer questions.
- Short snippets that illustrate one concept are fine. Whole components, files
  or stylesheets are not.
- Wait for me to say a step is done before moving on. I commit one step at a time.

## Commands

- `npm run dev`: dev server (port 5173; the backend allows this origin by default)
- `npm run lint`, `npx prettier --check .`, `npm run typecheck`, `npm run build`: the checks CI runs
- `npm run format`: Prettier

## Conventions

- Arrow functions and modern TypeScript. Prettier decides the formatting.
- Component files are PascalCase (`HomePage.tsx`).
- Branch per ticket from an up-to-date `main`; PRs say `Closes INT-xx` only
  when the ticket is fully done, otherwise `Part of INT-xx`.
- Every environment variable the code reads goes in `.env.example`. `VITE_`
  variables end up in the public bundle, so never put secrets in them.
- Do not commit `.env`.
