# ShopBoard UI rules

ShopBoard uses Next.js App Router. `app/` contains routes and route boundaries; `lib/` owns server API validation; interactive cart, checkout, and Modal leaves live in `components/`. Set server-only `API_URL` to the product API base (including `/api`) for local development and deployments. Use `npm run lint`, `npm run typecheck`, and `npm run build` before handoff. Browser checks must be reported separately from source/build checks.

- Use semantic Tailwind tokens from `app/globals.css`; add a token before adding a new visual value.
- Combine conditional Tailwind classes with `cn()` and use `cva` for shared variants.
- Keep shared controls in `components/ui/`, presentational, typed, and independent of product or API logic.
- Prefer native HTML semantics, including native controls and `<dialog>` where appropriate.
- Preserve visible focus, semantic headings, labels, and keyboard support; test assistive and keyboard paths when a browser is available.
- Keep Client Component boundaries narrow: use them only for state, effects, events, or browser APIs. Keep pages and data fetching on the server.
- Review reusable UI primitives for lifecycle, responsive behavior, and accessibility before integrating them into routes.

Never change *.test.ts, *.test.tsx, or tests in e2e/ merely to make a failing test pass. Fix the implementation, or ask me if the expected behavior is unclear.
