/**
 * Unit Tests for Monarch Website
 * Tests core functionality and DOM structure
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Monarch Website - HTML Structure', () => {
  let dom;
  let document;

  beforeAll(() => {
    const htmlPath = path.resolve(__dirname, '../../index.html');
    const html = fs.readFileSync(htmlPath, 'utf-8');
    dom = new JSDOM(html);
    document = dom.window.document;
  });

  afterAll(() => {
    dom = null;
    document = null;
  });

  describe('Document Structure', () => {
    it('should have a valid DOCTYPE', () => {
      const doctype = dom.serialize().toLowerCase();
      expect(doctype.startsWith('<!doctype html>')).toBe(true);
    });

    it('should have proper lang attribute', () => {
      const html = document.querySelector('html');
      expect(html.getAttribute('lang')).toBe('en');
    });

    it('should have a meta viewport tag', () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      expect(viewport).not.toBeNull();
      expect(viewport.getAttribute('content')).toContain('width=device-width');
    });

    it('should have a title tag', () => {
      const title = document.querySelector('title');
      expect(title).not.toBeNull();
      expect(title.textContent.length).toBeGreaterThan(0);
    });
  });

  describe('Navigation', () => {
    it('should have a navigation element', () => {
      const nav = document.querySelector('nav');
      expect(nav).not.toBeNull();
    });

    it('should have navigation links', () => {
      const navLinks = document.querySelectorAll('.nav-link');
      expect(navLinks.length).toBeGreaterThan(0);
    });

    it('should have proper href attributes on nav links', () => {
      const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        expect(href).toBeTruthy();
        expect(href.startsWith('#')).toBe(true);
      });
    });
  });

  describe('Sections', () => {
    it('should have hero section', () => {
      const hero = document.querySelector('#hero');
      expect(hero).not.toBeNull();
    });

    it('should have story section', () => {
      const story = document.querySelector('#story');
      expect(story).not.toBeNull();
    });

    it('should have squad section', () => {
      const squad = document.querySelector('#squad');
      expect(squad).not.toBeNull();
    });

    it('should have gear/arsenal section', () => {
      const gear = document.querySelector('#gear');
      expect(gear).not.toBeNull();
    });
  });

  describe('Images', () => {
    it('should have alt attributes on images', () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        const alt = img.getAttribute('alt');
        expect(alt !== null).toBe(true);
      });
    });

    it('should have src attributes on images', () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        // Skip placeholder images (e.g., lightbox-image which is dynamically populated)
        if (img.classList.contains('lightbox-image')) {
          return;
        }
        const src = img.getAttribute('src');
        expect(src).toBeTruthy();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label on icon buttons', () => {
      const iconButtons = document.querySelectorAll('button[aria-label]');
      iconButtons.forEach(btn => {
        expect(btn.getAttribute('aria-label').length).toBeGreaterThan(0);
      });
    });

    it('should have footer element', () => {
      const footer = document.querySelector('footer');
      expect(footer).not.toBeNull();
    });
  });
});

describe('Monarch Website - CSS Structure', () => {
  let cssContent;

  beforeAll(() => {
    const cssPath = path.resolve(__dirname, '../../styles.css');
    cssContent = fs.readFileSync(cssPath, 'utf-8');
  });

  it('should have CSS variables defined', () => {
    expect(cssContent).toContain(':root');
    expect(cssContent).toContain('--color-');
  });

  it('should have responsive breakpoints', () => {
    expect(cssContent).toContain('@media');
  });

  it('should have reduced motion preference support', () => {
    expect(cssContent).toContain('prefers-reduced-motion');
  });

  it('should have focus styles for accessibility', () => {
    expect(cssContent).toContain('focus');
  });
});

describe('Monarch Website - JavaScript Structure', () => {
  let jsContent;

  beforeAll(() => {
    const jsPath = path.resolve(__dirname, '../../script.js');
    jsContent = fs.readFileSync(jsPath, 'utf-8');
  });

  it('should initialize on DOMContentLoaded', () => {
    expect(jsContent).toContain('DOMContentLoaded');
  });

  it('should have parallax functionality', () => {
    expect(jsContent).toContain('initParallax');
  });

  it('should have navigation functionality', () => {
    expect(jsContent).toContain('initNavigation');
  });

  it('should have lightbox functionality', () => {
    expect(jsContent).toContain('initLightbox');
  });

  it('should use requestAnimationFrame for performance', () => {
    expect(jsContent).toContain('requestAnimationFrame');
  });
});
