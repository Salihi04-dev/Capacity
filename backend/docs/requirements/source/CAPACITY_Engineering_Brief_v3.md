# CAPACITY — Master Software Engineering & Development Brief (v3)

**Aligned to:** Specification v0.3 (Decisions and Change Log, 16 November 2026) and System Analysis and Requirements Specification v0.2 (28 October 2026).
**Replaces:** Brief v2. Version 3 retains the v2 requirements baseline and owner decisions, while clarifying approval independence, runtime-setting governance, the disabled Storage boundary, API contract authority, privacy and retention, and critical engineering controls. It does not represent formal approval of Specification v0.3 or resolve the product decisions that remain open.

---

## 1. Project Mandate and Execution Mode

You are responsible for establishing and developing the backend engineering foundation for **CAPACITY — The Invisible Infrastructure Exchange**, a B2B marketplace connecting businesses with unused commercial and logistics infrastructure capacity to businesses that need it.

Work as a professional software engineering engagement: established SDLC practice, sound system design, secure coding, maintainable architecture, production-oriented principles. Your job is not only to generate code. You must understand the requirements, evaluate the existing project, design an appropriate solution, implement it incrementally, verify it, document it, and surface technical and product risks. Every decision must be explainable, traceable to a requirement, and maintainable by other engineers. Do not let the conventions of any development tool or language model drive decisions; follow the requirements and sound engineering practice.

### 1.1 Execution mode (owner decisions OD-1, OD-2)

- **Build now.** Team and project-lead sign-off of v0.3 is pending. That does not stall development. Proceed on v0.3 as written. Treat every behaviour as provisional until sign-off, and expect changes.
- **Continuous, not gated.** Produce the repository assessment and implementation plan, save them under `docs/`, and **continue straight into Phases 2 and 3 without waiting for a reply**. Stop only for a blocker you cannot safely work around, and then offer the smallest safe way forward.
- **Make change cheap.** Anything provisional, unresolved or likely to change must live behind a database-backed setting, a port interface, or a clearly marked and registered provisional rule (sections 6 and 8). Do not scatter such values through code.
- **Change control.** When v0.3 is signed off or amended, record the change, assess its impact, update documentation and tests, and keep traceability intact.

---

## 2. Owner Decisions Already Made

Record these in `docs/requirements/owner-decisions.md` and cite them where relied upon. They are the project owner's decisions and take effect immediately. Where they go beyond the written specifications, flag the point in the clarification register (Appendix B) so the specifications can be updated.

| ID | Decision |
|---|---|
| OD-1 | Build now. Do not wait for sign-off or for responses to open questions. Changes are made later where necessary. |
| OD-2 | After the assessment and plan, continue into implementation. Do not stop and wait. |
| OD-3 | **NestJS and Prisma are approved**, even though the specification documents were not updated. Treat the stack in section 9 as approved. |
| OD-4 | Runtime configuration follows the specifications: business parameters are Super Admin-editable settings stored in the database, changed without code changes or redeployment (ADM-06, v0.3 section 3). Environment variables are for infrastructure only. |
| OD-5 | Escrow licensing is being handled by the lawyers. It is **not a development gate**. Payout and escrow logic may be built behind the payment-partner port. The structural rules still apply: CAPACITY never holds or pools customer funds, and no payment provider is selected without an approved decision (O5). |
| OD-6 | **The Super Admin has final authority over administrative escalation, assignment and decisions within the approved permission model.** This does not permit a person to approve their own high-risk financial execution or waive an independent second-approval control. See section 7.3. |
| OD-7 | The source documents (PDFs and the API draft) are committed to the repository, read-only, in a private repository (section 3.1). |

---

## 3. Source of Truth and Requirements Governance

**Primary references:**
1. CAPACITY Specification v0.3 — Decisions and Change Log (16 November 2026). **This is the main source of truth.**
2. CAPACITY System Analysis and Requirements Specification v0.2, with its decisions D1–D17 and change history.
3. `OpenAPI-Capacity-draft.json` — a working proposal derived from v0.3. It is reviewed against the specifications, not blindly implemented (section 15).

**Rules:**
1. v0.3 supersedes v0.2 wherever they conflict (pending sign-off, per OD-1).
2. v0.2 requirements that v0.3 does not change or remove stay applicable. v0.3 Appendix A lists only changes. Do not discard v0.2 requirements because they are missing from it. The v0.2 additions (price per unit, cargo value cap, vehicle and insurance papers, gateway-fee ledger entries, minimum quantity, shared configuration) are also unchanged.
3. Do not invent product requirements, business rules, workflows, permissions, or financial policies.
4. Classify every rule as one of: **confirmed decision**, **provisional rule**, **recommendation**, or **unresolved decision**. Never present a recommendation as an approved requirement.
5. Maintain traceability between requirements, implementation and tests. Use a requirement-ID index (`docs/requirements/traceability.md`) mapping each ID to modules, endpoints and tests.
6. Where documents are ambiguous or contradictory, record the issue in the clarification register (Appendix B), apply the stated interim behaviour, and continue.
7. Do not overwrite supplied requirements documents.

### 3.1 Where documents live

Create and maintain:

- `docs/requirements/source/` — the supplied PDFs and `OpenAPI-Capacity-draft.json`, **read-only, never edited**. The repository must be **private**: v0.3 and v0.2 are marked confidential.
- `docs/requirements/` — requirement extracts in Markdown (PDFs are hard to work with; create Markdown extracts of v0.3 and v0.2 here, leaving the originals untouched), the traceability index, owner decisions, the decision register and the clarification register.
- `docs/decisions/` — Architecture Decision Records (ADRs).
- `docs/architecture/` — architecture and system design.
- `docs/openapi/` — the generated OpenAPI description of the implementation, plus contract-status and change-review records. Generation from code does not by itself constitute product or team approval (section 15).
- `docs/development/` — setup, workflow, implementation guides.

If the source documents are missing from the repository when you start, record that in the assessment and request them. Do not reconstruct the specifications from memory.

---

## 4. Product Scope

### 4.1 Release 1 — Pilot (included)

- **Market:** Nigeria and NGN only. Country and currency are **configuration**, so other markets can be added without code branches (D18, LOC-03, R7).
- **Marketplace:** logistics is live, limited to **return trips and partial loads** (D43, LST-02). Refrigerated transport and vans are out.
- **Platforms:** web and mobile on **one backend API**, built as a modular monolith (D40, D41). No business rule is implemented separately in a client.
- Manual provider verification, by the Moderator.
- Listings, availability, expiry and take-down.
- Search and discovery.
- Booking requests, provider accept or decline, capacity reserved on acceptance, payment deadlines, expiry, oversell protection.
- Escrow through a licensed partner, ledger, commission, refunds, payouts, reconciliation.
- Disputes and reports.
- Four admin roles, audit log, review queues.
- Status updates, delivery confirmation, ratings, notifications **including push** (NOT-03 is now Core).
- Premium adverts, subject to O7.

The platform facilitates transactions. It does not own or operate the assets and **must never hold customer funds**.

### 4.2 Built but switched off

The product specification classifies Storage as built but switched off for the whole pilot (D39, LST-09). For this backend foundation, represent it as a distinct module and data-model boundary behind a backend-enforced setting. Define the separation of Storage-specific domain types/schema from logistics, but do not build active Storage listing, discovery, booking, provider-confirmation, payment or administration workflows, and do not create pilot dependencies on Storage. Storage may share genuinely common marketplace capabilities with logistics, but its rules and attributes must never be forced into logistics-only fields (R21). While disabled, the API must reject or omit Storage operations; hiding client controls is insufficient. Enabling Storage and implementing or activating its workflows requires an approved scope change and its own verification.

### 4.3 Explicitly excluded from the pilot

Do not implement or depend on: Kenya, KES, M-Pesa; customer capacity requests (D30, SRC-07); per-booking chat (D36, BKG-10 stays Optional and unbuilt); refrigerated transport and vans; automated ID verification; live in-browser ID capture (proposed only, O28); live GPS tracking; Google login and username login (D32); equipment, parking, kitchens, industrial capacity; insurance and financing; subscriptions and capacity intelligence; WhatsApp messaging; other markets; capacity intelligence and analytics.

Do not expand scope without an approved requirements change.

### 4.4 Business rules unchanged from v0.2

10 percent commission (configurable, PAY-03); status-only tracking (no live GPS, no asset monitoring, TRK-04); provider liability for cargo in transit (D13, DSP-04); premium adverts; ratings; price per unit with optional minimum quantity and optional whole-asset price (LST-11, O17 proposal stands); declared cargo value with a per-booking cap (BKG-12); vehicle papers and optional insurance certificate on file (KYC-10); gateway fees as separate ledger entries (PAY-11). Phone numbers are released only after payment (BKG-08, D36).

### 4.4a Planning context

v0.3 states the 9 November kickoff has passed and no v0.2 date holds. The effort estimate is not re-estimated (v0.2: 51 to 78 person-weeks including storage and mobile; Kenya leaving reduces it, the Finance role, permission matrix and other v0.3 additions increase it). This is context only and does not change the work.

---

## 5. Requirements Baseline

### 5.1 Decisions D18–D43 (all pending sign-off; applied now per OD-1)

D26 is open (see O18). D42, D44 and D45 from the review feedback are covered by D26, D30 and D36.

| ID | Decision |
|---|---|
| D18 | Nigeria and NGN only. Kenya, KES, M-Pesa deferred. Country and currency are configuration. |
| D19 | A licensed payment partner holds customer funds. CAPACITY records every transaction and instructs releases, and never holds or pools customer money. Licensing is confirmed with counsel and the employer (tracked, not a dev gate, OD-5). |
| D20 | Borrow only the *experience* of peer-to-peer crypto escrow: clear holds, minimal exposure for CAPACITY. No crypto technology. |
| D21 | Four admin roles, final: Super Admin, Support, Moderator, Finance. Enforced by role, not by person. |
| D22 | No role, including Super Admin, can force a payment or force-confirm a delivery. Delivery confirms by system timer only. No person retries a customer payment (the customer does). Support sees payment history read-only. Every admin action is logged. |
| D23 | Support records the dispute decision (release, refund or split). Finance executes it. Above a set amount the Super Admin gives a second approval. |
| D24 | Support and Moderator escalate to the Super Admin, who reassigns or resolves. The Super Admin can cover an absent role-holder during the pilot. Cover never skips an approval control (see 7.3). |
| D25 | Finance sees the full ledger and payment history, executes payouts, refunds and dispute outcomes, re-initiates failed payouts and refunds on the same record, reconciles, reviews payout-account changes and exports finance reports. No access to ID documents, moderation or dispute decisions. |
| D26 | Open: listing approval before or after publication (O18). Until answered, v0.2 LST-07 applies. |
| D27 | A listing stays visible until full or expired. Available capacity = original capacity minus booked capacity. Pending requests do not reserve capacity. Capacity is reserved when the provider accepts and released if payment does not arrive in time. |
| D28 | Logistics and storage keep separate booking workflows. Transport response and payment windows depend on time to departure. Storage bookings need provider confirmation within a time limit (O21). |
| D29 | When several customers request one listing, the provider picks. Accepting one reduces remaining capacity and pending requests that no longer fit decline automatically. The database enforces this atomically so capacity cannot be oversold. |
| D30 | Customer capacity requests excluded from the pilot (Later). |
| D31 | Provider marks delivered; customer confirms. If the customer is silent for 24 hours (starting value) and no dispute is open, the system confirms, with a reminder at the halfway point. The period is a setting. |
| D32 | Sign in with phone or email plus a password, with persistent sessions. A phone code verifies the number, and key actions ask for an extra code. Final rules before build (O24). Username login dropped; Google login deferred. |
| D33 | Manual provider verification confirmed. When customers must verify, and what they submit, is open (O15). |
| D34 | Manual review stays. Live in-browser capture of ID and face photo is proposed, not confirmed (O28). |
| D35 | A documented ID retention policy is required and must follow data protection rules (O26). Working proposal: keep while the user stays verified, delete when the account closes, unless a legal hold applies. |
| D36 | No per-booking chat in the pilot. Phone numbers released after payment (BKG-08). |
| D37 | Users can report users and listings. The Moderator handles reports (RPT-01). |
| D38 | The Super Admin can manage admin operations without direct database access and can delegate work by role. |
| D39 | Storage built but switched off for the whole pilot by an admin setting. |
| D40 | Web and mobile share one backend API and one set of business rules. |
| D41 | Modular monolith: one application, one database, clear module boundaries. Not microservices. |
| D43 | Return trips and partial loads are the pilot logistics segments. Refrigerated transport and vans move out. |

### 5.2 Requirement index (v0.3 changes plus applicable unchanged v0.2)

Status key: **N** = new in v0.3, **C** = changed in v0.3, **O** = open, **U** = unchanged from v0.2 and applicable, **L** = Later or excluded.

**Accounts and access**

| ID | Requirement (pilot interpretation) | Status |
|---|---|---|
| AUTH-01 | Sign in with phone or email plus password. Phone verified by one-time code. Limit attempts and resends. Rules per O24. | C |
| AUTH-02 | Phone stays. Email can also be used to sign in (also receipts and notices). | C |
| AUTH-03 | Roles customer, provider, admin. One account can be both customer and provider. | U |
| AUTH-04 | Persistent sessions that survive app close, sign out, sign out of other devices, revocable sessions, extra code for key actions (list per O24). | C |
| AUTH-05 | Super Admin, Support, Moderator, Finance, with two-factor sign-in. The verification officer becomes the Moderator. | C |
| AUTH-06 | Moderator restricts and reactivates users with a recorded reason. Super Admin can cover. | C |
| AUTH-07 | Super Admin adds and removes admin roles and delegates work. All changes logged. | N |

**Verification**

| ID | Requirement | Status |
|---|---|---|
| KYC-01 | Manual provider verification confirmed. Customer scope open (O15). Live capture proposed only (D34, O28). | O |
| KYC-02 | Providers submit business registration documents and details: legal name, registration number, address, contact. | U |
| KYC-03 | Business address on registration must match the listing address. Reviewer records the result. | U |
| KYC-04 | Statuses: not submitted, pending, approved, rejected with reason, expired. Users can resubmit. | U |
| KYC-05 | Providers cannot publish until approved. When customers must be approved depends on O15. | O |
| KYC-06 | Verification queue with document viewer, approve and reject, and audit trail. Owned by the Moderator, Super Admin on escalation. Target review times open (O25). | C |
| KYC-07 | Verified badge on provider profile and listings. | U |
| KYC-08 | ID documents stored privately, encrypted, visible only to authorised staff, every view logged. Retention rule required (O26). | Clarified |
| KYC-09 | Payout account name must match the verified person or business. Finance reviews payout-account changes (D25). | U/C |
| KYC-10 | Logistics providers add vehicle registration papers and, if held, a goods-in-transit insurance certificate, shown as "documents on file". | U |
| KYC-12 | Alternative customer ID sequencing, applies only if O15 changes D6. | Optional |
| KYC-13 | Live in-browser capture of ID and face photo, compared manually. Proposed, pending O28. **Do not build.** | N |

**Listings**

| ID | Requirement | Status |
|---|---|---|
| LST-01 | Verified provider creates a listing: category, description, price per unit, location, availability window, capacity and unit. | U |
| LST-02 | Pilot types: return trip, partial load. Fields: origin, destination, departure time, capacity, vehicle type, cargo restrictions, pick-up and drop-off notes. (Refrigeration fields out.) | C |
| LST-03 | Price per unit in NGN (currency from configuration). | U |
| LST-04 | Visible until full or expired. Available = original minus booked. Pending requests do not reserve capacity. | C |
| LST-05 | Draft, publish, pause, edit, cancel. Rule for taken-down listings with existing bookings is open (O22). | O |
| LST-06 | Photos and short description with file size limits suited to mobile data. | U |
| LST-07 | Moderator review at first publish and take-down with a reason at any time, until O18 is answered. | O |
| LST-08 | Repeat a listing for regular routes (suggested). | U |
| LST-09 | Storage types and fields, built, switched off for the pilot. | C |
| LST-11 | Price per unit, optional minimum quantity, optional whole-asset price. Total = quantity × unit price, or the whole-asset price. | U |
| LST-12 | Provider states cargo restrictions and the maximum declared cargo value per booking, within the platform cap. | U |

**Search and discovery**

| ID | Requirement | Status |
|---|---|---|
| SRC-01 | Search and filter by category, origin and destination, date, capacity needed, price range. (Refrigeration filter is out with refrigerated transport.) | U/C |
| SRC-02 | List and map views with location search (PostGIS). | U |
| SRC-03 | Sort by relevance, price, departure time, rating, distance. | U |
| SRC-04 | Promoted listings first, labelled Sponsored (subject to O7). | U |
| SRC-05 | Fast on slow connections: pagination, light payloads. | U |
| SRC-06, SRC-07 | Saved searches and alerts; customer capacity requests. | L |

**Bookings**

| ID | Requirement | Status |
|---|---|---|
| BKG-01 | Customer requests a booking with quantity, dates and notes. Price and fees calculated server-side and shown before sending. | U |
| BKG-02 | Provider accepts or declines within a response window set by time to departure (section 6). Storage: manual confirmation within a time limit (O21). When requests compete, the provider picks. | C |
| BKG-03 | Customer pays within a payment window by time to departure, always ending before departure with a buffer to confirm. Capacity reserved on acceptance, released if payment does not arrive. | C |
| BKG-04 | Booking summary shows quantity × unit price, total, 10 percent commission and the provider's net amount. | U |
| BKG-05 | Booking statuses follow the lifecycle in 5.3. | U |
| BKG-06 | Many bookings can share one listing until capacity is full. | U |
| BKG-07 | Cancellation by either party with tiered refunds (O8 unresolved). Provider cancellations tracked. | U/O |
| BKG-08 | Contact details revealed to both sides only after payment is secured. | U |
| BKG-09 | Booking reference and downloadable confirmation for both sides. | U |
| BKG-10 | Message thread per booking. **Optional, not built in the pilot.** | L |
| BKG-11 | Short-notice 25 percent rule **replaced** by the departure bands in section 6. | C |
| BKG-12 | Customer declares cargo type and value and confirms it is not on the prohibited goods list. Bookings above a configurable cap need admin approval. Cap per country (O14). | U |
| BKG-13 | On accept, pending requests that no longer fit decline automatically. The database enforces the capacity check so two simultaneous accepts cannot oversell. | N |

**Payments, escrow, commission**

| ID | Requirement | Status |
|---|---|---|
| PAY-01 | Nigeria only. Methods depend on the chosen partner (O27). | C |
| PAY-02 | Escrow held by a licensed partner until delivery is confirmed and the dispute window has passed. | Clarified |
| PAY-03 | Commission 10 percent, configurable by admin per market and category, deducted from the provider's payout. | U |
| PAY-04 | Payout to the provider's verified bank account, 24 to 48 hours after delivery confirmation unless a dispute is open. Executed by Finance. One by one or scheduled open (O23). | C |
| PAY-05 | Refunds and partial refunds from cancellation tiers and dispute decisions. Executed by Finance. | C |
| PAY-06 | Every money movement recorded in a ledger: payment, hold, commission, advert fee, payout, refund, gateway fee. Entries never edited, only reversed. | U |
| PAY-07 | Webhooks handled safely: no double processing, failed and expired payments handled. Finance can re-initiate a failed payout or refund **on the same record**. When status is unknown, ask the partner before resending. No person retries a customer payment. | C |
| PAY-08 | Daily reconciliation between ledger and gateway statements. Owned by Finance. | C |
| PAY-09 | Receipts for customers, payout statements for providers, commission and advert invoices. Tax rules to be confirmed. | U |
| PAY-10 | NGN at launch. Each listing and booking has one currency. The data model allows more later. | C |
| PAY-11 | Gateway fees recorded as their own ledger entries per transaction. Treatment is O13. | U |
| PAY-12 | Commission only on completed bookings, none on fully refunded ones. Retained cancellation fees split per terms (O13). | U |
| PAY-13 | Payouts, refunds and dispute outcomes above a threshold need Super Admin second approval (amount O19). | N |

**Delivery, disputes, reports**

| ID | Requirement | Status |
|---|---|---|
| TRK-01 | Provider updates status: confirmed, in transit, delivered, completed. | U |
| TRK-02 | Provider marks delivered, customer confirms. After 24 hours of silence with no dispute open, the system confirms, with a reminder halfway. No admin can force a confirmation. | C |
| TRK-03 | Both sides see a timeline and are notified at each change. | U |
| TRK-04 | No live GPS and no asset monitoring. | U |
| DSP-01 | Either party can open a dispute within the dispute window with reason and evidence. | U |
| DSP-02 | Funds stay held while a dispute is open. | U |
| DSP-03 | Support records the decision (release, refund, split). Finance executes. Above the threshold the Super Admin approves. Every action logged. | C |
| DSP-04 | Terms state provider is responsible for cargo in transit. No insurance in v1. | U |
| DSP-05 | Flag repeat offenders and show dispute statistics to admin. | U |
| DSP-06 | Support and Moderator can escalate a case to the Super Admin, who reassigns or resolves. | N |
| RPT-01 | Users can report users and listings. The Moderator handles reports. | N |

**Adverts, ratings, notifications**

| ID | Requirement | Status |
|---|---|---|
| ADV-01..06, 09 | Promote a listing for 24 hours, 1 week or 1 month, admin-set prices, approved providers only, minimum average rating once reviews exist, fair ordering rule, slot cap, automatic end and renewal, switches per country and category. **Subject to O7. Do not build until O7 is decided.** | U/O |
| ADV-07 | The Moderator pauses or cancels promotions. Finance and Super Admin see advert revenue separately from commission. | C |
| ADV-08 | Promotion results (views, clicks, bookings). | L |
| RAT-01, RAT-02 | After completion each side rates the other (1 to 5) with a short review. Profile shows average rating, completed bookings, verified badge. The Moderator removes abusive reviews. | U |
| NOT-01 | In-app and email notifications for every booking, payment, status and dispute event. | U |
| NOT-02 | SMS for one-time codes and critical events. | U |
| NOT-03 | Push notifications on mobile. **Now Core.** | C |
| NOT-04 | WhatsApp and per-user notification settings. | L |

**Admin console (backend)**

| ID | Requirement | Status |
|---|---|---|
| ADM-01 | Dashboard: verified providers, active listings, bookings, booking value, commission, advert revenue, open disputes. | U |
| ADM-02 | User and verification management belongs to the Moderator. | C |
| ADM-03 | Listing moderation belongs to the Moderator. Booking issues go to Support. | C |
| ADM-04 | Finance runs payments, refunds, payouts and reconciliation. Support is view-only. Super Admin approves above the threshold. | C |
| ADM-05 | Disputes go to Support. Advert management goes to the Moderator. | C |
| ADM-06 | Settings are Super Admin only. Every window in section 6 is a setting changed without code changes or redeployment. | Clarified |
| ADM-07 | Audit log of every admin action. | U |
| ADM-08 | Editable terms, privacy policy, help content; CSV export of reports. | U |
| ADM-09 | Super Admin manages admin operations without direct database access, delegates work by role. | N |
| ADM-10 | The privilege matrix (section 7) is enforced, with case reassignment between roles. | N |

**Localisation and site link**

| ID | Requirement | Status |
|---|---|---|
| LOC-01 | User, listing and booking carry a country and currency. NGN only in the pilot. | C |
| LOC-02 | Times stored in UTC and shown in local time (Nigeria, UTC+1; use the `Africa/Lagos` zone). | C |
| LOC-03 | Country-specific legal text, tax, payment methods and ID types are configuration. Adding Kenya must not need code branches. | Clarified |
| LOC-04 | English at launch. | L |
| SITE-02 | Commission, time windows and refund tiers come from one shared configuration read by the app and the marketing site. Expose a **public read-only** configuration endpoint for these. The marketing site itself is out of scope. | U |

### 5.3 Booking lifecycle (v0.2 section 6.6, applicable)

Requested → Accepted → Paid (funds held, capacity reserved) → In progress → Completed → Settled (provider paid). Exit paths: Declined or expired, Cancelled (tiered refund), Disputed (Support decides, Finance executes). Disputes can be opened from In progress until the dispute window after completion closes. Funds stay held while a dispute is open. Record every transition in a booking event timeline (actor, time, note).

### 5.4 Data model entities (v0.2 section 9, applicable)

User; Business (a provider has one or more users); VerificationDocument (government ID, business registration, vehicle papers, insurance certificate); Category (template logistics or storage); Listing (with price per unit, unit, minimum quantity, optional whole-asset price, max declared cargo value, total and remaining capacity, window, status, promoted-until); LogisticsDetails; StorageDetails (optional module); Booking (quantity, price, commission, net amount, currency, status, reference, declared cargo type and value); BookingEvent; Payment and LedgerEntry (append-only; types: charge, hold, commission, advert, payout, refund, gateway fee); Payout; Promotion; Dispute; Review; Notification (and optional messages); AuditLog (actor, action, target, before and after, time, IP address); Configuration. Design around actual requirements. Do not model speculative features.

---

## 6. Runtime Settings (database-backed, Super Admin-editable)

OD-4: v1 of this brief said "centralised configuration" and called commission "agreed at 10%". v0.3 requires more. Business parameters are **settings in the database**, editable only by the Super Admin, effective without redeployment, validated, and audited.

Implement a `settings` sub-module inside the Administration boundary (this keeps the 14 v0.3 module boundaries). Other modules depend on a read interface, never on the table. Environment variables (`.env`) cover infrastructure only: database URL, secrets, ports, provider credentials.

**Rules:**
- Only the Super Admin changes settings (ADM-06). Every change is audited with before and after values, actor, timestamp and a mandatory change reason.
- Each setting version must carry: its value (or explicit unset state), status, effective date/time, last-modified actor, monotonically increasing version, and change reason. Record the approving actor and approval time where a provisional value is promoted to approved.
- Allowed statuses are **`provisional`**, **`approved`** and **`disabled`**. `provisional` means a working value that has not received the required product/team approval; it must never silently become an approved policy. `approved` means the value has been explicitly approved through the project's decision process. `disabled` means the setting or capability is intentionally inactive. An unset required value remains unset; do not manufacture a default.
- The current v0.3 baseline remains pending formal sign-off. Therefore, do not mark a setting `approved` merely because a value appears in this brief or in v0.3. Record the source and approval status accurately. Where a feature or transaction must fail closed, a provisional or unset value must not be treated as approval to proceed.
- Settings are typed, range-validated and versioned. Changes are audited and take effect only from their recorded effective time. Preserve historical versions.
- **Snapshot business terms.** When a booking is created or accepted, persist the applicable setting version(s) and computed response/payment deadlines, prices, commission and other material terms needed to explain that booking. A later settings change must not silently rewrite existing bookings. Record the implementation choice in an ADR.
- Expose only the SITE-02 subset approved for public disclosure (commission, windows and refund tiers) through a public read-only endpoint. Never expose internal setting metadata, secrets, admin-only controls or provisional values that have not been approved for publication.
- Unset or unapproved settings **fail closed where noted**. Do not invent values or silently promote provisional seeds.

| Setting | Working value / interim behaviour | Source |
|---|---|---|
| Country and currency | Seed `NG`, `NGN`, `Africa/Lagos`. No code branches for markets. | D18, LOC-03 |
| Commission rate, per market and category | 10 percent default, stored as basis points or equivalent integer form. **Rounding rule to the kobo is unspecified**: use one documented rule consistently and register it (C-04). | PAY-03 |
| Provider response, transport | Under 24 hours to departure: 30 minutes. 24 to 72 hours: 2 hours. Over 72 hours: 12 hours. *Agreed starting values.* Boundary inclusivity at exactly 24 and 72 hours is unspecified (C-02). | D28, BKG-02 |
| Provider response, storage | **Unset** (O21). Not needed while storage is off. | O21 |
| Customer payment window | Under 24 hours to departure: 30 to 60 minutes. Otherwise up to 24 hours. Always ends before departure, with a buffer to confirm. *Agreed starting values are ranges.* Store one value per band. Provisional seeds are the upper bound of each range (60 minutes, 24 hours), and the buffer is a setting with a provisional seed. All seeds are **registered as provisional** (C-02, C-20). | BKG-03 |
| Delivery auto-confirm | 24 hours after the provider marks delivered, if the customer is silent and no dispute is open. Reminder at the halfway point (half the configured period). | D31, TRK-02 |
| Dispute window | **Unset** (O20). Time after delivery is confirmed in which a dispute can be opened. Until set, payouts do not become eligible for release (fail closed). | O20 |
| Payout eligibility delay | 24 to 48 hours after confirmation unless a dispute is open. Seed provisionally at the 48-hour upper bound. The relation to the dispute window is unresolved (C-01). | PAY-04 |
| Payout release mode | Manual, one by one, executed by Finance. Scheduled release is a later option (O23). | O23 |
| Second-approval threshold (NGN, in kobo) | **Unset** (O19). While unset, **every** payout, refund and dispute outcome needs Super Admin approval (fail closed). | O19, PAY-13 |
| Declared cargo value cap, per country | **Unset** (O14). While unset, the declared value is recorded and not enforced. | O14, BKG-12 |
| Listing moderation mode | Interim: Moderator review at first publish. Take-down with a reason at any time. Implement as a setting so O18 can switch it. | O18, LST-07 |
| Customer verification policy | Interim: v0.2 baseline (customer approved before booking), implemented as a configurable checkpoint so O15 can move it. | O15 |
| Cancellation refund tiers | **Unset** (O8). The cancel endpoint records the request. It does not compute refunds. | O8 |
| Step-up (extra code) action list | **Unset** (O24). Build the mechanism. The list starts empty. | O24 |
| Storage enabled | `false`; status `disabled`. Enforce server-side. | D39 |
| Short-notice label | Unspecified after BKG-11 was replaced (C-05). Do not implement the 25 percent rule. | BKG-11 |
| Advert prices, slots, switches | Not built (O7). | O7 |

**Setting-status rule for this table:** values described as agreed starting values or provisional seeds remain `provisional` until explicitly approved. Unset values remain unset. The table is an engineering interim-behaviour register, not an approval record. Store setting metadata and history as specified above; do not rely on this table alone as runtime configuration.

---

## 7. Roles, Permissions and Authority

### 7.1 Model

Implement role-based authorisation **on the backend**. Hiding frontend controls is never access control. The model must distinguish five kinds of power, because they are different permissions: **view, review and decide, execute, approve, escalate and administer.**

Build the permission mechanism now: roles, a permission catalogue, guards, an **acting-role context** (see rules below) and audit hooks. The matrix below is the v0.3 working draft. v0.3 says it must be completed before development, but under OD-1 you build now. Mark it **provisional** and keep it data-driven so completion needs no restructuring (C-13).

### 7.2 Privilege matrix (v0.3 section 4, working draft)

| Action | Super Admin | Support | Moderator | Finance |
|---|---|---|---|---|
| **1. View** | | | | |
| Payment history and ledger | View | View only | — | Full |
| ID documents and verification photos (every view logged) | Escalation only | — | Yes | — |
| Audit log | Yes | — | — | — |
| **2. Review and decide** | | | | |
| Approve or reject provider verification | Cover | — | Yes | — |
| Review listings and take them down with a reason (timing O18) | Cover | — | Yes | — |
| Handle reports on users and listings | Cover | — | Yes | — |
| Restrict or reactivate a user | Cover | — | Yes | — |
| Moderate reviews and promotions | Cover | — | Yes | — |
| Handle support and booking issues | Cover | Yes | — | — |
| Review a dispute and record the decision | Cover | Yes | — | — |
| **3. Execute financial actions** | | | | |
| Execute payouts, refunds and dispute outcomes | Cover, with approval | — | — | Yes |
| Re-initiate a failed payout or refund (same record) | Cover, with approval | — | — | Yes |
| Reconcile the ledger and export finance reports | View | — | — | Yes |
| Review payout-account changes | — | — | — | Yes |
| **4. Approve high-value actions** | | | | |
| Second approval above the threshold (O19) | Yes | — | — | — |
| **5. Escalate, reassign, administer** | | | | |
| Escalate a case | Receives and reassigns | Yes | Yes | — |
| Assign and reassign cases | Yes | — | — | — |
| Add or remove admin roles and permissions | Yes | — | — | — |
| Change settings: commission, windows, tiers, countries, storage switch | Yes | — | — | — |
| **Prohibited for every role, including Super Admin** | | | | |
| Force a payment or force-confirm a delivery | No | No | No | No |
| Edit or delete audit log entries | No | No | No | No |

### 7.3 Rules for every role

- **Enforced by role, not by person.** One person may hold several roles in the pilot, but each action is checked against the role being exercised and the authenticated user's current server-side role assignments. The acting role may be selected in the request context, but it must be validated against those assignments and the permission catalogue. Never trust an arbitrary client-supplied role, header or unverified token claim as authority.
- **Cover is logged and never skips approvals.** The Super Admin may temporarily perform an absent role-holder's operational work where the matrix permits it. Cover does not remove, weaken or satisfy an independent approval requirement by itself.
- **Independent approval means a different human actor.** The approver must be a separately authenticated person with the required approval permission, and must not be the executor of the action being approved. Where the same person holds combined Support and Finance roles, or the Super Admin executes a covered Finance action, that person cannot approve their own execution. The approval record must identify both actors and their roles.
- **If independent approval is unavailable, the action remains pending.** Do not bypass the threshold, self-approve, fabricate a second approver or execute the financial action. Escalate the operational blockage for staffing/authority resolution. This is fail-closed behaviour, not a permanent product-policy decision about future emergency exceptions.
- **Finance executes only authorised instructions:** a decision recorded by Support, plus the required independent Super Admin approval for actions above the configured threshold. The approval requirement applies regardless of who is covering the Finance role.
- **Every action is logged** with actor, acting role, action, target, time, before and after values, reason/reference, and approval linkage where applicable.
- Sensitive document access is restricted and every view is logged.
- Admin sign-in requires two-factor authentication (AUTH-05, R19).

**Super Admin final authority (OD-6, clarified).** The Super Admin has final administrative authority for escalation, case assignment/reassignment and decisions that the approved permission model assigns to that role. That authority does not mean a Super Admin can approve their own financial execution, replace an independent second approver, or waive a control required by D23/D24 and the privilege matrix. If the Super Admin covers Finance or holds a combined role, the same separation-of-duties rule applies: a distinct authorised human must approve where approval is required. If no such approver is available, the action is not executed. Successful financial records must never be marked `self_approved`. Record blocked self-approval attempts or role conflicts as security/audit events, with the actor, attempted action and reason; do not record them as completed approvals. Update the source specification's approval/cover language through the clarification process (C-09).

---

## 8. Outstanding Decisions Register

Maintain `docs/requirements/decision-register.md`. For every unresolved item, record its status, affected modules, implementation dependencies, whether development can safely proceed, and the **interim behaviour** below, isolated behind a setting or interface. Do not silently resolve these in code. Raise the decision when behaviour depends on it, and keep building (OD-1).

**Resolved in v0.3:** O1 storage built but switched off (D39); O2 web and mobile both in the pilot (D40); O16 short-notice rule replaced by departure bands (section 6).

| ID | Topic (owner) | Interim behaviour | Modules |
|---|---|---|---|
| O3 | Launch date (Project Lead) | No dependency. | — |
| O4 | Team size and roles (Project Lead) | No dependency. | — |
| O5 | Payment partner (Project Lead, Engineering) | No provider selected. Build `PaymentPartnerPort` and generic webhook handling. Fakes only in dev and test. Partner must support the full escrow lifecycle in NGN (R23). | Payments, Ledger |
| O6 | ID verification provider (Project Lead) | Manual only. Automation not built. | Verification |
| O7 | Advert pricing, slots, ordering, beta switch (Project Lead) | Not built. Log module placement as C-08. | Listings, Search |
| O8 | Cancellation refund tiers, payout timing (Project Lead, Law Firm) | Cancel records the request. No refund formula assumed. Payout delay per section 6. | Bookings, Payments |
| O9 | Who may book: businesses only, or sole traders too (Project Lead) | Do not hard-code business-only or sole-trader rules. Keep the booking actor model flexible. | Bookings, Businesses |
| O10 | Operating entity, code and brand ownership (Project Lead, Law Firm) | No dependency. | — |
| O11 | Product name; CAPACITY is registered as an LLC in the US (R20) | Keep brand strings out of identifiers and in configuration where practical. | All |
| O12 | Named launch routes, at least one Nigerian (Project Lead) | Seed data only when named. | Listings |
| O13 | Gateway fees and commission on cancelled bookings (Project Lead, Finance) | v0.2 proposal stands: separate gateway-fee ledger entries, absorbed within the 10 percent at launch, no commission on fully refunded bookings. | Ledger |
| O14 | Cargo value cap, prohibited goods process (Project Lead, Law Firm) | v0.2 proposal stands: declare type and value, per-country cap setting, above-cap bookings flagged for admin approval. Approver role unspecified (C-07). | Bookings |
| O15 | Customer verification scope and timing (Project Lead, Law Firm, Engineering) | Options: ID before booking (v0.1), ID before first payment (v0.2), or verify with the request and the provider sees it after approval. Also open: whether customers need provider-level checks and whether business verification applies to every customer. Interim: configurable checkpoint (section 6). | Verification, Bookings |
| O17 | Pricing basis (Project Lead, Engineering) | v0.2 proposal stands (price per unit, optional minimum, optional whole-asset price). | Listings, Bookings |
| O18 | Listing approval before or after publication (Project Lead) | Interim v0.2 LST-07 via a moderation-mode setting. Trade-off: speed for providers listing near departure versus fake listings going live (R17). | Listings, Admin |
| O19 | Second-approval threshold, NGN (Project Lead, Finance) | Fail closed: all payouts, refunds and dispute outcomes need Super Admin approval. | Payouts, Disputes |
| O20 | Dispute window length (Project Lead, Law Firm) | Unset. Payouts not eligible until set. | Disputes, Payouts |
| O21 | Storage response time limit (Project Lead) | Unset. Storage is off. | Storage |
| O22 | Taken-down listing with existing bookings (Project Lead, Law Firm) | Take-down blocks new requests. Existing bookings are not auto-cancelled and no history is deleted. Registered as C-15. | Listings, Bookings |
| O23 | Routine payout release (Project Lead, Finance) | Manual, one by one, by Finance. | Payouts |
| O24 | Sign-in and one-time-code rules (Project Lead, Engineering) | Phone required and OTP-verified. Email optional and usable for sign-in once added. Step-up mechanism built with an empty action list. Whether phone verification is mandatory for email sign-ups is unresolved. | Auth |
| O25 | Working hours and review targets (Project Lead, Moderator) | No SLA enforcement. Order review queues by nearest departure (R6, R17). | Admin |
| O26 | ID retention (Law Firm, Engineering) | Do not implement deletion. Design for distinct retention rules and legal-hold support. D35 is a working proposal only, not an approved deletion rule. Separate account deactivation, personal-data deletion/anonymisation, financial-record retention and verification-document retention. Backend research and legal review come first. | Verification, Auth, Ledger |
| O27 | Payment methods in Nigeria (Project Lead, Engineering) | Depends on O5. | Payments |
| O28 | ID capture method and accepted documents (Project Lead, Law Firm, Engineering) | Secure upload to private storage via `PrivateFileStoragePort`. No live capture. List of accepted IDs is configuration. | Verification |

---

## 9. Technology Stack and Architecture

### 9.1 Approved stack (OD-3)

| Component | Technology |
|---|---|
| Runtime | Node.js (current LTS; pin via `.nvmrc` and `engines`) |
| Language | TypeScript, strict configuration |
| Backend framework | NestJS |
| Database | PostgreSQL |
| ORM and migrations | Prisma |
| Geospatial | PostGIS |
| API | REST |
| API documentation | OpenAPI / Swagger |
| Background processing | Redis and BullMQ, when justified |
| Containers | Docker, when available |
| Version control | Git |
| CI/CD | GitHub Actions |

Package manager: preserve an existing lockfile. If there is none, use npm. Select stable, compatible package versions. Avoid unnecessary dependencies and explain any significant deviation. Local development must not depend on Docker. Prepare database connection configuration, but do not claim database integration is verified until it has been tested.

**Prisma limits to settle in ADRs.** Prisma cannot express everything this project needs, and raw SQL inside migrations is expected for:
- PostGIS columns and spatial queries (treated as `Unsupported` types).
- The **atomic capacity reservation** (D29, BKG-13): a transactional conditional update or row-level locking, proven by concurrent-booking tests (R24).
- **Ledger and audit immutability**: database-level protection against `UPDATE` and `DELETE` (revoked privileges or triggers), not only application convention.

### 9.2 Modular monolith (D41)

One deployable application, one primary PostgreSQL database, clearly separated modules. No microservices.

Provide: clear module ownership, explicit interfaces between modules, business logic separated from HTTP controllers, domain logic separated from persistence, reusable application services, centralised configuration, consistent error handling and logging, testable business rules, controlled dependencies. Avoid circular dependencies and access to another module's internals. Modules communicate through defined services, interfaces or application-level contracts.

### 9.3 Required module boundaries (v0.3 section 6)

1. Authentication and Identity
2. Businesses and Memberships
3. Verification
4. Listings
5. Logistics
6. Storage
7. Search and Discovery
8. Bookings
9. Payments and Escrow
10. Ledger and Payouts
11. Disputes
12. Reviews and Reports
13. Notifications
14. Administration and Audit Logs

Establish the architecture and module foundations first. Do not implement every workflow in the first assignment. Storage is represented by a distinct module/domain boundary, separate category-specific model design and backend feature switch; active Storage workflows remain out of scope and the API must enforce the disabled state. Premium adverts have no module in the v0.3 list: do not scaffold one, register the question as C-08.

Suggested structure (adapt where justified, keep the boundaries):

`apps/api/src/` — `main.ts`, `app.module.ts`, `common/` (decorators, filters, guards, interceptors, pipes, interfaces, scheduling), `config/`, `database/`, `modules/` (`auth`, `users`, `businesses`, `verification`, `listings`, `logistics`, `storage`, `discovery`, `bookings`, `payments`, `ledger`, `payouts`, `disputes`, `reviews`, `reports`, `notifications`, `admin` including `settings`, `audit`).

Within modules separate controllers, application services or use cases, domain rules, DTOs and validation, persistence, and module tests. Do not create empty abstractions or layers without a practical purpose.

### 9.3a Provider ports

No external provider is selected without an approved decision. Define interfaces now, and keep vendor SDKs out of domain code:

`PaymentPartnerPort`, `SmsPort`, `EmailPort`, `PushPort`, `MapsGeocodingPort`, `PrivateFileStoragePort`.

(v0.2 names candidates such as Paystack or Flutterwave, Africa's Talking or Termii, SES or Resend, Google Maps or Mapbox, FCM and an S3-compatible private store. They are candidates to evaluate, not decisions.)

Fake or in-memory adapters are allowed in development and test **only**. The application must **refuse to start in production** if a fake adapter is configured. Never simulate successful financial transactions in production code. "Storage providers" here means file storage, not storage listings.

### 9.4 Time-driven behaviour

Several rules run on timers: provider response expiry, payment deadlines (releasing reserved capacity), the 24-hour delivery auto-confirm with a halfway reminder, payout eligibility, advert end. PostgreSQL is the source of truth. **Persist every deadline and its relevant policy/version snapshot in the database** and process due items with an idempotent sweeper. BullMQ/Redis may accelerate processing but must never be the only record or determine financial truth. Jobs must be safe to run twice, safe to run late, observable, retryable and recoverable after downtime. All times are stored in UTC; use the configured `Africa/Lagos` zone for Nigeria-facing presentation and business-time interpretation.

---

## 10. Critical Business and Data Integrity Principles

### 10.1 Booking and capacity
- Pending requests do **not** reserve capacity. Capacity is reserved when the provider accepts.
- Reservation is **atomic**. Concurrent accepts never over-allocate. On accept, pending requests that no longer fit decline automatically (D29, BKG-13).
- Available capacity = original minus booked. A listing stays visible until full or expired.
- Reserved capacity is released if payment does not arrive by the deadline.
- Server-side validation of every booking state transition. Never rely on frontend validation.
- Prices, fees, commission and net amount are computed **on the server**. Provide a quote endpoint so clients never compute them (D40).
- Use database transactions and appropriate concurrency controls, with concurrent-booking tests.

### 10.2 Payments and escrow
- A licensed partner holds escrow. CAPACITY records every transaction, instructs releases, and never holds or pools customer money (D19).
- Idempotent payment operations. Verified webhook signatures. Duplicate, delayed and out-of-order events handled safely.
- When a payment or payout status is unknown, ask the partner before resending. A failed payout or refund is re-initiated by Finance **on the same record**. No person retries a customer payment.
- No payment provider is selected without an approved decision (O5).

### 10.3 Ledger and financial records
- Amounts are **integer minor units (kobo)**. No floating point.
- Commission is 10 percent by default (setting, section 6).
- The ledger is **append-only**. Corrections use reversals or compensating entries. Never edit or delete financial history.
- Entry types: charge, hold, commission, advert fee, payout, refund, gateway fee.
- Gateway-fee treatment follows O13's interim rule. Reconciliation (daily, Finance-owned) needs traceable records, including partner references.

### 10.4 Delivery and disputes
- The provider marks delivered. The customer confirms.
- If the customer is silent for **24 hours** and no dispute is open, the system confirms, with a reminder at the halfway point. The period is a setting. **Only the system timer confirms. No admin can force it.**
- Funds stay held while the dispute window runs and while a dispute is open. The dispute window duration is unresolved. Do not invent it.
- Support records the decision, Finance executes it, and above the threshold the Super Admin gives a second approval. No one can force a payment.

### 10.5 Auditability
Record sensitive admin and financial actions with actor, acting role, action, target, timestamp, previous value, new value, reason or reference, and IP address where lawful and appropriate. Audit history is immutable through any application operation and protected at the database level; application conventions alone are insufficient. Include role changes, settings changes, every ID-document view, cover actions, approval decisions, rejected approval conflicts and failed/blocked privileged attempts. Do not log identity-document contents, full ID numbers, credentials, secrets or unnecessary personal data.

### 10.6 Mandatory engineering controls for critical workflows

These controls are required design and verification work, not optional future improvements:

- **Booking concurrency:** capacity reservation must be atomic in PostgreSQL. Prove that simultaneous provider accepts cannot oversell using integration tests against PostgreSQL, not only mocked unit tests.
- **Deadlines and background work:** persist deadlines and state in PostgreSQL; make sweepers/jobs idempotent and safe after duplicate delivery, late execution, retries and process restarts. Redis/BullMQ is an execution aid, never the source of truth.
- **Policy snapshots:** preserve the setting versions and computed terms that governed an existing booking. A later settings edit must not silently change an accepted booking's deadlines, price, commission or other material terms.
- **Role authority:** derive permissions from the authenticated identity and server-side role assignments. Validate the acting role for every privileged operation. Never authorise from an untrusted header or request field alone.
- **Financial and audit immutability:** enforce append-only ledger and audit records at the database layer (for example, restricted database privileges and/or carefully designed triggers), and test that application and database roles cannot update or delete historical records.
- **Payment webhooks:** verify signatures; handle duplicate, delayed, out-of-order and replayed events; persist provider event identifiers; make processing idempotent; reconcile unknown outcomes with the partner before retrying an external financial action.
- **Private file uploads:** validate size, allowed content types and actual file signatures; use generated object keys, private storage, malware-scanning integration where available, authorised short-lived access, and an audit record for every sensitive document view. Never trust a client filename or MIME header.
- **Migrations and recovery:** test migrations against representative PostgreSQL data and document forward/rollback or recovery procedures before production. Do not assume every migration can be safely reversed; identify destructive or data-transforming steps explicitly.

---

## 11. Identity, Security and Privacy

Apply security throughout development.

- Input validation at boundaries, parameterised database access, secure password hashing, secure token and session handling, server-side authorisation, least privilege.
- Persistent sessions must be **revocable**, with sign-out of other devices, and an extra code for key actions (R19). Staff use two-factor.
- Rate limits on sign-in, OTP requests, attempts and resends. Secure HTTP headers. CORS restricted to deployment origins. OWASP API Security risks considered in design.
- **Identity documents are the most sensitive data:** private, encrypted storage, shown only to authorised staff in the verification queue, **every view logged**, retention per a documented and legally reviewed rule (O26). Never expose ID documents, verification images, credentials, payment secrets or internal admin data through public endpoints. Apply the upload controls in section 10.6.
- **Do not conflate lifecycle actions.** Account deactivation/suspension, account closure, deletion or anonymisation of personal data, retention of financial/transaction records, retention of verification documents, and a legal hold are separate concepts with separate rules. Do not implement blanket cascading deletion on account closure. A legal hold suspends applicable deletion until formally released. Financial records may have separate statutory/contractual retention obligations; verification documents may have different retention periods and access rules. O26 and counsel must determine the actual periods and lawful basis before deletion workflows are implemented.
- D35's proposal to retain verification documents while a user remains verified and delete them when the account closes (unless a legal hold applies) is **not an approved retention policy**. Do not implement it as an automatic deletion rule. Until O26 is resolved, preserve the records securely, minimise access, support retention-state/legal-hold metadata, and do not claim a deletion schedule has been established.
- Minimise data. **Do not copy ID numbers or personal data into logs or analytics.** Safe error responses.
- Card details never touch CAPACITY servers.
- Fraud controls: rate limits, device and phone checks, review of unusual payout-account changes (Finance), contacts hidden until payment.
- Privacy: consent and privacy notice recorded at sign-up, ability to export and delete personal data on request, retention rules, a written breach-response process. Both v0.2 jurisdictions set short deadlines for regulator notification, so counsel confirms the rules. For Nigeria the relevant regime is the NDPA 2023 (regulator: NDPC). Data transfers abroad need safeguards. Hosting region and vendor choices need counsel's input, and an African region is preferable where available. Record where each kind of data goes.
- Secret management, dependency vulnerability scanning, code review for money and verification logic, and an independent penetration test before public launch.
- Never commit credentials, tokens, private keys or environment secrets.

---

## 12. Database Engineering

PostgreSQL is the source of truth, with proper keys, foreign keys, unique constraints, required indexes, referential integrity, appropriate types, defined transaction boundaries, consistent naming and version-controlled migrations. Use PostGIS for geospatial needs. Avoid unnecessary denormalisation. **Redis is never the source of truth** for bookings, payments or financial records. Do not create irreversible migrations without documenting the implications. Model actual requirements, not speculative ones. Keep storage's category data separate from logistics fields.

---

## 13. Non-Functional Requirements (v0.2 section 8, proposed targets for the team to confirm)

| Area | Target |
|---|---|
| Performance | Search and listing pages under 3 seconds on a typical 4G connection for 95 percent of requests. API responses under 500 ms for 95 percent of requests. |
| Availability | 99.5 percent monthly uptime at launch. Planned maintenance outside business hours. |
| Scalability | Designed for 5,000 registered users and 200 concurrent users, with a path to ten times that without redesign. |
| Reliability | Daily backups kept 30 days, restore tested. Lose no more than 24 hours of data. Restore within 4 hours. |
| Auditability | Immutable ledger and audit log for money, verification decisions and admin actions. |
| Observability | Central logs, error tracking, uptime monitoring, alerts for payment failures and webhook errors. |
| Low bandwidth | Pagination, compressed payloads, retry-friendly APIs. |
| Maintainability | Strict TypeScript, automated tests for money, booking and verification logic, continuous integration, documented setup. |
| Compatibility | Web: latest two versions of Chrome, Safari, Edge, Firefox. Mobile: Android 8+ and iOS 15+ (client concern, API must support it). |

---

## 14. Software Development Lifecycle

Follow a controlled, iterative SDLC. Per OD-1 and OD-2, move through phases without waiting for approval between them.

**Phase 1 — Discovery and repository assessment.** Inspect the repository, existing apps, dependencies, configuration, documentation and code. Determine whether it is genuinely empty. Review all requirements documents. Identify missing information, contradictions, technical risks and external dependencies. Do not overwrite existing work without clear justification. Deliver a repository assessment, requirements summary, initial technical risks and implementation plan, **saved under `docs/`**, then continue.

**Phase 2 — System design.** Document architecture, module responsibilities and dependency boundaries, database strategy, API conventions, authentication and authorisation (including the acting-role model), error handling, logging, configuration (including the settings module), testing strategy and deployment considerations. Write ADRs for significant decisions (context, decision, alternatives, consequences, status). Do not treat recommendations as approved requirements.

**Phase 3 — Foundation and scaffolding.** NestJS setup; strict TypeScript; environment configuration and validation; PostgreSQL connection configuration; Prisma initialisation and migration workflow; global validation; consistent response and error conventions; global exception handling; structured logging; versioning at `/api/v1`; Swagger/OpenAPI; health endpoint; basic automated tests; linting and formatting; `.env.example`; `.gitignore`; development documentation; separate development, testing and production configuration. No Docker requirement.

**Phase 4 — API contract management.** See section 15.

**Phase 5 — Implementation.** Incrementally, in dependency order. For each feature: identify requirements, define behaviour, define the API contract, identify data models, define validation and authorisation, implement business logic, implement persistence and migrations, add tests, update API docs, review for security and maintainability. No uncontrolled multi-feature changes.

**Phase 6 — Verification.** Unit tests for business rules, integration tests for database and module interaction, API tests, end-to-end tests for critical workflows, regression tests, and security tests for authentication, authorisation and access control. Cover normal, invalid, boundary and failure cases. **Do not report tests as passing unless they were executed. Do not hide failures, skips or environment limits.**

**Phase 7 — Deployment and operations readiness.** Environment-specific configuration, repeatable migrations, health and readiness checks, structured logs, error-monitoring integration points, secret management, CI pipeline, build and test verification, deployment documentation, backup and recovery notes, migration and rollback procedures. Do not build production infrastructure prematurely. Document what remains.

**Implementation order after the foundation** (one stage at a time, each reported): (1) identity, sessions, roles, permission mechanism, audit and settings; (2) businesses and verification; (3) listings, logistics and discovery; (4) bookings, capacity reservation and the deadline sweeper; (5) payments, ledger and payouts behind the port; (6) delivery and disputes; (7) reviews, reports and notifications; (8) remaining admin endpoints. Storage stays disabled throughout.

---

## 15. API Contract Management

Use RESTful conventions. One API serves web, mobile and admin. Business rules live in the backend only.

**Separate the source proposal, implementation description and reviewed contract status.** These are related but not interchangeable:

1. **Supplied draft:** `OpenAPI-Capacity-draft.json` is an input proposal. Keep it unchanged in `docs/requirements/source/`; review it against the requirements and implementation, but do not treat it as authoritative.
2. **Generated implementation description:** generate the OpenAPI document from the running NestJS application/decorators and export it to `docs/openapi/capacity-api-v1.generated.json`. This describes what the code currently exposes. CI should regenerate it and fail on an unexplained difference from the committed generated artifact.
3. **Reviewed contract baseline:** maintain `docs/openapi/contract-status.md` with the API version, generated artifact revision/commit, review status, reviewer(s), review date, known deviations and outstanding decisions. The generated document becomes the reviewed contract baseline only after the required human/team review is recorded. Generation or a passing CI check alone does not approve product behaviour or contract compatibility.

The URL prefix `/api/v1` is the API major version; it is not the same thing as the draft's `0.1` document revision. Use the API versioning policy for compatibility decisions. For every proposed contract change, identify affected clients, classify it as compatible or breaking, update DTOs/validation/tests and documentation together, and obtain the required review before merging a breaking or behaviour-changing change. Keep the generated artifact in sync with code, and keep approval status explicit. Never describe an unreviewed generated specification as approved.

### 15.1 Review of the supplied OpenAPI draft

**Sound, keep:** integer kobo amounts; required `Idempotency-Key` on bookings, accept, checkout and payout execution; publish behaviour driven by configured policy (O18); cancel without an assumed refund formula (O8); Finance-only payout execution; delivery with no admin override; versioned `/api/v1`.

**Conflicts to correct:**
- Schemas hard-code `const: "NG"` and `"NGN"`. This contradicts D18, LOC-03 and R7. Use configured, validated values.
- `minimumBookingMinor` is a money amount, but LST-11 specifies a minimum **quantity**.
- Requiring `businessId` on booking requests and `email` plus `phone` at registration pre-resolves O9 and part of O24.
- The booking status enum does not map to the lifecycle in 5.3: there is no Settled state, "confirmed" is ambiguous, and Paid, In progress and Completed need clear mapping.
- Verification statuses add `more_information_required` and omit `expired` (KYC-04).
- The listing lacks the maximum declared cargo value (LST-12). Booking lacks the prohibited-goods confirmation and declared type (BKG-12). Booking has no commission or net fields (BKG-04), and there is no quote endpoint.
- The path `/admin/finance/payouts/{id}/execute` lacks the matching approval, dispute-instruction and acting-role concepts.

**Missing coverage:** refresh, logout and revocable sessions (AUTH-04); staff two-factor (AUTH-05); file upload path; settings; admin role management (AUTH-07, ADM-09); second approval; escalation and case reassignment (DSP-06, ADM-10); user restrict and reactivate (AUTH-06); refund execution and failed payout or refund re-initiation (PAY-07); ledger view and reconciliation (PAY-08); logged ID-document viewing; reviews (RAT-01); notifications and push-token registration; listing pause; price filter, sort and geo search (SRC-01 to SRC-03); public configuration read (SITE-02).

---

## 16. Code Quality, Version Control and Documentation

**Quality:** SOLID where appropriate, DRY without needless abstraction, separation of concerns, high cohesion, explicit types, meaningful names, small focused functions, consistent error handling, dependency injection where appropriate. Avoid giant services and controllers, business logic in controllers, duplicated business rules, circular dependencies, unnecessary packages, hard-coded configuration, silent error suppression, unexplained magic values, dead code, and placeholder implementations presented as complete.

**Git.** Preserve any existing workflow. Defaults: keep `main` stable; work on feature branches; make focused commits with meaningful messages; commit locally; do **not** force-push or merge to `main` without human review; never commit secrets, build output or unnecessary generated files. Maintain a useful README.

**Documentation** reflects the actual implementation, not aspiration: project overview, requirements and scope, architecture, module responsibility guide, database design, API documentation, environment setup, development commands, testing, migrations, deployment, security considerations, outstanding decisions, known limitations.

---

## 17. Risk Register (engineering-relevant, v0.3 section 7)

| # | Risk | Engineering response |
|---|---|---|
| R1 | Scope and date clash: mobile in the pilot, storage built, Kenya out | Change control. Storage stays off. |
| R2 | Escrow licensing | Tracked with counsel (OD-5). Never hold funds. |
| R3 | Company and accounts not ready | Use test mode and ports until providers are approved. |
| R6 | Manual verification bottleneck, possibly listing review on one Moderator | Queue ordered by nearest departure, Super Admin cover, automate later. |
| R7 | Two-market complexity | Country configuration, no code branches. |
| R15 | Moderator is a single point of failure | Escalation, cover, review targets. |
| R16 | Finance is a single point of failure | Cover arrangements, threshold, clear financial audit trail. |
| R17 | Listing review timing (O18) | Settings-driven mode, queue by nearest departure. |
| R18 | Live browser capture easier to spoof | Not built. Manual comparison stays. |
| R19 | Persistent sign-in on shared or stolen devices | Revocable sessions, extra code for key actions, staff two-factor. |
| R20 | Name conflict (US LLC registration) | Brand strings kept out of identifiers (O11). |
| R21 | Storage and logistics behave differently | Category-specific data and booking rules on shared parts. |
| R22 | Web and mobile diverge | Rules in the backend, stable API contracts. |
| R23 | Partner lacks delayed settlement, refunds or payout controls | Validate the whole payment lifecycle at the port before integrating. |
| R24 | Simultaneous accepts oversell | Atomic reservation, concurrent-booking tests. |

---

## 18. Working Method and Reporting

Work in small, reviewable stages. For each stage report:

**Objective:** what is built and why.
**Requirements:** which IDs it addresses (use the traceability index).
**Design:** important architectural or technical decisions.
**Changes:** files and components created or modified.
**Verification:** commands and tests executed, with **actual** results.
**Limitations:** anything not verified or blocked.
**Decisions required:** questions for the project team. Raise them, then continue (OD-1).
**Next stage:** the next logical task.

Do not claim completion from code generation alone. Do not silently make broad architectural changes. Do not expand scope because a feature looks convenient. When blocked, explain the specific blocker and offer the smallest safe way forward.

---

## 19. Immediate Assignment: Establish the Backend Foundation

Backend only. Do not build web or mobile clients.

1. Inspect the repository and requirements documents.
2. Confirm the actual repository structure and any existing work.
3. Produce a concise technical assessment and plan, saved under `docs/`, then **continue**.
4. Establish the NestJS modular monolith with the 14 module boundaries.
5. Configure strict TypeScript, environment validation and application configuration.
6. Initialise PostgreSQL and Prisma. Prepare the PostGIS and raw-SQL migration approach.
7. Establish the `/api/v1` REST structure.
8. Configure Swagger/OpenAPI generation and the export step.
9. Create the settings sub-module skeleton, the permission mechanism skeleton with the provisional matrix, the audit skeleton, the provider port interfaces and the production guard against fake adapters.
10. Establish logging, validation, error handling and health checks.
11. Configure linting, formatting and automated testing.
12. Create `.env.example` and setup documentation.
13. Create the decision register, clarification register, owner-decisions record and traceability index.
14. Verify the application builds and starts. Run the available tests and report real results.

Do **not** implement complete authentication, booking, payment, escrow, ledger, dispute or admin workflows in this assignment. Do not select external payment, SMS, email, ID verification, maps or file-storage providers. A live database is not a prerequisite for finishing every scaffold task. If PostgreSQL is unavailable, prepare the integration, state clearly what is untested, and continue with what can be verified.

### Definition of Done

- A clear, documented modular structure with the 14 boundaries; Storage has a distinct module/domain boundary and backend-enforced disabled switch, with no active pilot Storage workflows.
- Builds successfully and starts successfully in the available environment.
- Health endpoint responds correctly. API documentation is accessible.
- Environment variables validated. Prisma and database configuration established.
- Settings skeleton, permission skeleton, audit skeleton and provider ports in place.
- Tests exist and the available suite has been executed with actual results reported.
- Linting and formatting commands work. No secrets committed.
- Setup instructions documented.
- Decision register, clarification register and owner-decisions record exist, listing unresolved decisions and unverified integrations.
- Ready for the next stage in section 14.

---

## Appendix A — v0.3 Change Log Coverage Checklist

Confirm that each v0.3 Appendix A item is reflected in the traceability index: AUTH-01, 02, 04, 05, 06, 07 · KYC-01, 05, 06, 08, 13 · LST-02, 04, 05, 07, 09 · BKG-02, 03, 11, 13 · PAY-01, 02, 04, 05, 07, 08, 10, 13 · TRK-02 · DSP-03, DSP-06 · RPT-01 · ADV-07 · NOT-03 · ADM-02, 03, 04, 05, 06, 09, 10 · LOC-01, 02, 03 · v0.2 sections 2.5, 4.1, 5, 10.1, 12, 13 and 14 (scope rewritten, permission summary replaced by the privilege matrix, modular monolith made explicit, Kenya rows deferred, estimate out of date, risks R1, R6, R7 updated and R15 to R24 added).

## Appendix B — Clarification Register (seed list)

Create `docs/requirements/clarifications.md` with these entries. Record the interim behaviour used, and mark each open until the team answers.

| ID | Issue | Interim behaviour |
|---|---|---|
| C-01 | PAY-04 pays 24 to 48 hours after confirmation, but PAY-02 releases funds only after the dispute window, and O20 is unset. If the window exceeds 48 hours they conflict. | Payout eligible only after confirmation, no open dispute, the dispute window closed (once set), and the delay elapsed. |
| C-02 | Payment-window values are ranges (30 to 60 minutes, up to 24 hours). Band boundaries at exactly 24 and 72 hours are unspecified. | Provisional seeds per section 6. Treat "under 24 hours" as strictly less than 24 hours and "24 to 72 hours" as inclusive. |
| C-03 | A fixed 30-minute response window may exceed the time left before departure for a very short-notice trip, now that the 25 percent cap is gone. | Cap each window so it ends before departure. Register the rule used. |
| C-04 | No rounding rule for 10 percent commission to the kobo. | One documented, consistent rule. |
| C-05 | Whether the v0.2 short-notice label survives BKG-11's replacement. | Not implemented. |
| C-06 | If an accepted booking expires unpaid and capacity is released, auto-declined competing requests are not revived. | Not revived. Requester may submit a new request. |
| C-07 | BKG-12 says above-cap bookings need "admin approval" without naming a role. | Flag the booking. Role to be decided. |
| C-08 | Premium adverts are in the pilot scope but have no module in the v0.3 boundary list. | Not built. Decide placement when O7 resolves. |
| C-09 | Super Admin final authority versus "Cover, with approval" and "cover never skips an approval control". The earlier v2 wording allowed self-approval and conflicted with independent approval. | OD-6 is clarified: Super Admin retains final administrative authority, but no actor may approve their own high-risk financial execution or replace an independent second approver. If a distinct authorised approver is unavailable, the action remains pending. Log blocked conflicts; never mark a completed action `self_approved`. Update the source specification's approval/cover language. |
| C-10 | KYC-05 and O15: when customers must be approved. | Configurable checkpoint, v0.2 baseline. |
| C-11 | KYC-04 includes `expired`. The API draft has `more_information_required` and no `expired`. | Follow KYC-04. Add the extra state only if the team approves. |
| C-12 | Booking lifecycle (5.3) includes Settled. The API draft status enum does not. | Follow 5.3. |
| C-13 | The v0.3 permission matrix is a working draft that must be completed before development. | Build data-driven, mark provisional. |
| C-14 | Registration fields: API draft requires both email and phone. v0.2 AUTH-02 made email optional. O24 is open. | Phone required, email optional. |
| C-15 | O22: bookings on a taken-down listing. | Block new requests. No auto-cancellation. No history deleted. |
| C-16 | Whether customers need the same checks as providers, and whether business verification applies to every customer (O15). | Not enforced beyond the interim checkpoint. |
| C-17 | Who may book: business only or sole traders (O9). | Model flexible. |
| C-18 | Provisional seed values (payment windows, buffer, payout delay) are not agreed numbers. | Register each seed as provisional. Replace on decision. |
| C-19 | Whether the source documents carry restrictions on sharing outside the team (marked confidential). | Private repository only. |
| C-20 | The brief refers to provisional customer-payment-window seeds and a buffer, but the prior clarification register did not define how their status is governed. | Record every seed, buffer and effective date as `provisional` in the database-backed settings metadata. Do not treat it as approved or execute a workflow that must fail closed until the required value/policy is approved. |
| C-21 | D35/O26 uses account closure as a possible trigger for ID-document deletion, but account lifecycle, personal-data erasure, financial-record retention, verification-document retention and legal holds are not the same policy. | Do not implement blanket deletion or automatic ID-document deletion. Keep retention metadata and legal-hold support; wait for a documented, legally reviewed retention schedule before implementing deletion/anonymisation workflows. |
| C-22 | Code-generated OpenAPI output could be mistaken for an approved API contract, and `/api/v1` is distinct from the draft's `0.1` document revision. | Keep the supplied draft immutable, generate a versioned implementation description from code, and record human review/approval status separately. CI verifies generation consistency, not product approval. |


---

## Version 3 Change Notes

Version 3 preserves the v2 baseline and makes the following controlled clarifications: (1) independent human approval is required for high-risk financial actions; self-approval is not a successful approval path; (2) database-backed settings carry explicit status and audit/effective-version metadata; (3) Storage is only a distinct, disabled module/domain boundary in the pilot, with server-side enforcement and no active workflows; (4) generated OpenAPI output documents implementation but does not itself approve the API contract; (5) account lifecycle, personal-data erasure, financial retention, verification-document retention and legal holds are treated separately; and (6) critical concurrency, background-job, role-authority, immutability, webhook, upload and migration controls are made explicit. The clarifications do not resolve the outstanding product decisions or convert the draft requirements baseline into a formally approved specification.
