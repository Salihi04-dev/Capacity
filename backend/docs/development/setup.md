# Development Setup

1. Install Node.js 22 LTS and PostgreSQL with PostGIS.
2. Copy `.env.example` to `.env` and set `DATABASE_URL`.
3. Run `npm install`.
4. Run `npx prisma generate`.
5. Review and apply migrations with `npx prisma migrate dev`.
6. Run `npm run start:dev`.

The initial migration enables PostGIS, creates the foundation tables and protects audit rows against update/delete. Ledger immutability must be added with the future ledger schema migration. Do not assume this foundation migration is a complete production hardening migration.

## Verification checklist

- `npm run build`
- `npm test`
- `npm run lint`
- `npm run format:check`
- `npx prisma validate`
- `npx prisma migrate deploy` against a disposable PostgreSQL database with PostGIS
- Verify `/api/v1/health/live`, `/api/v1/health/ready` and `/api/docs`

Record actual output. Never report unexecuted checks as passing.
