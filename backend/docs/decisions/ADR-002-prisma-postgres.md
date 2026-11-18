# ADR-002: PostgreSQL and Prisma with Explicit SQL Escape Hatches

- Status: Accepted
- Context: The system needs relational integrity, PostGIS, atomic booking capacity and database-enforced append-only audit/ledger records.
- Decision: PostgreSQL is authoritative; Prisma is the ORM and migration workflow. Versioned raw SQL migrations implement features Prisma cannot express.
- Alternatives: ORM-only schema; custom SQL-only persistence.
- Consequences: Review SQL migrations carefully and test against PostgreSQL. Prisma schema alone is not sufficient for critical controls.
