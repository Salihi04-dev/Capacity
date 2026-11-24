# CAPACITY API

Greenfield backend foundation for CAPACITY — The Invisible Infrastructure Exchange. This repository is private by requirement because the source requirements are confidential.

## Status

Foundation scaffold only. No complete identity, listing, booking, payment, escrow, ledger, dispute or admin workflows are implemented. The 14 module boundaries exist; Storage is separately bounded and returns a disabled response. Product decisions and the v0.3 baseline remain provisional pending formal sign-off.

## Requirements inputs

`docs/requirements/source/CAPACITY_Engineering_Brief_v3.md` is preserved unchanged. The brief references Specification v0.3, SRS v0.2 and `OpenAPI-Capacity-draft.json`; those source artifacts were not included in the supplied files and are listed as missing in `docs/assessment/repository-assessment.md`. They must be added unchanged before a complete requirements extraction/contract review can be claimed.

## Local setup

- Node.js 22 LTS
- PostgreSQL with PostGIS available
- npm

```bash
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate deploy
npm run start:dev
```

No Docker dependency is required. Set `DATABASE_URL` to a local PostgreSQL database. The app exposes liveness at `/api/v1/health/live`, readiness at `/api/v1/health/ready`, and Swagger UI at `/api/docs`.

## Commands

```bash
npm run build
npm test
npm run lint
npm run format:check
npm run prisma:generate
npm run prisma:migrate:dev
```

## Important engineering constraints

- PostgreSQL is the source of truth. Redis, if introduced later, is not authoritative for bookings or financial records.
- Runtime business settings belong in the database, versioned and audited. Environment variables are infrastructure-only.
- Provider integrations are ports. No provider is selected. Fake adapters must never run in production.
- Money is integer minor units (kobo), never floating point. 
- Storage remains disabled for the pilot and is enforced server-side.
- Generated OpenAPI describes implementation; it is not an approved product contract until human review is recorded.
- Do not push, merge or publish this private repository without owner direction.
