# ADR-003: Versioned Runtime Settings and Policy Snapshots

- Status: Accepted as an implementation strategy; individual business values remain provisional/unresolved.
- Context: Super Admin-editable settings must take effect without redeployment, while historical bookings must preserve the terms that governed them.
- Decision: Store immutable setting versions with status, effective time, actor, reason and approval metadata. Future booking implementation must snapshot relevant version IDs and computed terms on the booking.
- Consequences: Do not treat provisional or unset values as approved. Workflows that require unset policies fail closed. No business setting is compiled into application code as policy.
