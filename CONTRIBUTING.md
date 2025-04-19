# Contributing to the project

Thanks for considering contributing to the project! We welcome contributions from the community to help make this project better.

Please kindly review the following guidelines before making any contributions.

## About this repository

This repository is a single page application (SPA) built with

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)
- [shadcn UI](https://ui.shadcn.com/)
- [Magic UI](https://magicui.design/)
- [React Hook Form](https://react-hook-form.com/)
- [zod](https://zod.dev/)
- [Tanstack Query](https://tanstack.com/query/latest)
- [Tanstack Table](https://tanstack.com/table/latest)
- [React Router](https://reactrouter.com/)

## Architecture

We use Layered Architecture to organize the codebase. The layers are as follows:

| Layer                | Description                                                                                       | Folders                                              |
| -------------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Presentation Layer   | Contains the UI components and views.                                                             | `assets`, `components`, `layouts`, `pages`, `styles` |
| Application Layer    | Contains the app logic, coordination between components, and interaction with domain/data layers. | `containers`, `hooks`, `providers`                   |
| Domain Layer         | Contains the the rules and logic.                                                                 | `lib/domain-name`, `data`, `types`                   |
| Infrastructure Layer | Handles technical details like third-party libraries, frameworks, database config.                | `main.tsx`, `data/firebase.ts`, `data/firestore.ts`  |

## Development

1. Fork the repository by clicking the "Fork" button at the top right corner of the repository page.
2. Clone the repository to your local machine.

```bash
git clone https://github.com/<your-username>/scrum-poker.git
```

3. Navigate to the project directory.

```bash
cd scrum-poker
```

4. Install the dependencies.

```bash
pnpm install
```

5. Add all the required environment variables to the `.env` file. You can find the required environment variables in the `.env.example` file.
6. Start the development server.

```bash
pnpm dev
```

7. Open your browser and navigate to `http://localhost:5173` to access the application.

## Feature Requests

You can create a new feature request by opening a new issue in the repository. Please provide a clear and detailed description of the feature you would like to see implemented. If you are interested in implementing the feature yourself, please mention that in the issue.

## Commit Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for commit messages. Please follow the following format:

```
<type>(<scope>): <subject>
```

- `<type>`: The type of the commit. It can be one of the following:
  - `feat`: A new feature.
  - `fix`: A bug fix.
  - `docs`: Documentation only changes.
  - `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
  - `refactor`: A code change that neither fixes a bug nor adds a feature.
  - `perf`: A code change that improves performance.
  - `test`: Adding missing tests or correcting existing tests.
  - `chore`: Changes to the build process or auxiliary tools and libraries such as documentation generation.
  - `revert`: Reverts a previous commit.
- `<scope>`: The scope of the commit. It can be any word that describes the scope of the commit.
- `<subject>`: A brief description of the commit. It should be no longer than 50 characters.

If you are interested in the detailed specification you can visit https://www.conventionalcommits.org/.
