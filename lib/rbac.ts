import { db } from '../db/index';
import { roles, permissions, role_permissions, memberships } from '../db/schema';
import { eq, and } from 'drizzle-orm';

export type Permission = string;

export const ALL_PERMISSIONS: Record<string, Permission[]> = {
  shipments: ['shipments.view', 'shipments.create', 'shipments.update', 'shipments.cancel', 'shipments.assign', 'shipments.deliver', 'shipments.return'],
  customers: ['customers.view', 'customers.create', 'customers.update', 'customers.delete'],
  cod: ['cod.view', 'cod.collect', 'cod.reconcile', 'cod.settle', 'cod.approve'],
  finance: ['finance.view', 'finance.create', 'finance.approve'],
  branches: ['branches.view', 'branches.create', 'branches.manage'],
  reports: ['reports.view', 'reports.export'],
  users: ['users.manage'],
  roles: ['roles.manage'],
  settings: ['settings.manage'],
};

export function flattenPermissions(): Permission[] {
  return Object.values(ALL_PERMISSIONS).flat();
}

export interface UserContext {
  userId: string;
  tenantId: string;
  organizationId: string | null;
  branchId: string | null;
  roleIds: string[];
  permissions: Permission[];
  branches: string[];
}

export async function getUserContext(userId: string): Promise<UserContext | null> {
  const userMemberships = await db
    .select()
    .from(memberships)
    .where(eq(memberships.user_id, userId));

  if (userMemberships.length === 0) return null;

  const membership = userMemberships[0];

  const userRoles = await db
    .select({ id: roles.id, name: roles.name })
    .from(roles)
    .where(eq(roles.id, membership.role_id || '00000000-0000-0000-0000-000000000000'));

  const roleIds = userRoles.map((r) => r.id);
  const rolePerms = await db
    .select({ permissionId: rolePermissions.permission_id, roleId: rolePermissions.role_id })
    .from(rolePermissions)
    .where(and(...roleIds.map((id) => eq(rolePermissions.role_id, id))));

  const permIds = rolePerms.map((rp) => rp.permissionId);
  const permissionRows = permIds.length > 0
    ? await db.select().from(permissions).where(and(...permIds.map((id) => eq(permissions.id, id))))
    : [];

  const permissionSet = new Set<string>();
  permissionRows.forEach((p) => permissionSet.add(p.key));

  return {
    userId,
    tenantId: membership.tenant_id,
    organizationId: null,
    branchId: membership.branch_id || null,
    roleIds,
    permissions: Array.from(permissionSet),
    branches: [membership.branch_id].filter(Boolean) as string[],
  };
}

export function hasPermission(ctx: UserContext | null, permission: Permission): boolean {
  if (!ctx) return false;
  return ctx.permissions.includes(permission);
}

export function hasAnyPermission(ctx: UserContext | null, permissions: Permission[]): boolean {
  if (!ctx) return false;
  return permissions.some((p) => ctx.permissions.includes(p));
}

export function hasAllPermissions(ctx: UserContext | null, permissions: Permission[]): boolean {
  if (!ctx) return false;
  return permissions.every((p) => ctx.permissions.includes(p));
}

export function canAccessBranch(ctx: UserContext | null, branchId: string): boolean {
  if (!ctx) return false;
  return ctx.branches.includes(branchId);
}
