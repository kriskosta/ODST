# Monarch Website - Dependencies

## Runtime Dependencies

### External CDN Resources
| Resource | Version | Purpose | CDN |
|----------|---------|---------|-----|
| Google Fonts | N/A | Orbitron, Rajdhani fonts | fonts.googleapis.com |

### Images
All images are stored locally in `/images/` directory. No external image dependencies.

---

## Development Dependencies

### Build Tools
| Package | Version | Purpose |
|---------|---------|---------|
| vite | ^5.0.0 | Fast dev server and optimized builds |

### Testing
| Package | Version | Purpose |
|---------|---------|---------|
| vitest | ^1.0.0 | Unit testing framework |
| @vitest/ui | ^1.0.0 | Vitest UI dashboard |
| @vitest/coverage-v8 | ^1.0.0 | Code coverage reporting |
| @playwright/test | ^1.40.0 | E2E browser testing |
| jsdom | (via vitest) | DOM simulation for unit tests |

### Code Quality
| Package | Version | Purpose |
|---------|---------|---------|
| eslint | ^8.55.0 | JavaScript linting |
| eslint-config-prettier | ^9.1.0 | Disable ESLint rules that conflict with Prettier |
| eslint-plugin-html | ^7.1.0 | Lint JavaScript in HTML files |
| prettier | ^3.1.0 | Code formatting |

---

## System Requirements

### Node.js
- Minimum: 18.0.0
- Recommended: 20.x LTS

### npm
- Minimum: 8.0.0
- Recommended: 10.x

### Browsers (for E2E testing)
- Chromium (installed via Playwright)
- Firefox (installed via Playwright)
- WebKit (installed via Playwright)

---

## CI/CD Dependencies

### GitLab Runner
- Docker executor recommended
- Node.js 20 Alpine image for most jobs
- Playwright image for E2E tests

### Docker Images
| Image | Purpose |
|-------|---------|
| node:20-alpine | Build, lint, unit tests |
| mcr.microsoft.com/playwright:v1.40.0-jammy | E2E tests |

---

## Installation

### First Time Setup
```bash
# Install all dependencies
npm install

# Install Playwright browsers (for E2E tests)
npx playwright install
```

### Verify Installation
```bash
# Check Node version
node --version  # Should be >= 18.0.0

# Check npm version
npm --version   # Should be >= 8.0.0

# Run tests
npm run test

# Start dev server
npm run dev
```

---

## Updating Dependencies

### Check for Updates
```bash
# Check outdated packages
npm outdated
```

### Update Process
1. Update package.json versions
2. Run `npm install`
3. Run all tests to verify
4. Test locally before committing

### Security Updates
```bash
# Check for vulnerabilities
npm audit

# Auto-fix vulnerabilities
npm audit fix
```

---

## Known Compatibility Issues

### Vitest + JSDOM
The unit tests require JSDOM for DOM manipulation. This is bundled with Vitest when using `environment: 'jsdom'` in the config.

### Playwright Browsers
Playwright requires downloading browser binaries. In CI, use the official Playwright Docker image which has browsers pre-installed.

### Node.js Version
Some features require Node.js 18+. Ensure your local environment and CI runners use compatible versions.
