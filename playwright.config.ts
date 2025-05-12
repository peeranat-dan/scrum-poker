import { defineConfig, devices } from '@playwright/test';
import { environments, getCurrentEnvironment } from './e2e/config/environments';

// Get the current environment and its configuration
const environment = getCurrentEnvironment();
const environmentConfig = environments[environment];

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false, // Disable parallel execution for more stability
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1, // Add a retry even in local development
  workers: 1, // Use only one worker to avoid resource contention
  reporter: 'html',
  timeout: 30000, // Increase global timeout to 30 seconds
  expect: {
    timeout: 10000, // Increase expect timeout to 10 seconds
    toHaveScreenshot: {
      threshold: 0.2, // Allow 20% of pixels to be different
      animations: 'disabled',
    },
  },
  use: {
    baseURL: environmentConfig.baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    actionTimeout: 15000, // Increase action timeout to 15 seconds
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  // Only configure webServer for local environment
  ...(environmentConfig.webServerCommand
    ? {
        webServer: {
          command: environmentConfig.webServerCommand,
          url: environmentConfig.baseURL,
          reuseExistingServer: !process.env.CI,
        },
      }
    : {}),
});
