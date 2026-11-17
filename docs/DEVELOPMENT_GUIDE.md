# Development

## Requirements

- Node.js 22 or later
- pnpm (used to install the workspace dependencies)
- A reachable MongoDB server, local or hosted

MongoDB Compass is a GUI client and does not start the MongoDB server. Set `MONGODB_URI` in the project root `.env` to the server connection string. Copy `.env.example` only if `.env` does not already exist. Keep secrets out of source control.

## Start the application

From the project root:

```powershell
pnpm install
npm run dev
```

The combined development command starts the NestJS API and Vite frontend. Visit `http://localhost:5173`; the API is at `http://localhost:3001/api`. Press Ctrl+C to stop both processes.

Email verification/recovery requires SMTP configuration. Google sign-in requires Google OAuth credentials. These integrations are optional for starting the local servers.

## Build and quality commands

- `pnpm build`
- `pnpm typecheck`
- `pnpm test`
- `pnpm lint`
