import oxfmtConfig from '@chanom/dev-config/oxfmt/config';
import { defineConfig } from 'oxfmt';

export default defineConfig({
  ...oxfmtConfig,
  ignorePatterns: [
    ...(oxfmtConfig.ignorePatterns ?? []),
    '.agents/**',
    'CHANGELOG.md',
    'public/**',
    'pnpm-lock.yaml',
    'src/routeTree.gen.ts',
  ],
  sortTailwindcss: {
    stylesheet: './src/index.css',
    functions: ['cn', 'cva', 'clsx'],
  },
});
