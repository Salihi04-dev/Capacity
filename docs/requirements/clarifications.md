# Clarification Register

| ID | Issue | Interim behaviour | Status |
|---|---|---|---|
| C-01 | Payout delay may conflict with dispute window. | Eligible only after confirmation, no dispute, dispute window closed, and delay elapsed. | Open |
| C-02 | 24/72-hour boundaries and payment ranges. | Under 24h is strictly less than 24h; 24–72h inclusive. Payment-window seeds provisional. | Open |
| C-03 | Fixed 30-minute response may exceed time to departure. | Cap window so it ends before departure; register rule. | Open |
| C-04 | Commission rounding to kobo unspecified. | Document one consistent rule before implementing calculation. | Open |
| C-05 | Short-notice label after BKG-11 replacement. | Not implemented. | Open |
| C-06 | Auto-declined competing requests not revived after expiry. | Not revived; requester may submit a new request. | Open |
| C-07 | Above-cap cargo approval role unspecified. | Flag; do not invent approver. | Open |
| C-08 | Premium adverts lack a module boundary. | Not built; placement decision required. | Open |
| C-09 | Super Admin cover vs independent financial approval. | Distinct human approver; self-approval blocked and audited. | Open |
| C-10 | Customer verification checkpoint. | Configurable; baseline proposal only. | Open |
| C-11 | KYC status `expired` vs API draft enum. | Follow KYC-04; no extra state without approval. | Open |
| C-12 | Booking lifecycle includes Settled but draft omits it. | Follow lifecycle; contract review pending draft. | Open |
| C-13 | Permission matrix is a working draft. | Data-driven and explicitly provisional. | Open |
| C-14 | Registration email optional vs draft requires email. | Phone required, email optional. | Open |
| C-15 | Taken-down listing with existing bookings. | Block new requests; no auto-cancel or history deletion. | Open |
| C-16 | Customer verification scope/business verification. | Do not enforce beyond interim checkpoint. | Open |
| C-17 | Business-only vs sole-trader booking. | Flexible actor model. | Open |
| C-18 | Payment window/buffer/payout seeds provisional. | Store provisional status, never approve implicitly. | Open |
| C-19 | Confidentiality restrictions. | Private repository only. | Open |
| C-20 | Provisional seeds governance. | Persist status, source, effective date and version; fail closed where required. | Open |
| C-21 | Account closure vs deletion/retention/legal hold. | No blanket deletion; distinct policies and legal-hold metadata. | Open |
| C-22 | Generated OpenAPI could be mistaken for approved contract. | Separate generated artifact from reviewed approval status; `/api/v1` is not draft revision 0.1. | Open |
