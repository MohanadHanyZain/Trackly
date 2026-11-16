# TrackPro - Logistics Management Platform

Complete enterprise SaaS logistics platform with multi-tenant architecture, real-time tracking, automated dispatch, and comprehensive warehouse management.

## Tech Stack

**Frontend:**
- Next.js 16.4.6 (App Router, Server Components, Cache API, Partial Prefetching)
- React 19.3.0
- TypeScript
- Tailwind CSS
- Zustand for state management
- React Hook Form + Zod for forms
- Lucide React icons

**Backend:**
- Node.js 20+ (in project)
- Better Auth 1.2.8 with Drizzle adapter
- Drizzle ORM 0.45.4 + Drizzle Kit 0.31.11
- Neon PostgreSQL (10GB, pg16)
- PostgreSQL 16

**Architecture:**
- Modular monolith design
- Multi-tenant SaaS with tenant isolation
- RBAC with 51+ permissions
- JWT-based authentication
- Event-driven design

## Setup & Running

### Prerequisites
```bash
# Check Node.js version
node --version
# Node.js 20+ required

# PostgreSQL running
# Install PostgreSQL and create database
# This project uses Neon PostgreSQL
```

### Project Setup

1. **Clone repository**
```bash
git clone <your-repo>
cd shipping-saas
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create `.env.local`:
```env
# Database
DATABASE_URL=postgresql://username:password@hostname/database

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Better Auth
BETER_AUTH_SECRET=your-secret-key
BETER_AUTH_URL=http://localhost:3000/api/auth

# Stripe (if using payments)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Redis (optional)
REDIS_URL=redis://localhost:6379

# AWS S3 (optional)
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_REGION=us-east-1
```

4. **Run the application**
```bash
npm run dev
```

5. **Access the application**
- Frontend: `http://localhost:3000`
- API Routes: `http://localhost:3000/api`
- Database: Connected to Neon PostgreSQL

## Features

### Core Modules

1. **Shipments**
   - Real-time tracking
   - GPS integration
   - Route optimization
   - Manifest generation
   - Proof of delivery

2. **Customers**
   - Customer portal
   - Address management
   - Contact information
   - Invoice management

3. **Contracts**
   - Service level agreements
   - Contract lifecycle
   - Automated renewal
   - Compliance tracking

4. **Pickup & Delivery**
   - Scheduling system
   - Driver assignment
   - Zone management
   - Capacity planning

5. **Fleet Management**
   - Vehicle tracking
   - Maintenance scheduling
   - Driver management
   - Load optimization

6. **Warehouse Operations**
   - Inventory management
   - Picking & packing
   - Cross-docking
   - Put-away system

7. **Financial & Billing**
   - Invoicing system
   - Payment processing
   - Revenue tracking
   - Expense management

### Authentication & Security

- **Better Auth Integration**: Robust authentication with email/password, OAuth providers
- **RBAC System**: 51+ permissions across 9 roles
- **Session Management**: JWT-based with secure cookie handling
- **Multi-tenancy**: Tenant isolation for SaaS architecture
- **API Security**: Protected routes with comprehensive access control

### UI/UX

- **Enterprise Dashboard**: Real-time analytics and metrics
- **Responsive Design**: Mobile-first, fully responsive layouts
- **Theme System**: Professional color palette with dark mode support
- **Accessibility**: WCAG 2.1 AA compliance
- **Internationalization**: Multi-language support

## Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Run linting
npm run lint

# Type checking
npm run typecheck

# Database migrations
npm run db:migrate

# Generate migrations
npm run db:generate

# Seed database
npm run db:seed

# Storybook for components
npm run storybook

# Generate Prisma client
npm run db:prisma
```

## Database Schema

The platform includes comprehensive database schema with 51+ tables:

**Core Tables:**
- `users`, `roles`, `permissions`
- `tenants`, `tenant_users`
- `shipments`, `customers`, `contracts`
- `pickup_delivery`, `fleet`, `warehouse`

**Financial Tables:**
- `invoices`, `payments`, `expenses`

**Audit Tables:**
- `audit_logs`, `activity_logs`

## Components

- **Enterprise Dashboard**: Real-time analytics with widgets
- **Advanced Tables**: Data tables with sorting, filtering, pagination
- **Charts & Graphs**: Real-time data visualization
- **Notifications**: Real-time updates with WebSocket support
- **File Management**: Document upload and management
- **Email Templates**: Custom email workflows

## Security

### Authentication
- JWT-based session tokens
- Secure cookie handling
- CSRF protection
- Rate limiting
- Password hashing

### Data Protection
- Multi-tenancy with tenant isolation
- Role-based access control
- Row-level security
- Audit logging
- Encryption at rest

### Network Security
- HTTPS enforcement
- CORS configuration
- Security headers
- DDoS protection

## Production Deployment

### Docker Setup
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Kubernetes
```yaml
# deployments.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: trackpro-frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: trackpro-frontend
  template:
    metadata:
      labels:
        app: trackpro-frontend
    spec:
      containers:
      - name: trackpro
        image: trackpro:latest
        ports:
        - containerPort: 3000
```

### Monitoring
- **Logging**: Winston with structured logging
- **Metrics**: Prometheus + Grafana
- **APM**: Sentry for error tracking
- **Uptime**: Health checks and monitoring

## Contributing

### Code Standards
- TypeScript strict mode
- ESLint + Prettier
- Conventional commits
- Code reviews mandatory

### Testing
- Unit tests with Jest
- Integration tests with Supertest
- E2E tests with Cypress
- Coverage > 90%

### CI/CD
```yaml
# .github/workflows/ci.yml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '20'
    - run: npm ci
    - run: npm run test
    - run: npm run lint
    - run: npm run typecheck
```

## Support & Community

- **Documentation**: [docs/](docs/) directory
- **API Reference**: Available in `/api/docs`
- **Slack**: #trackpro-support channel
- **GitHub**: Issues and pull requests
- **Discord**: Community discussions

## License

MIT License. See [LICENSE](LICENSE) for details.

---

*Built with ❤️ for the logistics industry*
