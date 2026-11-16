# TrackPro — Business Rules (STEP 3 baseline)

**Date:** 2026-11-16  
**Status:** Draft — MVP scope

## Shipment lifecycle
Allowed status flow (draft → created → pickup_requested → assigned_for_pickup → picked_up → received_at_origin_branch → sorted → in_transit → received_at_destination_branch → assigned_for_delivery → out_for_delivery → delivered).

Exceptions: pickup_failed, delivery_failed, recipient_unavailable, recipient_refused, wrong_address, address_incomplete, delayed, damaged, lost, on_hold, cancelled, return_requested, returning_to_origin, returned.

Transition rules:
- A shipment cannot be marked delivered before `assigned_for_delivery` / `out_for_delivery`.
- A shipment cannot be cancelled after `out_for_delivery` without special override privilege.
- A shipment cannot be returned before physical receipt at origin branch.
- Every status change writes an immutable row to `shipment_status_events`; the events table is append-only.
- Price charged at creation time is snapshotted on the shipment; later contract/price changes do not alter historical shipments.

## Tracking numbers
- Format: `TP-YYYY-NNNNNN` per tenant (padding 6).
- Generated from `tenant_sequences` inside a transaction; unique constraint on `tracking_number`.
- Never `COUNT(*) + 1`; never reusable; never changed after creation.

## Money & finance
- All monetary values stored as `numeric` with currency (`EGP` default).
- COD required amount ≠ collected amount ≠ handed-over amount ≠ settled amount ≠ paid amount. Each stage has its own record.
- A shipment can appear in at most one paid settlement (unique constraint + application check).
- Cash handover: expected amount computed server-side; actual amount recorded by cashier; difference recorded with reason and requires approval per role.
- Financial records soft-delete only; corrections via reversal entries; no direct edits to approved entries.
- No floating-point for money anywhere.

## Tenancy
- Every business table carries `tenant_id`.
- Tenant context derived only from authenticated session membership; client-supplied `tenant_id` ignored/rejected.
- Composite foreign keys `(tenant_id, id)` prevent linking records across tenants.
- UI hides other tenants' data; enforcement happens in server actions, route handlers, and repositories.

## RBAC
- Permissions checked server-side in every mutation and sensitive read.
- Role assignment: user → tenant → role → permissions; optional branch-scoped access.
- UI visibility follows permissions but is never the sole enforcement.

## UX / localization
- Arabic default, RTL for Arabic, LTR for English.
- Egyptian phone format, EGP currency, Cairo timezone for display.
- No mock data in production; empty/loading/error states required.
- Rate-limited public tracking page; no sensitive financial or courier data exposed.

## Integrations
- Unwired integrations are presented as adapters with clear configuration variables; never claimed connected without implementation and tests.
