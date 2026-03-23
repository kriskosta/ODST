# Monarch Website - Challenges

## 2025-12-26 - Initial Setup

### Challenge 1: JSDOM Dependency

**Issue**: Unit tests require JSDOM for DOM manipulation, but it's not explicitly listed in package.json.

**Resolution**: Vitest's JSDOM environment is configured in vite.config.js. When `environment: 'jsdom'` is set, Vitest uses its built-in JSDOM support. If tests fail with "document is not defined", add `jsdom` as a dev dependency:

```bash
npm install --save-dev jsdom
```

**Status**: Pending verification after npm install

---

### Challenge 2: Local Hosting Requirements

**Issue**: The project requires a locally hosted site for human testing, but the exact hosting environment is unknown.

**Options Considered**:
1. **Vite Preview** - Simple, built-in, no extra setup
2. **nginx** - Production-like, requires manual config
3. **Docker** - Portable, requires Docker installation

**Resolution**: Implemented Vite preview as default with scripts for nginx deployment. Created `scripts/serve-local.sh` for quick preview and `scripts/deploy-local.sh` for production-like deployment.

**Status**: Resolved - human to choose preferred method

---

### Challenge 3: Playwright Browser Installation in CI

**Issue**: Playwright requires browser binaries which are large and slow to download.

**Resolution**: Use the official Playwright Docker image in CI which has browsers pre-installed:
```yaml
image: mcr.microsoft.com/playwright:v1.40.0-jammy
```

Only run Chromium tests in CI for speed:
```yaml
npm run test:e2e -- --project=chromium
```

**Status**: Resolved in .gitlab-ci.yml

---

### Challenge 4: Test Dependencies Not Installed

**Issue**: Tests cannot be verified as passing because npm dependencies haven't been installed yet.

**Human Action Required**:
```bash
cd /home/admin_tron/workspace/monarch_website
npm install
npm run test
npm run build
```

**Status**: Blocked - requires human action

---

## Unresolved Challenges

### 1. Monarch Branding
The current site uses Halo ODST branding. The Monarch color palette, logo, and content are not yet defined.

### 2. Production Deployment Target
The exact deployment target (local server IP, domain name) is not specified. The CI/CD pipeline assumes `http://monarch.local` which may need updating.

### 3. Web3/Web2 Integration Architecture
Future integrations are mentioned but no detailed requirements exist yet.
