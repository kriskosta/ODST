# Monarch Website - Lessons Learned

## 2025-12-26 - Initial Setup

### Lesson 1: Project Structure First
When setting up a new project from a template/zip file:
1. Unpack and analyze the contents first
2. Understand the existing structure before making changes
3. Move files to proper locations systematically
4. Keep the original structure notes for reference

### Lesson 2: Testing Framework Selection
For a static website with vanilla JS:
- **Vitest** works well for unit testing DOM structure and JS logic
- **Playwright** is excellent for E2E testing across browsers
- Both integrate smoothly with Vite

### Lesson 3: CI/CD Pipeline Design
For a local-hosted project:
- Preview deployments should trigger automatically on branch pushes
- Production deployments should be manual (safety)
- Include review environments for merge requests
- Artifact retention helps with debugging

### Lesson 4: Documentation Structure
The docs/ structure works well for agent collaboration:
- `SYSTEM.md` - High-level overview (read first)
- `ARCHITECTURE.md` - Target state (what "done" looks like)
- `PROGRESS.md` - Current state (what exists now)
- `CONSTRAINTS.md` - Rules to follow
- `DEPENDENCIES.md` - External requirements
- `CHANGELOG.md` - History of changes

---

## Best Practices Discovered

### Static Site Hosting
- Vite's preview mode works great for local testing
- Scripts should be executable and self-documenting
- Include clear usage instructions in script comments

### Testing Strategy
- Test structure first (HTML validity, required elements)
- Test functionality second (interactions, navigation)
- Test performance last (load times, no console errors)

### Git Workflow
- Create feature branches from main
- Include issue numbers in commits
- Push frequently to trigger CI/CD

---

## 2025-12-26 - JavaScript Bundling Issue

### Lesson 5: Vite Requires `type="module"` for Script Bundling
**Critical discovery**: When using Vite to build a static site, the main script tag MUST have `type="module"` attribute for the JavaScript to be bundled in production.

**What happened**:
- Original HTML: `<script src="script.js"></script>`
- Vite dev server worked fine (it injects module handling automatically)
- Production build did NOT bundle the JavaScript - the script tag was left as-is pointing to a non-existent file
- Result: ALL interactive features completely broken in production

**The fix**:
- Change to: `<script type="module" src="script.js"></script>`
- Production build now correctly bundles JS and updates the HTML to reference the bundled file

**How to detect this issue**:
1. Run `npm run build`
2. Look for the warning: `"<script src="script.js"> in "/index.html" can't be bundled without type="module" attribute"`
3. Check if `dist/assets/*.js` exists (besides `.map` files)
4. If no JS files in dist, the bundling failed

**Prevention**:
- Always use `type="module"` on script tags when using Vite
- Always check build output for warnings
- Test production builds locally with `npm run preview` before deploying
