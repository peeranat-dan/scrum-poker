/**
 * Test environment utilities
 *
 * This file provides access to environment variables and configuration
 * that can be used across all test files.
 */
import { environments, getCurrentEnvironment, type Environment } from '../config/environments';

// Get the current environment
export const environment = getCurrentEnvironment();

// Current environment configuration
export const currentEnv = environments[environment];

// Helper function to determine if we're running in a specific environment
export function isEnv(env: Environment) {
  return environment === env;
}

// Helper function to skip tests in specific environments
export function skipInEnv(env: Environment | Environment[]) {
  const envsToSkip = Array.isArray(env) ? env : [env];
  return envsToSkip.includes(environment);
}

// Helper function to run tests only in specific environments
export function onlyInEnv(env: Environment | Environment[]) {
  const envsToRun = Array.isArray(env) ? env : [env];
  return envsToRun.includes(environment);
}
