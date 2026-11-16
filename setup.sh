#!/bin/bash

# TrackPro Setup Script
# This script sets up the environment and runs the development server

# Exit on any error
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Logging functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
check_nodejs() {
    if ! command -v node &> /dev/null; then
        log_error "Node.js is not installed. Please install Node.js 20+"
        exit 1
    fi

    NODE_VERSION=$(node -v | sed 's/v//')
    MAJOR_VERSION=$(echo $NODE_VERSION | cut -d. -f1)

    if [ $MAJOR_VERSION -lt 20 ]; then
        log_warn "Node.js version $NODE_VERSION is less than 20. The project may not work properly."
    fi

    log_info "Node.js version: $NODE_VERSION"
}

# Check if PostgreSQL is installed
check_postgres() {
    if ! command -v psql &> /dev/null; then
        log_warn "PostgreSQL client is not installed. Database setup may fail."
    fi
}

# Create environment file if it doesn't exist
create_env_file() {
    if [ ! -f ".env.local" ]; then
        log_info "Creating .env.local file..."
        cat > .env.local << EOF
# Database Configuration
DATABASE_URL=postgresql://username:password@hostname/database

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Better Auth Configuration
BETER_AUTH_SECRET=your-super-secret-key-here
BETER_AUTH_URL=http://localhost:3000/api/auth

# Stripe (optional - for payments)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Redis (optional)
REDIS_URL=redis://localhost:6379

# AWS S3 (optional)
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_REGION=us-east-1
EOF
        log_warn "Please update .env.local with your actual database credentials and API keys"
    else
        log_info ".env.local already exists"
    fi
}

# Install dependencies
install_deps() {
    log_info "Installing dependencies..."
    npm install
}

# Run database migrations
run_migrations() {
    log_info "Running database migrations..."
    if npm run db:generate && npm run db:migrate; then
        log_info "Database migrations completed successfully"
    else
        log_error "Database migrations failed. Please check your DATABASE_URL in .env.local"
        log_info "You can skip migrations by running 'npm run dev -- --skip-db-setup'"
    fi
}

# Start the development server
start_server() {
    log_info "Starting TrackPro development server..."
    log_info "The application will be available at: http://localhost:3000"
    log_info "API routes will be available at: http://localhost:3000/api"
    log_info ""
    log_info "User Accounts (for testing):"
    log_info "  - Admin: admin@example.com / admin123"
    log_info "  - Customer: customer@example.com / customer123"
    log_info "  - Manager: manager@example.com / manager123"
    log_info ""
    log_info "To stop the server, press Ctrl+C"
    log_info ""

    npm run dev
}

# Main setup function
main() {
    echo "========================================"
    echo "TrackPro Logistics Platform Setup"
    echo "========================================"
    echo ""

    check_nodejs
    check_postgres
    create_env_file
    install_deps
    run_migrations
    start_server
}

# Run main function
main
