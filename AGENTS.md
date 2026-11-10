<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## ShopBoard project rules

- Keep product API fetching and response validation in server-side modules outside `app/`.
- Keep Client Component boundaries limited to state, events, effects, and browser APIs.
- Use the shared UI primitives and semantic tokens; `app/globals.css` is the only project CSS file.
- Run `npm run lint`, `npm run typecheck`, and `npm run build` for feature work.
