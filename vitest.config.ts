import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  test: {
    exclude: ['e2e/**', 'node_modules', 'dist', '.idea', '.git', '.cache'],
  },
});
