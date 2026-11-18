# Repository Assessment — Greenfield

**Date:** 16 November 2026  
**Baseline:** CAPACITY Engineering Brief v3  
**Repository state:** No existing application or source repository was supplied. This is a greenfield implementation; no legacy code, package manager lockfile or deployment configuration could be assessed.

## Source material inspected

- `CAPACITY_Engineering_Brief_v3.md` (80,447 bytes, 771 lines): available and preserved unchanged.
- CAPACITY Specification v0.3 PDF: referenced by the brief but not supplied.
- CAPACITY System Analysis and Requirements Specification v0.2 PDF: referenced by the brief but not supplied.
- `OpenAPI-Capacity-draft.json`: referenced by the brief but not supplied.

The missing documents are not reconstructed from memory. The implementation follows only the explicit v3 engineering brief and records the source gap for follow-up.

## Initial technical assessment

- Approved stack: Node.js 22, strict TypeScript, NestJS, PostgreSQL, Prisma, PostGIS, REST/OpenAPI, GitHub Actions.
- Architecture: one modular monolith, one primary database, 14 named module boundaries.
- Storage: distinct domain boundary; disabled for the pilot and blocked server-side.
- Settings: Administration-owned, database-backed, versioned, status-aware and audited.
- Permissions: provisional data-driven RBAC foundation; acting-role must be validated against authenticated server-side assignments.
- Audit and ledger immutability require database-level enforcement, not application conventions alone.
- No payment, messaging, mapping, identity-verification or private-file provider is selected.

## Risks and constraints

1. Missing v0.3/v0.2 source documents and API draft limit complete traceability and contract review.
2. Several critical settings remain unset (including dispute window and second-approval threshold); dependent workflows must fail closed.
3. Provisional privilege matrix requires completion and approval.
4. PostGIS, PostgreSQL integration and database-level append-only controls require execution against a real PostgreSQL instance.
5. Node package installation was attempted in the build environment but did not complete before timeout; dependency installation, compilation and tests therefore remain unverified here.

## Implementation plan

1. Establish strict NestJS app, config validation, logging, HTTP hardening, `/api/v1`, Swagger and health checks.
2. Create 14 module boundaries and Administration submodules for settings, permissions and audit.
3. Define Prisma schema and migration strategy, including PostGIS and raw SQL controls.
4. Define provider ports and production fake-adapter guard.
5. Add decision/clarification/owner records, ADRs, traceability and setup documentation.
6. Install dependencies, run Prisma generation/migrations, build, lint and tests in a network-enabled environment with PostgreSQL; resolve failures before calling the foundation verified.
