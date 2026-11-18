# ADR-001: Modular Monolith

- Status: Accepted (owner decision OD-3 plus D41)
- Context: Web, mobile and admin share one API and one set of business rules.
- Decision: Use one NestJS deployable application, one primary PostgreSQL database and explicit module boundaries.
- Alternatives: Microservices; separate APIs per client.
- Consequences: Simpler deployment and transactions; module boundaries and dependency discipline must be enforced in code review.
