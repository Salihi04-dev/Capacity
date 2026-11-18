# Database Strategy

PostgreSQL is authoritative. Prisma is the standard ORM/migration tool. Raw SQL migrations are required for PostGIS extension/types/indexes, atomic conditional capacity updates/row locks, and database-level append-only controls. Spatial fields should be represented through Prisma `Unsupported` types where appropriate and accessed with parameterised raw SQL.

The initial Prisma schema establishes versioned settings, audit events and admin role assignments only. Business entities are intentionally not invented in this foundation stage. The initial SQL migration enables PostGIS, creates the foundation tables and attaches the append-only trigger to `audit_logs`. Ledger tables do not exist yet; their append-only controls must be added alongside the later ledger schema migration.

Do not use floating point for money. Persist amounts in integer minor units. Use UTC `timestamptz` for instants. Nigeria presentation uses `Africa/Lagos`.
