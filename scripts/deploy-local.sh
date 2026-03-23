#!/bin/bash
# Monarch Website - Deploy to Local Server
# Builds and deploys the site to a local nginx/apache directory
#
# Usage: ./scripts/deploy-local.sh [target_dir]
# Default target: /var/www/monarch

set -e

TARGET_DIR=${1:-/var/www/monarch}
PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

cd "$PROJECT_DIR"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}  Monarch Website - Local Deploy${NC}"
echo -e "${GREEN}======================================${NC}"
echo ""

# Check if running as root for deployment to system directories
if [[ "$TARGET_DIR" == /var/* ]] && [[ $EUID -ne 0 ]]; then
    echo -e "${YELLOW}Note: Deploying to ${TARGET_DIR} may require sudo.${NC}"
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing dependencies...${NC}"
    npm install
fi

# Run tests first
echo -e "${GREEN}Running tests...${NC}"
npm run test || {
    echo -e "${RED}Tests failed! Aborting deployment.${NC}"
    exit 1
}

# Build the project
echo -e "${GREEN}Building project...${NC}"
npm run build

# Create deployment marker
echo "Deployed at $(date)" > dist/.deployed
echo "Commit: $(git rev-parse HEAD 2>/dev/null || echo 'unknown')" >> dist/.deployed
echo "Branch: $(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo 'unknown')" >> dist/.deployed

# Deploy to target directory
echo -e "${GREEN}Deploying to ${TARGET_DIR}...${NC}"
if [ -d "$TARGET_DIR" ]; then
    # Backup existing deployment
    BACKUP_DIR="${TARGET_DIR}.backup.$(date +%Y%m%d%H%M%S)"
    echo -e "${YELLOW}Backing up existing deployment to ${BACKUP_DIR}${NC}"
    cp -r "$TARGET_DIR" "$BACKUP_DIR" 2>/dev/null || sudo cp -r "$TARGET_DIR" "$BACKUP_DIR"
fi

# Create target directory if it doesn't exist
mkdir -p "$TARGET_DIR" 2>/dev/null || sudo mkdir -p "$TARGET_DIR"

# Copy files
cp -r dist/* "$TARGET_DIR/" 2>/dev/null || sudo cp -r dist/* "$TARGET_DIR/"

echo ""
echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}  Deployment Complete!${NC}"
echo -e "${GREEN}======================================${NC}"
echo ""
echo -e "Site deployed to: ${TARGET_DIR}"
echo ""
echo -e "${YELLOW}If using nginx, ensure your config points to ${TARGET_DIR}${NC}"
echo -e "${YELLOW}Example nginx config:${NC}"
echo ""
echo "server {"
echo "    listen 80;"
echo "    server_name monarch.local;"
echo "    root ${TARGET_DIR};"
echo "    index index.html;"
echo ""
echo "    location / {"
echo "        try_files \$uri \$uri/ /index.html;"
echo "    }"
echo "}"
echo ""
