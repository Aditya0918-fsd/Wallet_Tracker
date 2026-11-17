# Architecture

The repository is a pnpm workspace with three active packages: `apps/frontend` (React 19, TypeScript and Vite), `apps/backend` (NestJS on Fastify), and `packages/shared` (shared validation/types). The frontend keeps the existing Wallet Tracker interface and uses TanStack Router/Query, Zustand, Tailwind, Base UI, React Hook Form, Zod, Recharts and jsPDF. Active auth and wallet persistence use the REST API.

The API connects to MongoDB through Mongoose. Email/password credentials use Argon2id. Sessions use random opaque tokens in HTTP-only cookies; only SHA-256 token hashes are stored. Email verification and password recovery use single-use hashed action tokens delivered through configured SMTP. Google sign-in uses OpenID Connect state, nonce and PKCE; account linking is explicit and requires an authenticated session. CSRF uses a double-submit token and origin check on state-changing routes.

Wallet records are scoped to the session-derived user ID. The API exposes an authenticated wallet snapshot read/write for compatibility, a paged/filterable transaction read, and explicit owner-scoped deletion. Writes are upserts and do not delete records omitted by a stale snapshot. `packages/shared` holds shared contracts. MongoDB is required for a running backend; production must set `MONGODB_URI` and deployment-specific secrets.

Amounts follow the existing app's integer-hundredths model. Transactions can store their currency, but account totals and charts still use the account's default currency and there is no FX conversion. Do not interpret a mixed-currency total as a converted amount.

