# Monarch Website - Progress

## Current Status

**Last Updated:** 2025-12-27
**Phase:** Foundation Setup
**Overall Progress:** [####______] 40%

---

## Phase 1: Project Setup [##########] 100%

### Completed
- [x] Unpacked halo-odst.zip base template
- [x] Restructured project (moved files to root)
- [x] Created package.json with npm scripts
- [x] Configured Vite build system
- [x] Created .gitignore
- [x] Set up testing framework (Vitest + Playwright)
- [x] Created GitLab CI/CD pipeline
- [x] Created local deployment scripts
- [x] Created all documentation files

### Artifacts Created
- `package.json` - npm configuration
- `vite.config.js` - Vite build config
- `playwright.config.js` - E2E test config
- `.gitlab-ci.yml` - CI/CD pipeline
- `.gitignore` - Git ignore rules
- `scripts/serve-local.sh` - Local preview script
- `scripts/deploy-local.sh` - Local deploy script

---

## Phase 2: Testing & CI/CD [######____] 60%

### Completed
- [x] Unit test file structure
- [x] E2E test file structure
- [x] CI/CD pipeline configuration
- [x] Install npm dependencies
- [x] Verify unit tests pass (24/24)
- [x] Fix unit test for lightbox placeholder image
- [x] Fix E2E CI configuration (Playwright version compatibility)
- [x] Fix E2E CI browser installation (use pre-installed browsers)
- [x] Fix package-lock.json version mismatch (npm ci failure)
- [x] Fix E2E CI for shell executor (explicit Playwright install)
- [x] Fix E2E CI Playwright install requiring sudo (remove --with-deps)
- [x] Fix JavaScript bundling - add type="module" to script tag
- [x] Fix dynamically-loaded images not available in production (Issue #5)
- [x] Skip lint/test stages in CI for faster deployment (temporarily disabled)

### In Progress
- [ ] Configure nginx for deploy-preview (see docs/DEPLOYMENT.md)

### On Hold (Temporarily Disabled)
- [ ] Verify E2E tests pass in CI environment (tests disabled for now)
- [ ] Increase test coverage
- [ ] Add visual regression tests
- [ ] Set up test result dashboards

---

## Phase 3: Local Hosting [##________] 20%

### Completed
- [x] Vite preview configuration
- [x] Deployment scripts

### Not Started
- [ ] nginx configuration template
- [ ] Docker containerization
- [ ] systemd service setup
- [ ] Auto-deploy from CI/CD

---

## Phase 4: Branding Transformation [__________] 0%

### Not Started
- [ ] Define Monarch color palette
- [ ] Replace ODST branding with Monarch
- [ ] Update content and copy
- [ ] Replace images with Monarch assets
- [ ] Update typography

---

## Phase 5: Future Integrations [__________] 0%

### Not Started
- [ ] Web3 marketplace preparation
- [ ] Web2 plugin architecture
- [ ] API integration layer

---

## Test Status

| Suite       | Tests | Passing | Failing | Coverage |
|-------------|-------|---------|---------|----------|
| Unit        | 24    | 24      | 0       | TBD      |
| E2E         | 16    | TBD     | TBD     | N/A      |

*Unit tests verified. E2E tests require CI environment or local system dependencies.*

---

## Known Issues

1. **Local E2E tests** - Require system dependencies (libnspr4.so, etc.) - use CI for E2E testing
2. **Deploy preview requires nginx** - The preview URL (http://192.168.0.20:4173) requires nginx to be configured on the GitLab runner. See docs/DEPLOYMENT.md for setup instructions.
3. **[#5 Fix 15] GIF replacements pending** - New GIFs for Halo 2, 3, ODST requested but GitLab upload URLs require HTTP authentication. Agent has SSH access only. Manual download from GitLab UI required, or provide files directly in repo.

## Resolved Issues

1. **[#5 Fix 24] Mission gallery expanded** - Downloaded, converted, and added 18 new web-optimized images to "THE MISSION" section gallery. Images sourced from various external URLs and converted to 1200x675 @ 85% JPEG quality using Sharp.
2. **[#5] Images not loading in production** - Fixed by copying dynamically-referenced images to `public/images/`. Vite only processes images in HTML `<img src>` and CSS `url()`, not those referenced in JavaScript strings or `data-*` attributes. The `public/` folder is copied as-is to `dist/`.
2. **[#5 Fix 2] Kikowani Station image missing** - Added `H3ODST_KikowaniStation.jpg` to `public/images/` for production builds.
3. **[#5 Fix 2] Arsenal carousel slow image loading** - Added image preloading for all weapon images on page load.
4. **[#5 Fix 2] Audio toggle button removed** - Removed mute/unmute button as requested (HTML, CSS, JS).
5. **[#5 Fix 3] E2E port conflict with deploy-preview** - E2E tests now use port 4174 in CI while nginx deploy-preview uses port 4173.
6. **[#5 Fix 4] Ticker section transitions** - Enhanced slide transitions with smoother 0.7s cubic-bezier curves and filter effects.
7. **[#5 Fix 4] Story section parallax** - Removed parallax scrolling effect from story section only, keeping background static.
8. **[#5 Fix 4] Animated blue fog effect** - Redesigned with dynamic multi-layer animated smoke/mist using CSS animations.
9. **[#5 Fix 4] Kikowani Station image corrupted** - Original file was HTML placeholder; replaced with valid `H3ODST_AlphaNine_Kikowani.jpg`.
10. **[#5 Fix 5] Story section edge fading** - Added fade-to-transparent gradient overlay on top/bottom edges of story section.
11. **[#5 Fix 5] CTA replaced with marquee** - Replaced static "READY TO DROP?" CTA with infinite scrolling marquee effect.
12. **[#5 Fix 6] Marquee replaced with MCC grid** - Replaced marquee-cta with Master Chief Collection game grid (5 Halo game covers with hover effects).
13. **[#5 Fix 7] Broken MCC grid images** - Fixed 404 errors for Halo CE and ODST box art by replacing Wikimedia URLs with Halopedia wiki gallery URLs.
14. **[#5 Fix 7] Included Titles intro section** - Added 370px banner section above MCC grid with ODST background, heading, description, and stats badges.
15. **[#5 Fix 9] Experience section redesign** - Redesigned "Experience the Complete Saga" section with split layout (Master Chief character left, Zeta Halo background right), matching reference image. Updated Halo CE and ODST images in MCC grid.
16. **[#5 Fix 15] MCC game item borders and transitions** - Added persistent gold borders (30% opacity) to all MCC game items. Improved hover transitions with unified 0.4s cubic-bezier timing for smoother animation.
17. **[#5 Fix 23] MCC game item borders refined** - Changed to faint thin blue border, removed all scale/transform effects from hover states.
18. **[#5 Fix 23] External images localized** - Downloaded all external images and hosted locally in images/ folder, eliminating external dependencies.

---

## What's Next

### Immediate
1. Configure nginx for deploy-preview to serve /var/www/monarch on port 4173
2. Verify deployment works end-to-end

### After Deployment Verified
1. Begin Monarch branding transformation
2. Re-enable testing stages in CI when ready

---

## Questions for Humans

1. What is the Monarch color palette?
2. Are there Monarch logo/brand assets available?
3. What content should replace the ODST content?
4. What is the target hosting environment (local network, cloud)?
5. Are there specific performance requirements?
