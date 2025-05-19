/**
 * Shared environment configuration
 *
 * This file defines environment configurations that can be used
 * across both Playwright configuration and test files.
 */
export interface EnvironmentConfig {
  baseURL: string;
  webServerCommand: string | null;
}

// Environment configuration
export const environments = {
  local: {
    baseURL: 'http://localhost:5173',
    webServerCommand: 'pnpm dev',
  },
  staging: {
    baseURL: 'https://e-mate-staging.ninprd.com',
    webServerCommand: null,
  },
  production: {
    baseURL: 'https://e-mate.ninprd.com',
    webServerCommand: null,
  },
} satisfies Record<string, EnvironmentConfig>;

// Define environment type
export type Environment = keyof typeof environments;

// Get the current environment
export function getCurrentEnvironment() {
  const env = process.env.TEST_ENV ?? 'local';
  return env as Environment;
}
