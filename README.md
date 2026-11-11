# ShopBoard Next

ShopBoard is a Next.js App Router storefront. Product data is fetched and validated on the server; cart and checkout interactions are small Client Component leaves.

## Live Demo

[https://shopboard-next-beta.vercel.app/](https://shopboard-next-beta.vercel.app/)

## Commands

- `npm run dev` — development server.
- `npm run lint` — ESLint.
- `npm run typecheck` — generates Next route types, then runs TypeScript.
- `npm run build` — production build.
- `npm run start` — serves a completed production build.

## Testing

- `npm test` runs the Vitest cart and component tests.
- `npm run test:e2e` installs Chromium when needed, starts the local app, and runs the Playwright checkout flow.

Use `npm test` for fast unit/component feedback. Run `npm run test:e2e` for the browser checkout journey; it uses isolated storage and a deterministic local fixture served to the application's server-side product fetches.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Home hero |
| `/products` | Server-fetched catalog with search and category filtering |
| `/products/[id]` | Server-fetched product detail and 404 handling |
| `/cart` | Persistent saved cart, quantities, removal, and totals |
| `/checkout` | Local-only demo checkout; no payment or order request |

`app/products/loading.tsx`, `app/products/error.tsx`, and `app/not-found.tsx` handle catalog loading, retryable failures, and unknown URLs/products.

## Architecture

- `lib/api.ts` is the single API client; `lib/products.ts` owns response validation and product types.
- `components/cart-provider.tsx` owns persistent `{ id, qty }` state. It reads local storage only after hydration and does not persist the initial empty server state.
- `components/cart/` and `components/checkout/` contain interactive feature modules. `components/ui/` contains typed, product-independent primitives.
- `app/globals.css` is the only project CSS file and defines semantic color, radius, and font tokens for system light/dark mode.

## API configuration

Copy `.env.example` to `.env.local` and set `API_URL` to the server-side product API base, for example `https://shopboard-api.vercel.app/api`. Never commit real local environment files or expose server configuration with a `NEXT_PUBLIC_` prefix.

## Verification limits

The user manually verified normal API rendering, delayed loading, failure/recovery, search/clear, responsive layouts, dark appearance, and basic Modal interactions. Browser checks for the restored cart and checkout paths remain manual.
