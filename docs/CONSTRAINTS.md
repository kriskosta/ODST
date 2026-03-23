# Monarch Website - Constraints

## Code Standards

### HTML
- Use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Include `lang` attribute on `<html>` element
- Always include `<meta viewport>` for responsive design
- All images must have `alt` attributes
- Use `aria-label` for icon-only buttons
- IDs must be unique and meaningful

### CSS
- Use CSS custom properties (variables) for theming
- Define all colors, fonts, and transitions in `:root`
- Follow mobile-first responsive design
- Include `prefers-reduced-motion` media query
- Use `focus-visible` for keyboard focus styles
- Avoid `!important` except for utilities
- Use relative units (rem, em, %) over fixed pixels for text

### JavaScript
- Use modern ES6+ syntax
- Initialize all components on `DOMContentLoaded`
- Use `requestAnimationFrame` for animations
- Avoid inline event handlers in HTML
- Handle errors gracefully
- Clean up event listeners and intervals when appropriate
- Avoid blocking the main thread

---

## File Organization

### Naming Conventions
- Files: `kebab-case` (e.g., `serve-local.sh`)
- CSS classes: `kebab-case` (e.g., `.nav-link`)
- JavaScript functions: `camelCase` (e.g., `initNavigation`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRIES`)

### Directory Structure
- `/images` - All image assets
- `/public` - Static files copied as-is
- `/tests/unit` - Vitest unit tests
- `/tests/e2e` - Playwright E2E tests
- `/scripts` - Shell scripts for automation
- `/docs` - Documentation files
- `/dist` - Build output (gitignored)

---

## Testing Requirements

### Unit Tests
- Test file naming: `*.test.js`
- Minimum coverage target: 80%
- Test DOM structure, CSS rules, JS functions
- Use JSDOM for DOM testing

### E2E Tests
- Test file naming: `*.spec.js`
- Cover all critical user paths
- Test responsive breakpoints
- Test across browsers (Chromium, Firefox, WebKit)
- Test touch interactions for mobile

### Pre-Commit
- All tests must pass before commit
- Linting must pass (warnings allowed)
- Format check must pass

---

## Performance

### Load Time
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3s

### Bundle Size
- Keep JavaScript minimal
- Compress images (WebP preferred)
- Lazy load images below the fold
- Defer non-critical scripts

### Rendering
- Avoid layout shifts (CLS < 0.1)
- Use `will-change` sparingly
- Prefer CSS animations over JS
- Use `transform` and `opacity` for smooth animations

---

## Accessibility

### WCAG 2.1 AA Requirements
- Color contrast ratio: 4.5:1 for text
- Focus indicators visible
- No content flashes more than 3 times/second
- All functionality keyboard accessible
- Form inputs have labels
- Error messages are descriptive

### Screen Readers
- Use semantic HTML
- Provide alt text for images
- Use `aria-` attributes appropriately
- Test with VoiceOver/NVDA

### Motion
- Respect `prefers-reduced-motion`
- Provide option to disable animations
- Avoid auto-playing video/audio

---

## Git Workflow

### Branch Naming
- Features: `feature/description`
- Bugs: `bugfix/description`
- AI agents: `ai/issue-number-description`
- Hotfixes: `hotfix/description`

### Commit Messages
- Format: `[#ISSUE_ID] Brief description`
- Use present tense ("Add feature" not "Added feature")
- Keep first line under 72 characters
- Include bullet points for details

### Pull Requests
- Must pass CI/CD pipeline
- Requires at least one approval
- Must include test coverage
- Must update documentation if needed

---

## Security

### Never Commit
- API keys or secrets
- `.env` files
- Credentials or passwords
- Private keys

### Content Security
- Sanitize user input (if any)
- Use HTTPS for external resources
- Validate all external URLs
- Avoid inline scripts when possible

---

## CI/CD

### Pipeline Rules
- All branches run: install, lint, test, build
- Main/develop run: deploy-preview
- Main runs: deploy-production (manual)
- MRs run: review environments

### Deployment
- Always test before deploy
- Create backup before production deploy
- Include deployment marker in build
- Verify deployment after completion
