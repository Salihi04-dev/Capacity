# Requirement Traceability Index — Foundation Stage

This is an initial mapping to the foundation scaffold, not a claim that full business workflows are implemented. Source specification PDFs and the OpenAPI draft are missing; extend this index when they are supplied.

| Requirement / decision | Code / document | Verification status |
|---|---|---|
| OD-1, OD-2 | `docs/assessment/repository-assessment.md`; foundation work | Documented; work proceeds |
| OD-3, D41 | `src/app.module.ts`; module boundaries; ADR-001 | Scaffolded; build unverified |
| OD-4, ADM-06 | `src/modules/admin/settings`; Prisma `SettingVersion` | Skeleton only; no write endpoint or DB verification |
| OD-5, O5 | `src/providers/ports.ts` | Interface only; no provider selected |
| OD-6, D23/D24 | `src/modules/admin/permissions`; `docs/requirements/clarifications.md` C-09 | Provisional catalogue; acting-role guard/auth not implemented |
| D39 | `src/modules/storage/storage.controller.ts` | Fail-closed route; runtime DB setting integration pending |
| D40, `/api/v1` | `src/main.ts` | Configured; runtime unverified |
| D41 | `src/app.module.ts`, `src/modules/**` | Module boundaries scaffolded |
| ADM-07, audit | `src/modules/admin/audit`; Prisma `AuditLog` | Skeleton only; DB trigger migration requires follow-up after table creation |
| AUTH-05, ADM-10, C-13 | `src/modules/admin/permissions` | Provisional permission catalogue; no auth/session implementation |
| LOC-02 | architecture/database strategy docs | UTC policy documented; no domain entities yet |
| SITE-02 | decision register / settings ADR | Not implemented; public projection withheld pending approved public values |
| OpenAPI C-22 | `src/main.ts`; `docs/openapi/contract-status.md` | Swagger setup scaffolded; export not yet generated |
