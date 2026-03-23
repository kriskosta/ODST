#!/bin/bash
# Monarch Website - Local Preview Server
# Serves the latest build for human testing
#
# Usage: ./scripts/serve-local.sh [port]
# Default port: 4173

set -e

PORT=${1:-4173}
DIST_DIR="dist"
PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

cd "$PROJECT_DIR"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}  Monarch Website - Local Server${NC}"
echo -e "${GREEN}======================================${NC}"

# Check if dist directory exists
if [ ! -d "$DIST_DIR" ]; then
    echo -e "${YELLOW}No build found. Building now...${NC}"
    npm run build
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing dependencies...${NC}"
    npm install
fi

echo ""
echo -e "${GREEN}Starting preview server on port ${PORT}...${NC}"
echo -e "${GREEN}Access the site at: http://localhost:${PORT}${NC}"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop the server${NC}"
echo ""

# Start the preview server
npm run preview -- --port "$PORT"
