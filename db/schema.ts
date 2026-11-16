import {
  pgTable,
  uuid,
  text,
  numeric,
  timestamp,
  boolean,
  jsonb,
  primaryKey,
  serial,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

// ---------- Helpers ----------
const id = () => uuid('id').primaryKey().defaultRandom();
const createdAt = () => timestamp('created_at', { mode: 'date' }).defaultNow();
const updatedAt = () => timestamp('updated_at', { mode: 'date' }).defaultNow().$onUpdateFn(() => new Date());

// ---------- Better Auth (Auth) Tables ----------
export const user = pgTable('user', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name'),
  email: text('email').notNull().unique(),
  email_verified: timestamp('email_verified', { mode: 'date' }),
  image: text('image'),
  password: text('password'),
  created_at: createdAt(),
  updated_at: updatedAt(),
});

export const session = pgTable('session', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').notNull(),
  expires_at: timestamp('expires_at', { mode: 'date' }).notNull(),
  created_at: createdAt(),
  updated_at: updatedAt(),
});

export const account = pgTable('account', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').notNull(),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  provider_account_id: text('provider_account_id').notNull(),
  access_token: text('access_token'),
  refresh_token: text('refresh_token'),
  created_at: createdAt(),
  updated_at: updatedAt(),
});

export const verification = pgTable('verification', {
  id: uuid('id').primaryKey().defaultRandom(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expires_at: timestamp('expires_at', { mode: 'date' }).notNull(),
  created_at: createdAt(),
});

// ---------- Tenants ----------
export const tenants = pgTable('tenants', {
  id: id(),
  name: text('name').notNull(),
  slug: text('slug').unique().notNull(),
  domain: text('domain'),
  settings: jsonb('settings').default('{}').notNull(),
  status: text('status').default('active').notNull(),
  created_at: createdAt(),
  updated_at: updatedAt(),
});

// ---------- Organizations ----------
export const organizations = pgTable('organizations', {
  id: id(),
  tenant_id: uuid('tenant_id').notNull(),
  name: text('name').notNull(),
  legal_name: text('legal_name'),
  tax_id: text('tax_id'),
  commercial_register: text('commercial_register'),
  address: text('address'),
  governorate: text('governorate'),
  city: text('city'),
  phone: text('phone'),
  email: text('email'),
  status: text('status').default('active').notNull(),
  created_at: createdAt(),
  updated_at: updatedAt(),
});

// ---------- Branches ----------
export const branches = pgTable('branches', {
  id: id(),
  tenant_id: uuid('tenant_id').notNull(),
  organization_id: uuid('organization_id'),
  name: text('name').notNull(),
  code: text('code').notNull(),
  address: text('address'),
  governorate: text('governorate'),
  city: text('city'),
  phone: text('phone'),
  email: text('email'),
  working_hours: jsonb('working_hours').default('{}').notNull(),
  status: text('status').default('active').notNull(),
  created_at: createdAt(),
  updated_at: updatedAt(),
});

// ---------- Hubs ----------
export const hubs = pgTable('hubs', {
  id: id(),
  tenant_id: uuid('tenant_id').notNull(),
  name: text('name').notNull(),
  code: text('code').notNull(),
  address: text('address'),
  phone: text('phone'),
  status: text('status').default('active').notNull(),
  created_at: createdAt(),
  updated_at: updatedAt(),
});

// ---------- User Profiles ----------
export const user_profiles = pgTable('user_profiles', {
  id: id(),
  auth_user_id: uuid('auth_user_id').unique().notNull(),
  full_name: text('full_name'),
  avatar_url: text('avatar_url'),
  phone: text('phone'),
  language: text('language').default('ar').notNull(),
  timezone: text('timezone').default('Africa/Cairo').notNull(),
  created_at: createdAt(),
  updated_at: updatedAt(),
});

// ---------- Roles ----------
export const roles = pgTable('roles', {
  id: id(),
  tenant_id: uuid('tenant_id'),
  name: text('name').notNull(),
  key: text('key').notNull(),
  description: text('description'),
  is_system: boolean('is_system').default(false).notNull(),
  created_at: createdAt(),
});

// ---------- Permissions ----------
export const permissions = pgTable('permissions', {
  id: id(),
  key: text('key').unique().notNull(),
  description: text('description'),
  module: text('module'),
  created_at: createdAt(),
});

// ---------- Role Permissions ----------
export const role_permissions = pgTable('role_permissions', {
  role_id: uuid('role_id').notNull(),
  permission_id: uuid('permission_id').notNull(),
}, (t) => ({
  pk: primaryKey({ columns: [t.role_id, t.permission_id] }),
}));

// ---------- Memberships ----------
export const memberships = pgTable('memberships', {
  id: id(),
  user_id: uuid('user_id').notNull(),
  tenant_id: uuid('tenant_id').notNull(),
  role_id: uuid('role_id').references(() => roles.id),
  status: text('status').default('active').notNull(),
  joined_at: timestamp('joined_at', { mode: 'date' }).defaultNow().notNull(),
}, (t) => ({
  uniqueUserTenant: sql`unique (${t.user_id}, ${t.tenant_id})`,
}));

// ---------- User branch access ----------
export const user_branch_access = pgTable('user_branch_access', {
  user_id: uuid('user_id').notNull(),
  branch_id: uuid('branch_id').notNull(),
}, (t) => ({
  pk: primaryKey({ columns: [t.user_id, t.branch_id] }),
}));

// ---------- Tenant settings ----------
export const tenant_settings = pgTable('tenant_settings', {
  tenant_id: uuid('tenant_id').primaryKey().references(() => tenants.id),
  settings: jsonb('settings').default('{}').notNull(),
  updated_at: updatedAt(),
});

// ---------- Tenant domains ----------
export const tenant_domains = pgTable('tenant_domains', {
  id: id(),
  tenant_id: uuid('tenant_id').notNull(),
  domain: text('domain').unique().notNull(),
  is_primary: boolean('is_primary').default(false).notNull(),
});

// ---------- Tenant features ----------
export const tenant_features = pgTable('tenant_features', {
  id: id(),
  tenant_id: uuid('tenant_id').notNull(),
  feature_key: text('feature_key').notNull(),
  enabled: boolean('enabled').default(false).notNull(),
}, (t) => ({
  uniqueTenantFeature: sql`unique (${t.tenant_id}, ${t.feature_key})`,
}));

// ---------- Tenant sequences ----------
export const tenant_sequences = pgTable('tenant_sequences', {
  id: id(),
  tenant_id: uuid('tenant_id').notNull(),
  entity: text('entity').notNull(),
  prefix: text('prefix').notNull(),
  last_value: numeric('last_value').default('0').notNull(),
  padding: numeric('padding').default('6').notNull(),
}, (t) => ({
  uniqueTenantEntity: sql`unique (${t.tenant_id}, ${t.entity})`,
}));

// ---------- Subscriptions ----------
export const subscription_plans = pgTable('subscription_plans', {
  id: id(),
  name: text('name').notNull(),
  slug: text('slug').unique().notNull(),
  description: text('description'),
  price_monthly: numeric('price_monthly', { precision: 15, scale: 2 }).default('0').notNull(),
  max_shipments_monthly: numeric('max_shipments_monthly'),
  max_users: numeric('max_users').default('5').notNull(),
  max_branches: numeric('max_branches').default('1').notNull(),
  is_active: boolean('is_active').default(true).notNull(),
  created_at: createdAt(),
});

export const subscriptions = pgTable('subscriptions', {
  id: id(),
  tenant_id: uuid('tenant_id').notNull(),
  plan_id: uuid('plan_id').notNull().references(() => subscription_plans.id),
  status: text('status').default('trial').notNull(),
  current_period_start: timestamp('current_period_start', { mode: 'date' }),
  current_period_end: timestamp('current_period_end', { mode: 'date' }),
  trial_ends_at: timestamp('trial_ends_at', { mode: 'date' }),
  cancel_at_period_end: boolean('cancel_at_period_end').default(false).notNull(),
  created_at: createdAt(),
  updated_at: updatedAt(),
});

// ---------- Rate cards ----------
export const customer_rate_cards = pgTable('customer_rate_cards', {
  id: id(),
  tenant_id: uuid('tenant_id').notNull(),
  customer_id: uuid('customer_id').notNull(),
  service_type: text('service_type').notNull(),
  governorate: text('governorate'),
  weight_from: numeric('weight_from', { precision: 10, scale: 2 }).default('0').notNull(),
  weight_to: numeric('weight_to', { precision: 10, scale: 2 }).default('0').notNull(),
  price_per_kg: numeric('price_per_kg', { precision: 15, scale: 2 }),
  min_charge: numeric('min_charge', { precision: 15, scale: 2 }),
  cod_fee: numeric('cod_fee', { precision: 15, scale: 2 }),
  effective_from: timestamp('effective_from', { mode: 'date' }),
  effective_to: timestamp('effective_to', { mode: 'date' }),
  created_at: createdAt(),
});

// ---------- Customers ----------
export const customers = pgTable('customers', {
  id: id(),
  tenant_id: uuid('tenant_id').notNull(),
  type: text('type').notNull().default('company'),
  name: text('name').notNull(),
  tax_id: text('tax_id'),
  phone: text('phone'),
  email: text('email'),
  address: text('address'),
  governorate: text('governorate'),
  city: text('city'),
  area: text('area'),
  credit_limit: numeric('credit_limit', { precision: 15, scale: 2 }).default('0').notNull(),
  balance: numeric('balance', { precision: 15, scale: 2 }).default('0').notNull(),
  status: text('status').default('active').notNull(),
  created_at: createdAt(),
  updated_at: updatedAt(),
});

export const customer_contacts = pgTable('customer_contacts', {
  id: id(),
  customer_id: uuid('customer_id').notNull(),
  tenant_id: uuid('tenant_id').notNull(),
  name: text('name').notNull(),
  phone: text('phone'),
  email: text('email'),
  role: text('role'),
  created_at: createdAt(),
});

export const customer_addresses = pgTable('customer_addresses', {
  id: id(),
  customer_id: uuid('customer_id').notNull(),
  tenant_id: uuid('tenant_id').notNull(),
  label: text('label'),
  governorate: text('governorate'),
  city: text('city'),
  area: text('area'),
  street: text('street'),
  building: text('building'),
  floor: text('floor'),
  apartment: text('apartment'),
  landmark: text('landmark'),
  details: text('details'),
  is_default: boolean('is_default').default(false).notNull(),
  created_at: createdAt(),
});

// ---------- Contracts ----------
export const contracts = pgTable('contracts', {
  id: id(),
  tenant_id: uuid('tenant_id').notNull(),
  customer_id: uuid('customer_id').notNull(),
  starts_at: timestamp('starts_at', { mode: 'date' }),
  ends_at: timestamp('ends_at', { mode: 'date' }),
  credit_limit: numeric('credit_limit', { precision: 15, scale: 2 }),
  settlement_terms: text('settlement_terms'),
  return_terms: text('return_terms'),
  status: text('status').default('draft').notNull(),
  version: numeric('version', { precision: 10 }).default('1').notNull(),
  created_at: createdAt(),
  updated_at: updatedAt(),
});

export const contract_versions = pgTable('contract_versions', {
  id: id(),
  contract_id: uuid('contract_id').notNull(),
  snapshot: jsonb('snapshot').notNull(),
  effective_from: timestamp('effective_from', { mode: 'date' }),
  created_at: createdAt(),
});

// ---------- Shipments ----------
export const shipments = pgTable('shipments', {
  id: id(),
  tenant_id: uuid('tenant_id').notNull(),
  customer_id: uuid('customer_id').references(() => customers.id),
  origin_branch_id: uuid('origin_branch_id').references(() => branches.id),
  destination_branch_id: uuid('destination_branch_id').references(() => branches.id),
  assigned_courier_id: uuid('assigned_courier_id').references(() => user_profiles.id),
  tracking_number: text('tracking_number').unique().notNull(),
  external_order_id: text('external_order_id'),
  service_type: text('service_type'),
  shipment_type: text('shipment_type'),
  priority: text('priority').default('normal'),
  status: text('status').default('draft').notNull(),
  cod_amount: numeric('cod_amount', { precision: 15, scale: 2 }).default('0').notNull(),
  currency: text('currency').default('EGP').notNull(),
  declared_value: numeric('declared_value', { precision: 15, scale: 2 }).default('0').notNull(),
  shipping_charge: numeric('shipping_charge', { precision: 15, scale: 2 }).default('0').notNull(),
  total_charges: numeric('total_charges', { precision: 15, scale: 2 }).default('0').notNull(),
  expected_pickup_at: timestamp('expected_pickup_at', { mode: 'date' }),
  expected_delivery_at: timestamp('expected_delivery_at', { mode: 'date' }),
  created_by: uuid('created_by').references(() => user_profiles.id),
  created_at: createdAt(),
  updated_at: updatedAt(),
  deleted_at: timestamp('deleted_at', { mode: 'date' }),
});

// ---------- Shipment packages ----------
export const shipment_packages = pgTable('shipment_packages', {
  id: id(),
  shipment_id: uuid('shipment_id').notNull(),
  count: numeric('count', { precision: 10 }).default('1').notNull(),
  description: text('description'),
  weight_kg: numeric('weight_kg', { precision: 10, scale: 2 }),
  length_cm: numeric('length_cm', { precision: 10, scale: 2 }),
  width_cm: numeric('width_cm', { precision: 10, scale: 2 }),
  height_cm: numeric('height_cm', { precision: 10, scale: 2 }),
  volumetric_weight_kg: numeric('volumetric_weight_kg', { precision: 10, scale: 2 }),
  billing_weight_kg: numeric('billing_weight_kg', { precision: 10, scale: 2 }),
  package_type: text('package_type'),
  fragile: boolean('fragile').default(false).notNull(),
  returnable: boolean('returnable').default(false).notNull(),
  handling_instructions: text('handling_instructions'),
  created_at: createdAt(),
});

// ---------- Shipment addresses ----------
export const shipment_addresses = pgTable('shipment_addresses', {
  id: id(),
  shipment_id: uuid('shipment_id').notNull(),
  tenant_id: uuid('tenant_id').notNull(),
  name: text('name').notNull(),
  phone: text('phone'),
  alternate_phone: text('alternate_phone'),
  governorate: text('governorate'),
  city: text('city'),
  area: text('area'),
  street: text('street'),
  building: text('building'),
  floor: text('floor'),
  apartment: text('apartment'),
  landmark: text('landmark'),
  details: text('details'),
  address_type: text('address_type').notNull(),
  created_at: createdAt(),
});

// ---------- Shipment status events ----------
export const shipment_status_events = pgTable('shipment_status_events', {
  id: id(),
  shipment_id: uuid('shipment_id').notNull(),
  tenant_id: uuid('tenant_id').notNull(),
  previous_status: text('previous_status'),
  new_status: text('new_status').notNull(),
  user_id: uuid('user_id').references(() => user_profiles.id),
  branch_id: uuid('branch_id').references(() => branches.id),
  location: text('location'),
  notes: text('notes'),
  source: text('source').default('system').notNull(),
  reference_id: uuid('reference_id'),
  created_at: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// ---------- Shipment documents ----------
export const shipment_documents = pgTable('shipment_documents', {
  id: id(),
  shipment_id: uuid('shipment_id').notNull(),
  name: text('name'),
  type: text('type'),
  path: text('path').notNull(),
  uploaded_at: timestamp('uploaded_at', { mode: 'date' }).defaultNow().notNull(),
});

// ---------- Shipment charges ----------
export const shipment_charges = pgTable('shipment_charges', {
  id: id(),
  shipment_id: uuid('shipment_id').notNull(),
  type: text('type').notNull(),
  amount: numeric('amount', { precision: 15, scale: 2 }).default('0').notNull(),
  description: text('description'),
  created_at: createdAt(),
});

// ---------- COD ----------
export const cod_collections = pgTable('cod_collections', {
  id: id(),
  tenant_id: uuid('tenant_id').notNull(),
  shipment_id: uuid('shipment_id').notNull(),
  courier_id: uuid('courier_id').references(() => user_profiles.id),
  amount: numeric('amount', { precision: 15, scale: 2 }).default('0').notNull(),
  method: text('method').notNull(),
  collected_at: timestamp('collected_at', { mode: 'date' }).defaultNow().notNull(),
  transaction_reference: text('transaction_reference'),
  proof: text('proof'),
  status: text('status').default('collected').notNull(),
  created_at: createdAt(),
});

export const cod_collection_items = pgTable('cod_collection_items', {
  id: id(),
  collection_id: uuid('collection_id').notNull(),
  shipment_id: uuid('shipment_id').notNull(),
  amount: numeric('amount', { precision: 15, scale: 2 }).default('0').notNull(),
}, (t) => ({}));

// ---------- Settlements ----------
export const cod_settlements = pgTable('cod_settlements', {
  id: id(),
  tenant_id: uuid('tenant_id').notNull(),
  customer_id: uuid('customer_id').notNull(),
  period_from: timestamp('period_from', { mode: 'date' }).notNull(),
  period_to: timestamp('period_to', { mode: 'date' }).notNull(),
  gross_cod: numeric('gross_cod', { precision: 15, scale: 2 }).default('0').notNull(),
  shipping_fee_deducted: numeric('shipping_fee_deducted', { precision: 15, scale: 2 }).default('0').notNull(),
  net_payable: numeric('net_payable', { precision: 15, scale: 2 }).default('0').notNull(),
  status: text('status').default('draft').notNull(),
  payment_reference: text('payment_reference'),
  paid_at: timestamp('paid_at', { mode: 'date' }),
  created_at: createdAt(),
  approved_at: timestamp('approved_at', { mode: 'date' }),
  approved_by: uuid('approved_by').references(() => user_profiles.id),
});

export const cod_settlement_items = pgTable('cod_settlement_items', {
  id: id(),
  settlement_id: uuid('settlement_id').notNull(),
  shipment_id: uuid('shipment_id').notNull(),
  amount: numeric('amount', { precision: 15, scale: 2 }).default('0').notNull(),
}, (t) => ({
  uniqueSettlementShipment: sql`unique (${t.settlement_id}, ${t.shipment_id})`,
}));

// ---------- Cashbox ----------
export const cashboxes = pgTable('cashboxes', {
  id: id(),
  tenant_id: uuid('tenant_id').notNull(),
  branch_id: uuid('branch_id').notNull(),
  name: text('name').notNull(),
  balance: numeric('balance', { precision: 15, scale: 2 }).default('0').notNull(),
  currency: text('currency').default('EGP').notNull(),
  status: text('status').default('active').notNull(),
  created_at: createdAt(),
  updated_at: updatedAt(),
});

export const cashbox_transactions = pgTable('cashbox_transactions', {
  id: id(),
  cashbox_id: uuid('cashbox_id').notNull(),
  tenant_id: uuid('tenant_id').notNull(),
  type: text('type').notNull(),
  amount: numeric('amount', { precision: 15, scale: 2 }).default('0').notNull(),
  reference_type: text('reference_type'),
  reference_id: uuid('reference_id'),
  user_id: uuid('user_id').references(() => user_profiles.id),
  created_at: createdAt(),
});

// ---------- Accounting ----------
export const invoices = pgTable('invoices', {
  id: id(),
  tenant_id: uuid('tenant_id').notNull(),
  customer_id: uuid('customer_id').notNull(),
  number: text('number').unique().notNull(),
  issue_date: timestamp('issue_date', { mode: 'date' }).notNull(),
  due_date: timestamp('due_date', { mode: 'date' }),
  status: text('status').default('draft').notNull(),
  total: numeric('total', { precision: 15, scale: 2 }).default('0').notNull(),
  created_at: createdAt(),
  updated_at: updatedAt(),
});

export const invoice_items = pgTable('invoice_items', {
  id: id(),
  invoice_id: uuid('invoice_id').notNull(),
  description: text('description').notNull(),
  amount: numeric('amount', { precision: 15, scale: 2 }).default('0').notNull(),
});

export const payments = pgTable('payments', {
  id: id(),
  tenant_id: uuid('tenant_id').notNull(),
  customer_id: uuid('customer_id').references(() => customers.id),
  amount: numeric('amount', { precision: 15, scale: 2 }).default('0').notNull(),
  method: text('method'),
  reference: text('reference'),
  allocated: numeric('allocated', { precision: 15, scale: 2 }).default('0').notNull(),
  created_at: createdAt(),
});

export const credit_notes = pgTable('credit_notes', {
  id: id(),
  tenant_id: uuid('tenant_id').notNull(),
  related_invoice_id: uuid('related_invoice_id').references(() => invoices.id),
  amount: numeric('amount', { precision: 15, scale: 2 }).default('0').notNull(),
  reason: text('reason'),
  created_at: createdAt(),
});

export const debit_notes = pgTable('debit_notes', {
  id: id(),
  tenant_id: uuid('tenant_id').notNull(),
  related_invoice_id: uuid('related_invoice_id').references(() => invoices.id),
  amount: numeric('amount', { precision: 15, scale: 2 }).default('0').notNull(),
  reason: text('reason'),
  created_at: createdAt(),
});

export const expenses = pgTable('expenses', {
  id: id(),
  tenant_id: uuid('tenant_id').notNull(),
  description: text('description').notNull(),
  amount: numeric('amount', { precision: 15, scale: 2 }).default('0').notNull(),
  category: text('category'),
  created_at: createdAt(),
});

// ---------- Chart of Accounts ----------
export const chart_of_accounts = pgTable('chart_of_accounts', {
  id: id(),
  tenant_id: uuid('tenant_id').notNull(),
  code: text('code').unique().notNull(),
  name: text('name').notNull(),
  type: text('type').notNull(),
  balance: numeric('balance', { precision: 15, scale: 2 }).default('0').notNull(),
});

// ---------- Journal Entries ----------
export const journal_entries = pgTable('journal_entries', {
  id: id(),
  tenant_id: uuid('tenant_id').notNull(),
  date: timestamp('date', { mode: 'date' }).notNull(),
  description: text('description').notNull(),
  referenced_type: text('referenced_type'),
  referenced_id: uuid('referenced_id'),
  created_at: createdAt(),
});

export const journal_entry_lines = pgTable('journal_entry_lines', {
  id: id(),
  entry_id: uuid('entry_id').notNull().references(() => journal_entries.id, { onDelete: 'cascade' }),
  account_id: uuid('account_id').notNull().references(() => chart_of_accounts.id, { onDelete: 'cascade' }),
  debit: numeric('debit', { precision: 15, scale: 2 }).default('0').notNull(),
  credit: numeric('credit', { precision: 15, scale: 2 }).default('0').notNull(),
  description: text('description'),
});

// ---------- Platform ----------
export const audit_logs = pgTable('audit_logs', {
  id: id(),
  tenant_id: uuid('tenant_id').notNull(),
  user_id: uuid('user_id').references(() => user_profiles.id),
  action: text('action').notNull(),
  entity_type: text('entity_type').notNull(),
  entity_id: text('entity_id').notNull(),
  old_values: jsonb('old_values').default('{}').notNull(),
  new_values: jsonb('new_values').default('{}').notNull(),
  ip_address: text('ip_address'),
  created_at: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

export const notification_templates = pgTable('notification_templates', {
  id: id(),
  tenant_id: uuid('tenant_id').notNull(),
  event_type: text('event_type').notNull(),
  template: jsonb('template').notNull(),
  created_at: createdAt(),
});

export const notification_logs = pgTable('notification_logs', {
  id: id(),
  tenant_id: uuid('tenant_id').notNull(),
  event_type: text('event_type').notNull(),
  status: text('status').notNull(),
  sent_at: timestamp('sent_at', { mode: 'date' }),
  created_at: createdAt(),
});

export const outbox_events = pgTable('outbox_events', {
  id: id(),
  tenant_id: uuid('tenant_id').notNull(),
  event_type: text('event_type').notNull(),
  payload: jsonb('payload').notNull(),
  status: text('status').default('pending').notNull(),
  attempts: numeric('attempts', { precision: 5 }).default('0').notNull(),
  next_attempt_at: timestamp('next_attempt_at', { mode: 'date' }),
  created_at: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

export const webhook_endpoints = pgTable('webhook_endpoints', {
  id: id(),
  tenant_id: uuid('tenant_id').notNull(),
  event_types: jsonb('event_types').notNull(),
  url: text('url').notNull(),
  secret: text('secret').notNull(),
  status: text('status').default('active').notNull(),
  last_triggered: timestamp('last_triggered', { mode: 'date' }),
  created_at: createdAt(),
});

export const webhook_deliveries = pgTable('webhook_deliveries', {
  id: id(),
  endpoint_id: uuid('endpoint_id').notNull().references(() => webhook_endpoints.id, { onDelete: 'cascade' }),
  event_type: text('event_type').notNull(),
  payload: jsonb('payload').notNull(),
  status_code: numeric('status_code'),
  response_body: text('response_body'),
  error: text('error'),
  attempts: numeric('attempts', { precision: 5 }).default('0').notNull(),
  next_retry_at: timestamp('next_retry_at', { mode: 'date' }),
  completed_at: timestamp('completed_at', { mode: 'date' }),
});

export const integration_connections = pgTable('integration_connections', {
  id: id(),
  tenant_id: uuid('tenant_id').notNull(),
  provider: text('provider').notNull(),
  credentials: jsonb('credentials'),
  status: text('status').default('pending').notNull(),
  connected_at: timestamp('connected_at', { mode: 'date' }),
  last_synced: timestamp('last_synced', { mode: 'date' }),
});

export const background_jobs = pgTable('background_jobs', {
  id: id(),
  tenant_id: uuid('tenant_id').notNull(),
  job_type: text('job_type').notNull(),
  status: text('status').default('pending').notNull(),
  payload: jsonb('payload'),
  created_at: createdAt(),
  started_at: timestamp('started_at', { mode: 'date' }),
  completed_at: timestamp('completed_at', { mode: 'date' }),
  error: text('error'),
});

export type CodCollection = typeof cod_collections.$inferSelect;
export type CodSettlement = typeof cod_settlements.$inferSelect;
export type Shipment = typeof shipments.$inferSelect;
export type Invoice = typeof invoices.$inferSelect;
export type Payment = typeof payments.$inferSelect;
export type AuditLog = typeof audit_logs.$inferSelect;
export type Customer = typeof customers.$inferSelect;
export type UserProfile = typeof user_profiles.$inferSelect;