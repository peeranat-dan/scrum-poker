# Package Manager

pnpm@9.14.2

# Bash Command

pnpm install: install dependencies
pnpm dev: start development server
pnpm build: build production version
pnpm lint: lint code
pnpm test: run unit tests
pnpm format: format code

# Development Workflow

- After running claude code, try running pnpm run build, pnpm run lint, and pnpm test.

# Code Architecture

Refering to the code architecture document in the CONTRIBUTING.md file

# Code style

- Use ES modules (import/export) syntax, not CommonJS (require)
- Destructure imports when possible (eg. import { foo } from 'bar')
- Use kebab-case for file names
- Create index.ts file with export * from './file' for each directory
- Use single quotes for strings
- Use const for variables that don't need to be re-assigned
- Don't use enum, use const objects with 'as const' or union string instead
- Use nullish coalescing operator (??) over logical or (||) for default values
- Use template literals for multi-line strings
- Use function declarations for top level functions and arrow functions for everything else
- When declaring a component, please use object declaration instead of switch statement
- Add unit tests for all hooks and components
- Add e2e tests for all flows
- When adding new features, add in README.md
- When implementing new components, data layer function, or domain services, please add JSDoc comments