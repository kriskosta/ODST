# Halo ODST Fan Website

## Overview
A Halo 3: ODST themed promotional website with parallax scrolling, interactive carousels, and immersive UI effects. Built with vanilla HTML, CSS, and JavaScript.

## Current State
**Last Session:** 2026-03-24
**Status:** Functional with all major sections complete. Git repo on GitHub (kriskosta/ODST).

## Recently Completed (2026-03-24)
- Scroll-driven video performance optimization:
  - Re-encoded video with all-intra keyframes (`keyint=1`) so each seek decodes exactly 1 frame instead of up to ~300
  - Downscaled to 720p @ 30fps (from 1080p @ 60fps) — text crawl doesn't need high framerate for scroll
  - New file: `odst-opening-text-crawl-scroll.mp4` (35MB, original kept as backup)
  - ffmpeg command: `ffmpeg -i <original> -vf "fps=30,scale=1280:720" -c:v libx264 -preset slow -crf 23 -x264-params keyint=1:scenecut=0 -an -movflags +faststart <output>`
  - Added lerp-based animation with seek-delta guard (skips seeks < 0.016s)
  - Added `will-change: transform` to video element CSS
  - Added `video.pause()` on metadata load to prevent auto-play conflicts

## Previously Completed (2026-03-23)
- Hero section overhaul:
  - Fixed hero bg stretch (`background` shorthand → `background-image`)
  - Reduced title size to fit on one line, pushed content lower
  - Extended hero fade gradient higher (70%)
  - Replaced single "PURCHASE HALO MCC" button with dual "BUY ON XBOX" / "BUY ON STEAM" outline buttons
  - Buttons: white border, transparent bg, white fill on hover, 8px border-radius, no glow/shine effects
  - Added Steam and Xbox SVG icons to buttons (sourced locally)
- Added ODST emblem favicon with dark/light browser theme variants
- Fixed nav scroll detection to highlight HOME for hero section (added `#hero` to section query)
- Made nav logo link to `#hero`
- Added scroll-driven video section (`#textCrawl`) between hero and ticker:
  - Plays `odst-opening-text-crawl-scroll.mp4` muted, controlled by scroll position
  - 500vh tall section with sticky video, 400vh of scroll travel
  - Vanilla JS implementation (no GSAP), uses `requestAnimationFrame` with lerp smoothing

## Next Steps
- [ ] Test scroll video on mobile (touch scrolling)
- [ ] Consider adding Barlow font (DIN alternative) for body/UI text
- [ ] Consider responsive breakpoints for mission gallery on mobile
- [ ] Test mobile touch interactions on carousels and lightbox
- [ ] Add keyboard navigation for accessibility across all components

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
- `index.html` - Main HTML structure with all sections (hero, scroll-video, ticker, story/mission, squad, arsenal, footer, lightbox)
- `styles.css` - All styling including parallax effects, carousels, blue fog, gallery, lightbox, responsive breakpoints
- `script.js` - JavaScript for interactivity (carousels, parallax, navigation, weapon selector, lightbox, scroll video)
- `images/` - All local images and icons
- `images/videos/` - Video assets (odst-opening-text-crawl-scroll.mp4 for scroll playback, original kept as backup)
- `LOCAL_DOCS/screenshots/` - Design mockups/references

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
- Hero section (white title, rain overlay, outline buy buttons)
- Scroll-driven video section (sticky video, 500vh)
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
- `initNavigation()` - Scroll-based nav highlighting (includes #hero)
- `initScrollVideo()` - Scroll-driven video playback (lerp-smoothed seeking with delta guard, maps scroll progress to video.currentTime)
- `initLightbox()` - Gallery lightbox with keyboard navigation
- `initRain()` - Rain effect (currently only on hero)
- Various other effects (VISR mode, glitch, scroll progress, etc.)
