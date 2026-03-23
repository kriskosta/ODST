# Monarch Website

A premium, highly polished website with visual excellence, reliability, and performance.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (hot reload) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run E2E tests |
| `npm run lint` | Lint JavaScript files |
| `npm run format` | Format code with Prettier |

## Testing

```bash
# Run unit tests
npm run test

# Run unit tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui
```

## Local Deployment

### Quick Preview
```bash
./scripts/serve-local.sh
# Serves at http://localhost:4173
```

### Deploy to nginx
```bash
./scripts/deploy-local.sh /var/www/monarch
```

## CI/CD

The project uses GitLab CI/CD with the following pipeline:

1. **Install** - Install npm dependencies
2. **Lint** - ESLint and Prettier checks
3. **Test** - Unit tests (Vitest) and E2E tests (Playwright)
4. **Build** - Vite production build
5. **Deploy** - Preview (auto) or Production (manual)

## Documentation

| File | Description |
|------|-------------|
| [docs/SYSTEM.md](docs/SYSTEM.md) | System overview |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Target architecture |
| [docs/PROGRESS.md](docs/PROGRESS.md) | Current progress |
| [docs/CONSTRAINTS.md](docs/CONSTRAINTS.md) | Coding standards |
| [docs/DEPENDENCIES.md](docs/DEPENDENCIES.md) | Dependencies |
| [docs/CHANGELOG.md](docs/CHANGELOG.md) | Change history |

## Project Structure

```
monarch_website/
├── index.html          # Main HTML
├── styles.css          # CSS styles
├── script.js           # JavaScript
├── images/             # Image assets
├── tests/
│   ├── unit/           # Unit tests
│   └── e2e/            # E2E tests
├── scripts/            # Automation scripts
├── docs/               # Documentation
└── dist/               # Build output
```

## Requirements

- Node.js 18+
- npm 8+

## License

Private - All rights reserved.
