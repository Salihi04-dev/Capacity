# Architecture Overview

CAPACITY is a single NestJS modular monolith with PostgreSQL as the source of truth. HTTP controllers are transport adapters; application/domain logic belongs in module services; Prisma is the persistence adapter. Cross-module collaboration must occur through exported application services or explicit ports, not direct access to another module's tables or internals.

## Module boundaries

1. Authentication and Identity (`auth`)
2. Businesses and Memberships (`businesses`)
3. Verification (`verification`)
4. Listings (`listings`)
5. Logistics (`logistics`)
6. Storage (`storage`, disabled)
7. Search and Discovery (`discovery`)
8. Bookings (`bookings`)
9. Payments and Escrow (`payments`)
10. Ledger and Payouts (`ledger`, `payouts`)
11. Disputes (`disputes`)
12. Reviews and Reports (`reviews`, `reports`)
13. Notifications (`notifications`)
14. Administration and Audit Logs (`admin`, including settings/permissions/audit)

The root application composes exactly these 14 domain modules. Ledger/Payouts and Reviews/Reports use internal NestJS submodules under their respective v0.3 boundaries. Health is cross-cutting infrastructure. No microservices are introduced.

## Cross-cutting design

- Infrastructure configuration is environment-backed and validated at startup.
- Business policy is database-backed, typed, versioned, effective-dated and audited.
- Permission checks use authenticated identity plus server-side role assignments and validated acting role.
- Provider dependencies are interfaces in `src/providers/ports.ts`.
- Timers and background work must persist due times in PostgreSQL; a queue is only an execution aid.
- Booking capacity reservation, ledger immutability and audit immutability require database-backed controls and integration tests.
- Storage API rejects access while disabled. A client-side hide is not sufficient.
