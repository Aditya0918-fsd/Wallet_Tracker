# Authentication

Email registration creates an unverified account and emails a single-use verification link. Sign-in is enabled after verification. Passwords are hashed with Argon2id. Login issues a random 32-byte opaque token in an HTTP-only, SameSite=Lax cookie; only its SHA-256 hash is saved in MongoDB. Sessions expire after 14 days and can be revoked from settings. Password reset/change revokes other sessions.

Google uses OpenID Connect authorization code flow with state, nonce and PKCE. Google accounts are linked explicitly while signed in; matching email addresses alone never link accounts. CSRF protection uses a cookie/header double-submit token plus an allowed-origin check for state-changing requests. Helmet, a global Fastify rate limit, CORS allowlisting and Nest DTO validation are enabled.

## Configuration required

Copy `.env.example` to `.env`. Set a strong `COOKIE_SECRET`, a reachable `MONGODB_URI`, and exact comma-separated frontend origins. Email actions require SMTP settings. Google login/link requires Google OAuth client ID/secret and an exact registered callback URL. Configure HTTPS in production so secure cookies are enabled. These integrations are implemented but require real provider credentials and a running MongoDB deployment to exercise end to end.
