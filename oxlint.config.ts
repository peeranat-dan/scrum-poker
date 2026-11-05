import oxlintConfig from '@chanom/dev-config/oxlint/config';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [oxlintConfig],
  rules: {
    'react/only-export-components': ['warn', { allowConstantExport: true }],
    'no-duplicate-imports': 'error',
  },
  overrides: [
    {
      // Vendored shadcn/ui and magicui components
      files: ['src/components/ui/**', 'src/components/magicui/**'],
      rules: {
        'no-restricted-imports': 'off',
        'typescript/restrict-template-expressions': 'off',
        'react/only-export-components': 'off',
      },
    },
    {
      files: ['e2e/**'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
  ignorePatterns: ['src/routeTree.gen.ts'],
});
