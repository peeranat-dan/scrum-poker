import { expect, test } from '@playwright/test';

import { environment, isEnv } from './utils/test-env';

test.describe(`Screenshot tests (${environment} environment)`, () => {
  test.beforeEach(async () => {
    // Set a longer timeout for the entire test
    test.setTimeout(30000);
    console.log(`Running test in ${environment} environment`);
  });

  // Skip this test in production to avoid unnecessary load on prod servers
  test('homepage screenshot', async ({ page }) => {
    test.skip(
      isEnv('production') && !process.env.FORCE_PROD_TEST,
      'Skipping in production unless forced',
    );
    // Navigate to the homepage
    await page.goto('/');

    // Wait for any animations or dynamic content to load
    await page.waitForLoadState('networkidle');

    // Wait for a specific element that indicates the page is fully loaded
    // Replace this selector with an element that exists on your page
    await page.waitForSelector('body', { state: 'visible', timeout: 10000 });

    // Add a small delay to ensure animations are complete
    await page.waitForTimeout(1000);

    // Take a screenshot with more stable options
    await expect(page).toHaveScreenshot([environment, 'homepage.png'], {
      timeout: 15000,
      maxDiffPixelRatio: 0.05, // Allow small differences (5%)
      animations: 'disabled', // Disable animations
      maxDiffPixels: 320, // Allow up to 320 pixels to be different because of the particles in hero image
      fullPage: true,
    });
  });

  test('responsive layout - mobile', async ({ page }) => {
    // Skip this test in production to avoid unnecessary load on prod servers
    test.skip(
      isEnv('production') && !process.env.FORCE_PROD_TEST,
      'Skipping in production unless forced',
    );

    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 772 });

    console.log(`Running mobile test in ${environment} environment`);

    // Navigate to the homepage
    await page.goto('/');

    // Wait for any animations or dynamic content to load
    await page.waitForLoadState('networkidle');

    // Wait for a specific element that indicates the page is fully loaded
    // Replace this selector with an element that exists on your page
    await page.waitForSelector('body', { state: 'visible', timeout: 10000 });

    // Add a small delay to ensure animations are complete
    await page.waitForTimeout(1000);

    // Take a screenshot with more stable options
    await expect(page).toHaveScreenshot([environment, 'homepage-mobile.png'], {
      timeout: 15000,
      maxDiffPixelRatio: 0.05, // Allow small differences (5%)
      animations: 'disabled', // Disable animations
      maxDiffPixels: 320, // Allow up to 320 pixels to be different because of the particles in hero image
      fullPage: true,
    });
  });
});
