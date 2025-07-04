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
- [Tanstack Router](https://tanstack.com/router/latest)

## Architecture

This project follows a **Layered Architecture** to keep concerns separated and code maintainable.

### Layer Overview

| Layer         | Responsibility                                                           |
| ------------- | ------------------------------------------------------------------------ |
| **View**      | UI components – rendering data, user input, and interactions             |
| **Container** | Connects views with hooks and providers; handles UI logic and effects    |
| **Hook**      | Wraps React Query or side effects; bridges view with service/data layers |
| **Service**   | Business logic orchestration; handles use cases and validation           |
| **Domain**    | Pure business rules and validation logic, no side effects                |
| **Data**      | Talking to Firestore or external APIs (read/write/query)                 |
| **Shared**    | Utilities, constants, schemas used across layers                         |

### Folder Mapping

| Folder        | Layer                                         |
| ------------- | --------------------------------------------- |
| `components/` | View                                          |
| `containers/` | Container                                     |
| `hooks/`      | Hook                                          |
| `services/`   | Service                                       |
| `domain/`     | Domain                                        |
| `data/`       | Data                                          |
| `shared/`     | Shared                                        |
| `routes /`    | View                                          |
| `providers/`  | Context layer, often used in containers/pages |

### Where Should My Code Go?

Use these rules to decide where to contribute:

- ✅ Writing a UI component? → `components/`
- ✅ Calling Firestore or an API? → `data/`
- ✅ Writing business validation (e.g. "canVote")? → `domain/`
- ✅ Wrapping a mutation/query using React Query? → `hooks/`
- ✅ Creating a new flow or process (e.g. createSession)? → `services/`
- ✅ Adding common utility like date formatting? → `shared/`
- ✅ Adding a new route? → `routes/`

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

4. Install Firebase CLI

```bash
npm install -g firebase-tools
```

5. Install the dependencies.

```bash
pnpm install
```

6. Add all the required environment variables to the `.env` file. You can find the required environment variables in the `.env.example` file.
7. Start the development server.

```bash
pnpm dev
```

8. Open your browser and navigate to `http://localhost:5173` to access the application.

## How to start working on an issue

1. Go to issues page and find an issue that you want to work on.
2. Comment `/assign` in that post to assign the issue to yourself.
3. Create a new branch from the `develop` branch.
4. Make your changes and commit them.
5. Push your changes to your forked repository.
6. Create a pull request from your forked repository to the `develop` branch.

## Feature Requests

You can create a new feature request by opening a new issue in the repository. Please provide a clear and detailed description of the feature you would like to see implemented. If you are interested in implementing the feature yourself, please mention that in the issue.
