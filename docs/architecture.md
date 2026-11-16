# TrackPro — Architecture (STEP 2)

**Date:** 2026-11-16  
**Status:** Draft (Phase 0/1 baseline)

## 1. Pattern
**Modular Monolith.** Domain modules live under `modules/<feature>/{actions,services,repositories,validations,types,constants,events}`. No microservices initially; modules are logically independent so they can be extracted later.

## 2. Technology stack
| Layer | Choice | Source |
|---|---|---|
| Framework / Routing | Next.js 16.4.6 App Router | installed |
| Language | TypeScript 5 strict | installed |
| Styling | Tailwind CSS 4.3.3 | installed |
| Database | Neon PostgreSQL | configured in `.env.local` |
| ORM / Migrations | Drizzle ORM 0.45.4 / Drizzle Kit 0.31.11 | installed |
| Authentication | Better Auth (Drizzle adapter) | to install |
| UI primitives | shadcn/ui-compatible (Radix-based) | to install |
| Icons | lucide-react | to install |
| Forms | React Hook Form + Zod | to install |
| Tables | TanStack Table | to install |
| Charts | Recharts | to install |
| State | React / Zustand (minimal) | to install |
| File storage | S3-compatible adapter (interface first, credentials later) | to install |
| Testing | Vitest + Playwright | to install |

## 3. Directory conventions
Keep `app/` at project root (no `src` folder per project rules).

```
app/
  (marketing)/      public pages
  (auth)/           login, register, forgot-password, reset-password, verify
  (dashboard)/      authenticated tenant shell (sidebar/topbar) + module routes
  track/[trackingNumber]/   public tracking page
  merchant/         merchant portal
  api/v1/           external API + webhooks
  layout.tsx        root layout (html/body)
components/
  ui/               shadcn primitives
  layout/           Sidebar, Topbar, shell
  dashboard/        dashboard-specific UI
  tables/, forms/, charts/, dialogs/, tracking/, shared/
lib/
  auth/             Better Auth + session helpers
  db/               Drizzle client + tenant context
  permissions/      RBAC helpers
  tenant/           tenant resolution from session
  validations/      Zod schemas shared by actions/handlers
  utils/, constants/, errors/, formatting/, security/
modules/<feature>/
  actions/          Server Actions
  services/         business logic (no UI/DB leaks)
  repositories/     Drizzle queries with tenant filtering
  validations/      Zod input schemas
  types/, constants/, events/, tests/
db/
  schema.ts, index.ts, relations.ts, migrations/, seed.ts
docs/, tests/{unit,integration,e2e}/, public/{logo,icons,images}/
```

## 4. Rendering & data flow
- **Server Components by default.** Client Components only where interactivity is required (forms, modals, dropdowns, bars).
- **Data fetching:** Server Components query Drizzle directly. No client-side fetch layer for internal data.
- **Mutations:** Server Actions (`'use server'`) with Zod validation + tenant + permission enforcement **inside** the action. UI gating is UX only, never a security boundary.
- **External API / webhooks:** `app/api/v1/*` Route Handlers.
- **Request-level rewrites/redirects:** root `proxy.ts` (Next 16 Proxy), matcher-based; never used for authz.
- **Caching:** `use cache` / `use cache: private` per Next.js 16 Cache Components; runtime data behind `<Suspense>`; never cache per-tenant financial data long-lived without explicit invalidation.

## 5. Tenancy & security
- Shared PostgreSQL, logical `tenant_id` on every business table.
- Composite FK `(tenant_id, id)` prevents cross-tenant links.
- Application-level tenant context enforced in every repository; client-supplied `tenant_id` never trusted.
- Row-Level Security evaluated for production hardening (Phase 10).
- Financial records: soft-delete only, append-only audit logs, reversal entries for corrections.
- Secrets: env variables only; never in client code, never committed.

## 6. Route groups
| Group | Purpose | Auth |
|---|---|---|
| `(marketing)` | Landing, legal, pricing pages | Public |
| `(auth)` | Login, register, password flows | Public |
| `(dashboard)` | Tenant shell with Sidebar/Topbar; all module routes | Authenticated + RBAC |
| `track/[trackingNumber]` | Public tracking portal | Public (rate limited) |
| `merchant` | Merchant portal | Merchant session |
| `api/v1` | REST API + webhooks | API key / signature |

## 7. Migration strategy
Use `drizzle-kit generate` → SQL under `db/migrations/`. Review SQL before applying. Apply to Neon only after staging review; never run `drizzle-kit push` against production blindly. Seed data for development only.
