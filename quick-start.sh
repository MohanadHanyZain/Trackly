#!/usr/bin/env bash

# Quick Start Script for TrackPro
# Simple way to start the development server

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Quick setup function
quick_start() {
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}TrackPro Quick Start${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo "This will quickly set up and start the development server."
    echo ""

    # Check if Node.js is installed
    if ! command -v node &> /dev/null; then
        echo "Error: Node.js is not installed. Please install Node.js 20+"
        exit 1
    fi

    # Check if dependencies are installed
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}Installing dependencies...${NC}"
        npm install
        echo ""
    else
        echo -e "${GREEN}Dependencies are already installed.${NC}"
    fi

    echo "Starting TrackPro development server..."
    echo ""
    echo -e "The application will be available at: ${GREEN}http://localhost:3000${NC}"
    echo -e "API routes will be available at: ${GREEN}http://localhost:3000/api${NC}"
    echo ""
    echo "User Accounts (for testing):"
    echo "  - Admin: admin@example.com / admin123"
    echo "  - Customer: customer@example.com / customer123"
    echo "  - Manager: manager@example.com / manager123"
    echo ""
    echo "To stop the server, press Ctrl+C"
    echo ""

    # Start the server
    npm run dev
}

# Run quick start
quick_start
