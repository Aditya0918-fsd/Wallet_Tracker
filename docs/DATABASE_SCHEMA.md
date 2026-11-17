# MongoDB schema

Mongoose creates these collections and indexes (auto-indexing is currently enabled):

- `users`: normalized unique email, name, optional Argon2id password hash (excluded from default selection), email verification state, profile fields.
- `sessions`: user ID, unique SHA-256 session-token hash, expiry with TTL index, user agent.
- `authaccounts`: provider and provider subject with a unique compound index, linked user ID.
- `emailactions`: user ID, purpose, unique hashed one-time token and expiry with TTL index.
- Wallet record collections: transactions, categories, tasks, budgets, recurring transactions, notifications, settings and profile. Each record has owner ID, stable record ID and JSON payload. Owner/record ID is unique; owner indexes support scoped queries.

Every private read, update and delete is constrained by the authenticated session's user ID. Never use an owner ID from a client request as authorization. The legacy integer-hundredths amount representation and transaction-level currency coexist; no foreign-exchange rates or converted account totals are stored.
