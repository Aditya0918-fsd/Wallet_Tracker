# Migration guide

## Preserve source data

The original browser stored wallet data in localStorage. Export its JSON from the old app before switching users or browsers. The rebuilt Settings importer merges records by ID and skips duplicates; after import, sign into the intended account and keep the original export and browser profile until record counts and balances have been reconciled. The frontend syncs authenticated changes to the API.

Existing accounts are not silently transferred: no prior password hash is available to reuse. Register/verify a new account and import a wallet export. Google accounts are never joined by matching email alone.

## Rollback

The pre-rebuild copy is stored as `Wallet Tracker.pre-rebuild-backup` next to the project. Keep it and source exports until the new database and imported data have been checked. To roll back, stop the rebuilt app and reopen the preserved original project; do not delete the original browser data as part of migration.

