# Outstanding Decisions Register

All items below remain open unless explicitly stated. Interim behaviour follows Engineering Brief v3 section 8. Do not silently resolve them in code.

| ID | Topic | Interim behaviour / implementation consequence | Modules |
|---|---|---|---|
| O3 | Launch date | No dependency. | — |
| O4 | Team size and roles | No dependency. | — |
| O5 | Payment partner | No provider selected; define port only. | Payments, Ledger |
| O6 | ID verification provider | Manual only. | Verification |
| O7 | Advert pricing/slots/order/beta switch | Not built; premium adverts module placement unresolved (C-08). | Listings, Discovery |
| O8 | Cancellation refunds/payout timing | Cancellation request only; no refund formula. | Bookings, Payments |
| O9 | Eligible booking actor | Keep actor model flexible; no business-only assumption. | Bookings, Businesses |
| O10 | Operating entity/ownership | No dependency. | — |
| O11 | Product name | Keep brand strings out of identifiers. | All |
| O12 | Named launch routes | Seed only when supplied. | Listings |
| O13 | Gateway fees/cancelled commission | Follow v0.2 interim proposal; separate gateway-fee entries. | Ledger |
| O14 | Cargo value cap/prohibited goods | Cap unset; record declaration; above-cap approval role unresolved. | Bookings |
| O15 | Customer verification | Configurable checkpoint; do not hard-code final customer policy. | Verification, Bookings |
| O17 | Pricing basis | Unit price, optional minimum quantity and optional whole-asset price proposal. | Listings, Bookings |
| O18 | Listing approval timing | Configurable moderation mode; interim first-publish review. | Listings, Admin |
| O19 | Second-approval threshold | Unset; fail closed so all payouts/refunds/dispute outcomes require Super Admin approval. | Payouts, Disputes |
| O20 | Dispute window | Unset; payouts not eligible until set and closed. | Disputes, Payouts |
| O21 | Storage response time | Unset; Storage disabled. | Storage |
| O22 | Taken-down listing with bookings | Block new requests; no automatic cancellation or history deletion. | Listings, Bookings |
| O23 | Routine payout mode | Manual, one by one, Finance. | Payouts |
| O24 | Sign-in/OTP rules | Phone required and OTP verified; email optional; step-up action list empty until decided. | Auth |
| O25 | Working hours/review targets | No SLA enforcement; order queues by nearest departure. | Admin |
| O26 | ID retention | No deletion workflow; preserve legal-hold/retention metadata and seek legal review. | Verification, Auth, Ledger |
| O27 | Nigerian payment methods | Depends on O5. | Payments |
| O28 | ID capture/accepted documents | Private upload port; no live capture; accepted IDs configurable. | Verification |
