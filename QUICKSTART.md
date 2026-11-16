# TrackPro Project - Quick Start

This document provides quick instructions to start the TrackPro logistics platform project.

## 🚨 Prerequisites

You need:
- **Node.js 20+** (npm included)
- **PostgreSQL** database with appropriate credentials
- For production: Docker, Kubernetes, or cloud hosting

## 🚀 Quick Setup

### 1. Start the Development Server

```bash
# From the project root directory
npm run dev

# Or use the quick-start script
./quick-start.sh
```

**The application will be available at:**
- Frontend: `http://localhost:3000`
- API Routes: `http://localhost:3000/api`

### 2. Database Setup

Create a `.env.local` file in the project root:

```env
# Required for database
DATABASE_URL=postgresql://username:password@hostname/database

# Required for authentication
BETER_AUTH_SECRET=your-super-secret-key-here
BETER_AUTH_URL=http://localhost:3000/api/auth

# Optional (for payments, AWS, Redis)
STRIPE_SECRET_KEY=sk_test_...
AWS_ACCESS_KEY_ID=your-key
REDIS_URL=redis://localhost:6379
```

**Database Setup Commands:**
```bash
# Generate migrations
npm run db:generate

# Apply migrations
npm run db:migrate

# Seed initial data
npm run db:seed
```

## 📋 Authentication & User Management

### Default Test Accounts

**Admin Account:**
- Email: `admin@example.com`
- Password: `admin123`
- Role: Super Admin

**Manager Account:**
- Email: `manager@example.com`
- Password: `manager123`
- Role: Branch Manager

**Customer Account:**
- Email: `customer@example.com`
- Password: `customer123`
- Role: Customer

### Login Flow

1. Visit `http://localhost:3000/auth/signin`
2. Enter your email and password
3. You'll be redirected to the dashboard
4. Navigate through the application using the sidebar

## 🛠 Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint linter |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run db:generate` | Generate Drizzle migrations |
| `npm run db:migrate` | Apply database migrations |
| `npm run db:studio` | Open Drizzle studio |
| `npm run db:seed` | Seed database with initial data |

## 📁 Project Structure

```
shipping-saas/
├── app/                    # Next.js pages and components
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Main dashboard
│   ├── ui/                # UI components
│   └── api/               # API routes
├── components/             # Shared components
├── lib/                    # Application libraries
│   ├── auth-context.tsx   # Authentication context
│   ├── auth.ts            # Better Auth configuration
│   └── auth-client.ts     # Auth client utilities
├── db/                     # Database configuration
│   ├── schema.ts         # Database schema
│   └── index.ts          # Drizzle client
├── scripts/               # Seed scripts
├── README.md              # Project documentation
├── quick-start.sh         # Quick start script
├── setup.sh              # Full setup script
└── package.json          # Project dependencies and scripts
```

## 🔐 Security Configuration

### Authentication
- Better Auth with JWT tokens
- Session-based authentication
- Role-based access control (RBAC)
- Multi-tenancy support

### Database Security
- PostgreSQL with proper access controls
- Drizzle ORM with type safety
- Environment-based configuration

### Frontend Security
- CSP headers
- CSRF protection
- Rate limiting

## 📊 Features Overview

### Core Modules
1. **Shipments** - Real-time tracking, route optimization, proof of delivery
2. **Customers** - Customer portal, address management, invoice system
3. **Contracts** - Service agreements, automated renewals, compliance tracking
4. **Pickup & Delivery** - Scheduling, driver assignment, capacity planning
5. **Fleet Management** - Vehicle tracking, maintenance, driver management
6. **Warehouse Operations** - Inventory, picking, packing, put-away
7. **Financial** - Invoicing, payments, revenue tracking

### Dashboard Features
- Real-time analytics
- Interactive charts and graphs
- Recent activity feed
- Quick action buttons
- Role-based access

## 🔧 Technical Specifications

### Stack
- **Framework**: Next.js 16.4.6 (App Router, Server Components)
- **Runtime**: React 19.3.0
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth
- **Styling**: Tailwind CSS
n- **State Management**: Zustand (planned)
- **Forms**: React Hook Form + Zod

### Architecture
- **Modular Monolith**: Single codebase with clear separation
- **Multi-tenancy**: Tenant isolation for SaaS
- **RBAC**: 51+ permissions across 9 roles
- **Event-driven**: WebSocket for real-time updates
- **API-first**: RESTful API design

## 🏗️ Production Deployment

### Docker
```bash
# Build and run
docker-compose up -d

# Production build
docker build -t trackpro . && docker run -p 3000:3000 trackpro
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

## 📈 Monitoring & Performance

- **Logging**: Winston with structured logging
- **Metrics**: Prometheus + Grafana
- **APM**: Sentry for error tracking
- **Performance**: Next.js optimization

## 🆘 Support

### Documentation
- [Project Documentation](README.md)
- [API Reference](app/api/docs)
- [Architecture Guide](docs/architecture.md)

### Community
- **GitHub Issues**: Bug reports and feature requests
- **Slack**: #trackpro-support channel
- **Discord**: Community discussions

### Getting Help

1. Check the [FAQ](docs/faq.md)
2. Browse [GitHub Issues](https://github.com/Kilo-Org/kilocode/issues)
3. Join our [Slack community](https://slack.com)
4. Check the development [logs](logs/)

## 📚 Resources

### Learning Resources
- [Better Auth Documentation](https://better-auth.com)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [Next.js 16.4.6 Migration Guide](https://nextjs.org/docs/app-router/upgrading/upgrading-from-15)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Project Resources
- **GitHub Repository**: [Kilo-Org/kilocode](https://github.com/Kilo-Org/kilocode)
- **License**: MIT License
- **Version**: 0.1.0

---

*Built with ❤️ for enterprise logistics*
