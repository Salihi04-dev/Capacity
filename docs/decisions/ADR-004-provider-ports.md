# ADR-004: External Provider Ports

- Status: Accepted
- Context: No payment, SMS, email, push, maps/geocoding or private-file provider is selected.
- Decision: Define provider ports and keep vendor SDKs out of domain code. Fakes are restricted to development and test; startup rejects fake/memory adapters in production.
- Consequences: Provider selection requires an explicit decision and lifecycle capability review before implementation.
