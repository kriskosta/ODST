# Monarch Website : Architecture

## Target State ("Done" Definition)

### Complete Website Features
- [ ] Responsive homepage with all sections
- [ ] Navigation with smooth scrolling
- [ ] Hero section with animated elements
- [ ] Feature/product showcase sections
- [ ] Team/about section (carousel)
- [ ] Product/service details (interactive selector)
- [ ] Contact/CTA section
- [ ] Footer with links

### Visual Excellence
- [ ] Consistent color palette (Monarch brand)
- [ ] Typography hierarchy
- [ ] Smooth animations and transitions
- [ ] Parallax scrolling effects
- [ ] Loading screen/splash
- [ ] Micro-interactions on buttons/links
- [ ] Lightbox for image galleries

### Performance Targets
- [ ] Lighthouse Performance: 90+
- [ ] First Contentful Paint: < 1.5s
- [ ] Largest Contentful Paint: < 2.5s
- [ ] Cumulative Layout Shift: < 0.1
- [ ] Image optimization (WebP, lazy loading)
- [ ] Minimal JavaScript bundle

### Accessibility
- [ ] WCAG 2.1 AA compliance
- [ ] Keyboard navigation
- [ ] Screen reader compatible
- [ ] Reduced motion support
- [ ] Focus indicators
- [ ] Semantic HTML

### Testing Coverage
- [ ] Unit tests: 80%+ coverage
- [ ] E2E tests: All critical paths
- [ ] Cross-browser: Chrome, Firefox, Safari, Edge
- [ ] Mobile: iOS Safari, Android Chrome
- [ ] Responsive: 375px to 1920px+

### CI/CD Pipeline
- [x] Automated linting
- [x] Unit test execution
- [x] E2E test execution
- [x] Build process
- [x] Preview deployment
- [ ] Production deployment
- [ ] Review environments for MRs

### Local Hosting
- [x] Vite preview server
- [x] Deployment scripts
- [ ] Nginx configuration template
- [ ] Docker container option

---

## File Structure

```
monarch_website/
├── index.html              # Main HTML entry point
├── styles.css              # All CSS styles
├── script.js               # All JavaScript
├── images/                 # Image assets
│   ├── *.jpg              # Photos and backgrounds
│   ├── *.png              # Transparent images
│   ├── *.svg              # Vector graphics
│   └── *.gif              # Animated elements
├── public/                 # Static assets (copied as-is)
├── tests/
│   ├── unit/              # Vitest unit tests
│   │   └── site.test.js
│   └── e2e/               # Playwright E2E tests
│       └── homepage.spec.js
├── scripts/
│   ├── serve-local.sh     # Start local preview server
│   └── deploy-local.sh    # Deploy to local web server
├── docs/
│   ├── AGENT_PROTOCOL.md  # Agent workflow guide
│   ├── SYSTEM.md          # High-level description
│   ├── ARCHITECTURE.md    # This file - target state
│   ├── PROGRESS.md        # Current state
│   ├── CONSTRAINTS.md     # Rules and patterns
│   ├── DEPENDENCIES.md    # External dependencies
│   ├── LESSONS.md         # Lessons learned
│   ├── CHALLENGES.md      # Challenges encountered
│   └── CHANGELOG.md       # Change history
├── package.json           # npm configuration
├── vite.config.js         # Vite configuration
├── playwright.config.js   # Playwright configuration
├── .gitlab-ci.yml         # GitLab CI/CD pipeline
├── .gitignore             # Git ignore rules
└── README.md              # Project readme
```

---

## Component Architecture

### CSS Structure
```
:root (CSS Variables)
├── Colors (--color-*)
├── Fonts (--font-*)
└── Transitions (--transition-*)

Sections
├── Navigation (.nav)
├── Hero (.hero)
├── Ticker/Adventure (.ticker-section)
├── Story/Mission (.story)
├── Squad (.squad)
├── Arsenal (.arsenal)
└── Footer (.footer)

Components
├── Buttons (.btn-*)
├── Cards (.glass-card)
├── Carousels
├── Lightbox
└── Overlays (scanlines, VISR)

Utilities
├── Animations (@keyframes)
├── Responsive (@media)
└── Accessibility (focus, reduced-motion)
```

### JavaScript Modules
```
DOMContentLoaded
├── initLoadingScreen()    # Splash screen
├── initParallax()         # Scroll-based parallax
├── initNavigation()       # Scroll spy, smooth scroll
├── initRain()             # Rain effect (if enabled)
├── initTicker()           # Vertical carousel
├── initSquadCarousel()    # Horizontal carousel
├── initArsenalSelector()  # Weapon/product selector
├── initScrollAnimations() # Reveal on scroll
├── initAudioToggle()      # Ambient audio
├── initGlitchEffects()    # Visual glitch
├── initVISRMode()         # Easter egg mode
└── initLightbox()         # Image gallery
```

---

## CI/CD Architecture

```
Pipeline Stages
├── install          # npm ci
├── lint             # ESLint, Prettier
├── test
│   ├── unit-tests   # Vitest
│   └── e2e-tests    # Playwright (Chromium)
├── build            # Vite build
└── deploy
    ├── deploy-preview   # Auto on main/develop/feature/*
    ├── deploy-production # Manual trigger
    ├── review           # MR environments
    └── pages            # GitLab Pages (optional)
```

---

## Deployment Options

### Option 1: Vite Preview (Development)
```bash
npm run preview
# Serves at http://localhost:4173
```

### Option 2: Local Nginx (Production-like)
```bash
./scripts/deploy-local.sh /var/www/monarch
# Requires nginx configuration
```

### Option 3: Docker (Portable)
```dockerfile
# Future: Dockerfile for containerized deployment
FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/
```

### Option 4: GitLab Pages (Public)
- Triggered manually on main branch
- Serves at GitLab Pages URL
