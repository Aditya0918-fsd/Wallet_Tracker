# Wallet Tracker

Wallet Tracker is a pnpm workspace with a React frontend, a NestJS/Fastify REST API, shared TypeScript contracts, and MongoDB persistence through Mongoose.

## Technology

- Frontend: React 19, TypeScript, Vite, TanStack Start/Router/Query, Tailwind CSS, Base UI, React Hook Form, Zod, Recharts, and jsPDF.
- Backend: NestJS, Fastify, REST, and Mongoose.
- Database: MongoDB.
- Authentication: Argon2id passwords, HTTP-only sessions, Google OIDC, and optional email verification/recovery through SMTP.

## Run locally

1. Install Node.js 22 or later and pnpm.
2. Copy `.env.example` to `.env` if you do not already have a local `.env` file.
3. Set `MONGODB_URI` to your MongoDB connection string. MongoDB Compass is a database viewer; MongoDB itself must also be running locally or hosted remotely.
4. From the project root, run `pnpm install` once to install dependencies.
5. Start the frontend and API together with `npm run dev`.
6. Open `http://localhost:5173`. Press Ctrl+C in the terminal to stop both apps.

Email verification and password recovery require SMTP settings. Google sign-in requires Google OAuth credentials. These are optional for starting the development servers.

## Other commands

- `pnpm build` builds the shared package, backend, and frontend.
- `pnpm typecheck` checks the workspace TypeScript projects.
- `pnpm test` runs the frontend and backend test suites.
- `pnpm lint` checks frontend and backend lint rules.

Keep `.env` private and do not commit credentials.
