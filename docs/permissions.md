# TrackPro — Permissions (STEP 4 baseline)

**Date:** 2026-11-16  
**Status:** Draft

## Format
Permissions are strings in `module.action` form, e.g. `shipments.create`, `cod.collect`, `finance.approve`. Stored in `permissions` table and linked to roles via `role_permissions`.

## Initial permission catalog
- `shipments.view`, `shipments.create`, `shipments.update`, `shipments.cancel`, `shipments.assign`, `shipments.deliver`, `shipments.return`, `shipments.print`
- `customers.view`, `customers.create`, `customers.update`, `customers.delete`
- `branches.view`, `branches.create`, `branches.manage`
- `cod.view`, `cod.collect`, `cod.reconcile`, `cod.settle`, `cod.approve`
- `finance.view`, `finance.create`, `finance.approve`
- `reports.view`, `reports.export`
- `users.manage`, `roles.manage`, `settings.manage`
- `merchants.view`, `merchants.manage`
- `warehouse.view`, `warehouse.manage`
- `fleet.view`, `fleet.manage`
- `drivers.view`, `drivers.manage`
- `audit.view`

## Initial roles
1. `platform_super_admin` — platform-level (tenant_id null), all permissions across tenants for support/audit with documented reason.
2. `organization_owner` — owns the organization, manages subscription, branches, users.
3. `company_admin` — full ops within tenant.
4. `operations_manager`
5. `branch_manager` — branch-scoped.
6. `hub_manager` — hub-scoped.
7. `dispatcher`
8. `pickup_supervisor`
9. `delivery_supervisor`
10. `courier` / `driver`
11. `customer_service_agent`
12. `finance_manager`
13. `accountant`
14. `cashier`
15. `warehouse_manager`
16. `sales_manager`
17. `hr_manager`
18. `auditor`
19. `merchant_user` — merchant portal only, own data.
20. `read_only_user`

## Enforcement rules
- Check permissions inside Server Actions, Route Handlers, and service/repository methods.
- UI hides actions lacking permission; never treats UI hiding as authorization.
- Branch-scoped users can act only on branches in `user_branch_access`.
- Super Admin cross-tenant access requires documented reason + audit log entry.
