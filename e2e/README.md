# E2E Testing with Playwright

This directory contains end-to-end tests using Playwright for screenshot testing of the E-Mate.

## Running Tests

You can run the tests using the following npm scripts:

```bash
# Run all tests
pnpm test:e2e

# Run test for staging
pnpm test:e2e:staging

# Run test for production
pnpm test:e2e:prod
```

## First-time Setup

When running the tests for the first time, Playwright will generate baseline screenshots. These will be used for comparison in future test runs.

## Adding New Tests

To add new screenshot tests:

1. Create a new test file in this directory or add to the existing `screenshot.spec.ts`
2. Use the `toHaveScreenshot([environment, 'filename.png'], {...options})` assertion to capture and compare screenshots
3. Run with `--update-snapshots` flag when you intentionally change the UI

## CI Integration

The tests are configured to run in CI environments with appropriate retry settings and parallel execution disabled.
