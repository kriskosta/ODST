# Halo ODST Fan Website

## Overview
A Halo 3: ODST themed promotional website with parallax scrolling, interactive carousels, and immersive UI effects. Built with vanilla HTML, CSS, and JavaScript.

## Current State
**Last Session:** 2025-12-03
**Status:** Functional with all major sections complete, Mission section redesigned with gallery

## Recently Completed
- Downloaded all images locally to `images/` folder (no more external image dependencies)
- Added Superintendent GIF to loading/splash screen with matching dark background (#101010)
- Changed CTA buttons, nav active states, and hero title from yellow to white
- Completely redesigned THE MISSION section:
  - Added atmospheric blue fog background effect with drift animation
  - Integrated ODST mission holotable image with glow effect
  - Added screenshot gallery (4 thumbnails) below main image
  - Implemented lightbox with prev/next navigation and keyboard support (Escape, Arrow keys)
  - Kept Non-Linear Story and Open World features with blue accent styling
  - Removed VISR info and rain effect from this section

## Currently Working On
- All changes are uncommitted (not a git repo)
- Site is fully functional and browsable

## Next Steps
- [ ] Consider adding responsive breakpoints for mission gallery on mobile
- [ ] Test mobile touch interactions on carousels and lightbox
- [ ] Potentially add keyboard navigation for accessibility across all components
- [ ] Consider adding image loading states/placeholders
- [ ] Could add more screenshots to the gallery

## Architecture Notes
- **Parallax Sections:** Each major section uses `.parallax-section` with `.parallax-bg` for background effects
- **Carousels:** Two carousel implementations:
  - Ticker carousel: Vertical with transform-based positioning (prev/active/next states)
  - Squad carousel: Horizontal scroll-based with drag support
- **Arsenal Selector:** Data-driven approach using hidden `data-*` attributes for weapon info
- **Lightbox:** Custom implementation with `[data-lightbox="gallery"]` attribute for clickable images
- **CSS Variables:** Defined in `:root` for consistent theming (colors, fonts, transitions)
- **Images:** All images stored locally in `images/` folder. **Always download new images locally rather than hotlinking.**
- **Color Scheme:** Primary accents changed to white (#ffffff), Mission section uses blue (#4a9eca)

## Key Files
- `index.html` - Main HTML structure with all sections (hero, ticker, story/mission, squad, arsenal, footer, lightbox)
- `styles.css` - All styling including parallax effects, carousels, blue fog, gallery, lightbox, responsive breakpoints
- `script.js` - JavaScript for interactivity (carousels, parallax, navigation, weapon selector, lightbox)
- `images/` - All local images (27 files including characters, weapons, backgrounds, screenshots, GIFs, logos)
- `reference.png` - Design reference for the ticker section layout
- `metro-reference.png` - Design reference for the Arsenal section (Metro 2033 style)

## Images Inventory
- **Characters:** Rookie, Buck, Dare, Romeo, Mickey, Dutch portraits
- **Weapons:** SMG, SOCOM, AR, Shotgun, Sniper, Rocket Launcher
- **Backgrounds/Screenshots:** New Mombasa, Alpha Nine, Firefight, VISR, Mombasa Streets, Kikowani Station, etc.
- **UI Elements:** UNSC logo (SVG), rain GIF, Superintendent GIF, ODST-mission holotable
- **References:** blue-clouds-reference.jpg (for Mission section styling)

## CSS Structure
- CSS Variables (`:root`)
- Reset & Base styles
- Navigation (white active states)
- Loading screen (#101010 background, Superintendent GIF)
- Parallax sections
- Hero section (white title, rain overlay)
- Ticker/Adventure section
- Story/Mission section (blue fog, gallery, lightbox)
- Squad section with carousel
- Arsenal section with weapon selector
- Footer
- Animations & effects
- Responsive breakpoints

## JavaScript Functions
- `initLoadingScreen()` - Splash screen with Superintendent GIF
- `initTicker()` - Vertical carousel with auto-advance, drag, wheel, hover pause
- `initArsenalSelector()` - Weapon icon selection with animated stat bars
- `initSquadCarousel()` - Horizontal drag-to-scroll carousel
- `initParallax()` - Parallax scrolling effects
- `initNavigation()` - Scroll-based nav highlighting
- `initLightbox()` - Gallery lightbox with keyboard navigation
- `initRain()` - Rain effect (currently only on hero)
- Various other effects (VISR mode, glitch, scroll progress, etc.)
