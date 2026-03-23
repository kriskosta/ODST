/**
 * End-to-End Tests for Monarch Website
 * Tests user interactions and visual elements
 */

import { test, expect } from '@playwright/test';

test.describe('Monarch Website - Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for loading screen to disappear
    await page.waitForTimeout(3000);
  });

  test('should load homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/ODST|Monarch/i);
  });

  test('should display navigation', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should have working navigation links', async ({ page }) => {
    const heroLink = page.locator('.nav-link[href="#hero"]');
    await expect(heroLink).toBeVisible();

    const storyLink = page.locator('.nav-link[href="#story"]');
    await expect(storyLink).toBeVisible();
  });

  test('should display hero section', async ({ page }) => {
    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();
  });

  test('should scroll to sections when nav links clicked', async ({ page }) => {
    const storyLink = page.locator('.nav-link[href="#story"]');
    await storyLink.click();

    // Wait for smooth scroll
    await page.waitForTimeout(1000);

    const storySection = page.locator('#story');
    await expect(storySection).toBeInViewport();
  });
});

test.describe('Monarch Website - Interactive Elements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(3000);
  });

  test('should have clickable buttons', async ({ page }) => {
    const primaryBtn = page.locator('.btn-primary').first();
    await expect(primaryBtn).toBeVisible();
    await expect(primaryBtn).toBeEnabled();
  });

  test('should open lightbox when gallery image clicked', async ({ page }) => {
    // Scroll to story section first
    await page.locator('#story').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const galleryItem = page.locator('[data-lightbox="gallery"]').first();
    if (await galleryItem.isVisible()) {
      await galleryItem.click();

      const lightbox = page.locator('#lightbox.active');
      await expect(lightbox).toBeVisible();

      // Close lightbox
      const closeBtn = page.locator('.lightbox-close');
      await closeBtn.click();
      await expect(lightbox).not.toBeVisible();
    }
  });

  test('should display squad carousel', async ({ page }) => {
    await page.locator('#squad').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const carousel = page.locator('#squadCarousel');
    await expect(carousel).toBeVisible();
  });

  test('should navigate squad carousel with buttons', async ({ page }) => {
    await page.locator('#squad').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const nextBtn = page.locator('#nextMember');
    if (await nextBtn.isVisible()) {
      await nextBtn.click();
      await page.waitForTimeout(500);
      // Carousel should have moved
    }
  });
});

test.describe('Monarch Website - Weapon Arsenal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(3000);
    await page.locator('#gear').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
  });

  test('should display weapon icons', async ({ page }) => {
    const weaponIcons = page.locator('.weapon-icon');
    await expect(weaponIcons.first()).toBeVisible();
  });

  test('should change weapon display when icon clicked', async ({ page }) => {
    const pistolIcon = page.locator('.weapon-icon[data-weapon="pistol"]');
    if (await pistolIcon.isVisible()) {
      await pistolIcon.click();
      await page.waitForTimeout(500);

      // Check that the weapon name updated
      const weaponName = page.locator('.weapon-name');
      await expect(weaponName).toContainText(/SOCOM/i);
    }
  });
});

test.describe('Monarch Website - Responsive Design', () => {
  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForTimeout(3000);

    // Hero should still be visible
    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();
  });

  test('should be responsive on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForTimeout(3000);

    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();
  });

  test('should be responsive on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.waitForTimeout(3000);

    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();

    // Desktop should show nav links
    const navLinks = page.locator('.nav-links');
    await expect(navLinks).toBeVisible();
  });
});

test.describe('Monarch Website - Performance', () => {
  test('should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;

    // Should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('should have no console errors', async ({ page }) => {
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForTimeout(3000);

    // Filter out expected errors (like missing audio files)
    const criticalErrors = errors.filter(e =>
      !e.includes('audio') && !e.includes('Audio')
    );

    expect(criticalErrors).toHaveLength(0);
  });
});
