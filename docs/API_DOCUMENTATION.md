# API reference

Base URL: `http://localhost:3001/api`. Browser requests use JSON, `credentials: include`, and the `/auth/csrf` token on state-changing calls. Private endpoints require the `wallet_session` cookie. Errors use NestJS JSON error responses.

- `GET /health` — readiness check; returns 200 only while MongoDB is connected, otherwise 503.

## Authentication

- `GET /auth/csrf` — issues/returns a CSRF token and cookie.
- `POST /auth/register` — `{ name, email, password }`; creates an unverified account and sends verification email.
- `POST /auth/login` — `{ email, password }`; requires verified email and creates a session.
- `POST /auth/logout` — revokes current session.
- `GET /auth/me` — safe user profile and booleans for configured sign-in methods.
- `POST /auth/verify-email` — `{ token }`; verifies email and establishes a session.
- `POST /auth/resend-verification` — `{ email }`; generic response to prevent account enumeration.
- `POST /auth/forgot-password` — `{ email }`; generic response.
- `POST /auth/reset-password` — `{ token, password }`; consumes reset token and revokes existing sessions.
- `POST /auth/change-password` — `{ currentPassword, newPassword }`; authenticated password change.
- `POST /auth/set-password` — `{ password }`; authenticated Google-only account password setup.
- `GET /auth/sessions`, `DELETE /auth/sessions/:id` — list and revoke sessions belonging to the current account.
- `GET /auth/google` — starts Google OIDC sign-in.
- `GET /auth/google/link` — authenticated explicit Google account linking.
- `GET /auth/google/callback` — OIDC callback; redirects to frontend.

Email/password requests require passwords between 10 and 128 characters. Google and email flows require environment credentials; see `.env.example`.

## Wallet data

- `GET /wallet` — returns version 1 wallet snapshot for the authenticated user.
- `PUT /wallet` — upserts supplied snapshot records and profile/settings. It does not delete omitted records, so an old client cannot erase records from another device. Version must be 1; each list row needs an ID.
- `GET /wallet/transactions?limit=&cursor=&type=&categoryId=&from=&to=&search=` — owner-scoped transaction page (maximum 100 rows) with optional filters.
- `POST /wallet/delete` — `{ kind, id }`; explicitly removes a record of a supported list kind belonging to the authenticated account. Settings/profile cannot be deleted this way.

The transaction read endpoint is paged; the compatibility snapshot currently loads the user's complete wallet. Strict per-field domain validation and separate CRUD endpoints are still future work. Amounts use integer hundredths; mixed currencies are not converted for aggregate totals.
