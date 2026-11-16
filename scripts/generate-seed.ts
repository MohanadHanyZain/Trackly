import { db } from '../db/index';
import { roles, permissions, role_permissions, tenants, organizations, branches, user_profiles, memberships, users, user_branch_access } from '../db/schema';

export async function generateSeed() {
  // Get existing data to reference in generated SQL
  const existingTenants = await db.select().from(tenants).limit(1);
  const existingOrgs = await db.select().from(organizations).limit(1);

  console.log('// Generated seed SQL for TrackPro');
  console.log('// This creates sample data for the application');
  console.log('// Run: npx ts-node scripts/generate-seed.ts\n');

  console.log('-- Tenants');
  if (existingTenants.length) {
    const t = existingTenants[0];
    console.log(`INSERT INTO tenants (id, name, slug, domain, settings, status, created_at) VALUES ('${t.id}', '${t.name}', '${t.slug}', '${t.domain}', '${JSON.stringify(t.settings)}', '${t.status}', '${t.created_at.toISOString()}');`);
  }

  console.log('-- Organizations');
  if (existingOrgs.length) {
    const org = existingOrgs[0];
    console.log(`INSERT INTO organizations (id, tenant_id, name, legal_name, tax_id, commercial_register, address, governorate, city, phone, email, status, created_at) VALUES ('${org.id}', '${org.tenant_id}', '${org.name}', '${org.legal_name}', '${org.tax_id}', '${org.commercial_register}', '${org.address}', '${org.governorate}', '${org.city}', '${org.phone}', '${org.email}', '${org.status}', '${org.created_at.toISOString()}');`);
  }

  console.log('-- Roles');
  const roles = await db.select().from(roles);
  for (const role of roles) {
    console.log(`INSERT INTO roles (id, tenant_id, name, key, description, is_system, created_at) VALUES ('${role.id}', '${role.tenant_id}', '${role.name}', '${role.key}', '${role.description}', ${role.is_system}, '${role.created_at.toISOString()}');`);
  }

  console.log('-- Permissions');
  const perms = await db.select().from(permissions);
  for (const perm of perms) {
    console.log(`INSERT INTO permissions (id, key, description, module, created_at) VALUES ('${perm.id}', '${perm.key}', '${perm.description}', '${perm.module}', '${perm.created_at.toISOString()}');`);
  }

  console.log('-- Users');
  const users = await db.select().from(users);
  for (const user of users) {
    console.log(`INSERT INTO users (id, name, email, email_verified, image, password, created_at, updated_at) VALUES ('${user.id}', '${user.name}', '${user.email}', '${user.email_verified ? user.email_verified.toISOString() : 'NULL'}', ${user.image ? `'${user.image}'` : 'NULL'}, '${user.password}', '${user.created_at.toISOString()}', '${user.updated_at.toISOString()}');`);
  }

  console.log('-- User Profiles');
  const profiles = await db.select().from(user_profiles);
  for (const profile of profiles) {
    console.log(`INSERT INTO user_profiles (id, auth_user_id, full_name, avatar_url, phone, language, timezone, created_at, updated_at) VALUES ('${profile.id}', '${profile.auth_user_id}', '${profile.full_name}', ${profile.avatar_url ? `'${profile.avatar_url}'` : 'NULL'}, '${profile.phone}', '${profile.language}', '${profile.timezone}', '${profile.created_at.toISOString()}', '${profile.updated_at.toISOString()}');`);
  }

  console.log('-- Memberships');
  const memberships = await db.select().from(memberships);
  for (const mem of memberships) {
    console.log(`INSERT INTO memberships (id, user_id, tenant_id, role_id, status, joined_at) VALUES ('${mem.id}', '${mem.user_id}', '${mem.tenant_id}', ${mem.role_id ? `'${mem.role_id}'` : 'NULL'}, '${mem.status}', '${mem.joined_at.toISOString()}');`);
  }

  console.log('-- Branches');
  const branches = await db.select().from(branches);
  for (const branch of branches) {
    console.log(`INSERT INTO branches (id, tenant_id, organization_id, name, code, address, governorate, city, phone, email, status, created_at) VALUES ('${branch.id}', '${branch.tenant_id}', ${branch.organization_id ? `'${branch.organization_id}'` : 'NULL'}, '${branch.name}', '${branch.code}', '${branch.address}', '${branch.governorate}', '${branch.city}', '${branch.phone}', '${branch.email}', '${branch.status}', '${branch.created_at.toISOString()}');`);
  }

  console.log('-- User Branch Access');
  const ubAccess = await db.select().from(user_branch_access);
  for (const ub of ubAccess) {
    console.log(`INSERT INTO user_branch_access (user_id, branch_id) VALUES ('${ub.user_id}', '${ub.branch_id}');`);
  }

  console.log('\n-- Notes:');
  console.log('-- Generate these SQL statements to insert sample data');
  console.log('-- Execute them in your PostgreSQL database');
}
