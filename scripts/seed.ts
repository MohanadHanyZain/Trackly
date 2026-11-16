// Seed script for TrackPro
// This script populates the database with initial data

import { db } from './db/index';
import {
  tenants,
  organizations,
  roles,
  permissions,
  role_permissions,
  users,
  user_profiles,
  branches,
  memberships,
} from './db/schema';

async function seed() {
  console.log('Seeding database...');

  // 1. Create permissions
  const permissionData = [
    { key: 'shipments.view', description: 'عرض الشحنات', module: 'shipments' },
    { key: 'shipments.create', description: 'إنشاء الشحنات', module: 'shipments' },
    { key: 'shipments.update', description: 'تعديل الشحنات', module: 'shipments' },
    { key: 'shipments.cancel', description: 'إلغاء الشحنات', module: 'shipments' },
    { key: 'shipments.assign', description: 'تكوين الشحنة', module: 'shipments' },
    { key: 'shipments.deliver', description: 'تأكيد التسليم', module: 'shipments' },
    { key: 'shipments.return', description: 'قبول المرتجعات', module: 'shipments' },
    { key: 'customers.view', description: 'عرض العملاء', module: 'customers' },
    { key: 'customers.create', description: 'إنشاء العملاء', module: 'customers' },
    { key: 'customers.update', description: 'تعديل العملاء', module: 'customers' },
    { key: 'customers.delete', description: 'حذف العملاء', module: 'customers' },
    { key: 'cod.view', description: 'عرض عملية التحصيل', module: 'cod' },
    { key: 'cod.collect', description: 'تحصيل النقد', module: 'cod' },
    { key: 'cod.reconcile', description: 'تسوية عملية التحصيل', module: 'cod' },
    { key: 'cod.settle', description: 'إغلاق التسوية', module: 'cod' },
    { key: 'cod.approve', description: 'اعتماد التسوية', module: 'cod' },
    { key: 'finance.view', description: 'عرض المالية', module: 'finance' },
    { key: 'finance.create', description: 'إنشاء المعاملات المالية', module: 'finance' },
    { key: 'finance.approve', description: 'اعتماد المعاملات', module: 'finance' },
    { key: 'branches.view', description: 'عرض الفروع', module: 'branches' },
    { key: 'branches.create', description: 'إنشاء الفروع', module: 'branches' },
    { key: 'branches.manage', description: 'إدارة الفروع', module: 'branches' },
    { key: 'reports.view', description: 'عرض التقارير', module: 'reports' },
    { key: 'reports.export', description: 'تصدير التقارير', module: 'reports' },
    { key: 'users.manage', description: 'إدارة المستخدمين', module: 'users' },
    { key: 'roles.manage', description: 'إدارة الأدوار', module: 'roles' },
    { key: 'settings.manage', description: 'إدارة الإعدادات', module: 'settings' },
  ];

  for (const perm of permissionData) {
    await db.insert(permissions).values(perm).onConflictDoNothing();
  }

  // 2. Create roles
  const roleData = [
    { name: 'Super Admin', key: 'super_admin', tenant_id: null, description: 'مدير النظام الكامل', is_system: true },
    { name: 'Tenant Admin', key: 'tenant_admin', tenant_id: null, description: 'مدير الشركة', is_system: true },
    { name: 'Branch Manager', key: 'branch_manager', tenant_id: null, description: 'مدير الفرع', is_system: true },
    { name: 'Operations Manager', key: 'operations_manager', tenant_id: null, description: 'مدير العمليات', is_system: true },
    { name: 'Finance Manager', key: 'finance_manager', tenant_id: null, description: 'مدير المالية', is_system: true },
    { name: 'Sales Manager', key: 'sales_manager', tenant_id: null, description: 'مدير المبيعات', is_system: true },
    { name: 'Warehouse Manager', key: 'warehouse_manager', tenant_id: null, description: 'مدير المخزن', is_system: true },
    { name: 'Courier', key: 'courier', tenant_id: null, description: 'السائق', is_system: true },
    { name: 'Customer', key: 'customer', tenant_id: null, description: 'عميل', is_system: true },
  ];

  for (const role of roleData) {
    await db.insert(roles).values(role).onConflictDoNothing();
  }

  // 3. Create tenant and organization for the first user
  const tenant = await db.insert(tenants).values({
    name: 'شركة النيل للشحن',
    slug: 'nile-logistics',
    domain: 'trackpro.local',
    settings: {},
    status: 'active',
  }).returning();

  const org = await db.insert(organizations).values({
    tenant_id: tenant[0].id,
    name: 'شركة النيل للشحن',
    legal_name: 'شركة النيل للشحن ذات المسؤولية المحدودة',
    tax_id: '123456789',
    status: 'active',
  }).returning();

  // 4. Create a branch for the organization
  const branch = await db.insert(branches).values({
    tenant_id: tenant[0].id,
    organization_id: org[0].id,
    name: 'الفرع الرئيسي',
    code: 'HQ',
    address: '123 Main Street, Cairo',
    governorate: 'Cairo',
    city: 'Cairo',
    status: 'active',
  }).returning();

  // 5. Get all permissions
  const allPermissions = await db.select().from(permissions);

  // 6. Assign permissions to roles
  for (const role of roleData) {
    const rolePerms = allPermissions.filter((p) => {
      if (role.key === 'super_admin') return true;
      if (role.key === 'tenant_admin') return ['shipments.view', 'shipments.create', 'shipments.update', 'shipments.assign', 'customers.view', 'customers.create', 'cod.view', 'cod.collect', 'finance.view', 'reports.view'].includes(p.key);
      if (role.key === 'branch_manager') return ['shipments.view', 'shipments.update', 'shipments.assign', 'customers.view', 'cod.view', 'finance.view'].includes(p.key);
      if (role.key === 'operations_manager') return ['shipments.view', 'shipments.update', 'customers.view', 'cod.view', 'finance.view', 'reports.view'].includes(p.key);
      if (role.key === 'finance_manager') return ['cod.view', 'cod.settle', 'finance.view', 'finance.create'].includes(p.key);
      if (role.key === 'sales_manager') return ['customers.view', 'customers.create', 'reports.view'].includes(p.key);
      if (role.key === 'warehouse_manager') return ['shipments.view', 'customers.view'].includes(p.key);
      if (role.key === 'courier') return ['shipments.view'].includes(p.key);
      if (role.key === 'customer') return ['shipments.view', 'customers.view'].includes(p.key);
      return false;
    });

    for (const perm of rolePerms) {
      await db.insert(role_permissions).values({
        role_id: role.id || '00000000-0000-0000-0000-000000000000',
        permission_id: perm.id,
      }).onConflictDoNothing();
    }
  }

  // 7. Create a super admin user
  const superAdminRole = await db.select().from(roles).where(eq(roles.key, 'super_admin'));

  const authUser = await db.insert(users).values({
    name: 'Super Administrator',
    email: 'admin@trackpro.local',
    email_verified: new Date(),
    password: '$2a$10$somehashedpassword',
    created_at: new Date(),
    updated_at: new Date(),
  }).returning();

  // Create user profile
  await db.insert(user_profiles).values({
    auth_user_id: authUser[0].id,
    full_name: 'Super Administrator',
    phone: '+20 123 456 7890',
    language: 'ar',
    timezone: 'Africa/Cairo',
  });

  // Create memberships
  await db.insert(memberships).values({
    user_id: authUser[0].id,
    tenant_id: tenant[0].id,
    role_id: superAdminRole[0].id,
    status: 'active',
    joined_at: new Date(),
  });

  // 8. Create a regular user (customer)
  const customerRole = await db.select().from(roles).where(eq(roles.key, 'customer'));
  const customerOrg = await db.insert(organizations).values({
    tenant_id: tenant[0].id,
    name: 'عميل النيل للشحن',
    legal_name: 'عميل النيل للشحن',
    tax_id: '987654321',
    status: 'active',
  }).returning();

  const customerAuthUser = await db.insert(users).values({
    name: 'عميل عادي',
    email: 'customer@trackpro.local',
    email_verified: new Date(),
    password: '$2a$10$somehashedpassword',
    created_at: new Date(),
    updated_at: new Date(),
  }).returning();

  await db.insert(user_profiles).values({
    auth_user_id: customerAuthUser[0].id,
    full_name: 'عميل عادي',
    phone: '+20 123 456 7890',
    language: 'ar',
    timezone: 'Africa/Cairo',
  });

  await db.insert(memberships).values({
    user_id: customerAuthUser[0].id,
    tenant_id: tenant[0].id,
    organization_id: customerOrg[0].id,
    role_id: customerRole[0].id,
    status: 'active',
    joined_at: new Date(),
  });

  console.log('Database seeded successfully!');
  console.log('\nDefault credentials:');
  console.log('Admin Email: admin@trackpro.local');
  console.log('Admin Password: admin123');
  console.log('Customer Email: customer@trackpro.local');
  console.log('Customer Password: customer123');
}

seed().catch((error) => {
  console.error('Error seeding database:', error);
  process.exit(1);
});
