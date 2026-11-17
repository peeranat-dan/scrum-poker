import { z } from 'zod';

/**
 * Client env schema, shared by `createEnv` at runtime and `envPlugin` at build time.
 * Kept free of `import.meta.env` so `vite.config.ts` can import it.
 */
export const clientSchema = {
  VITE_FIREBASE_API_KEY: z.string().describe('Firebase API key'),
  VITE_FIREBASE_AUTH_DOMAIN: z.string().describe('Firebase Auth domain'),
  VITE_FIREBASE_PROJECT_ID: z.string().describe('Firebase Project ID'),
  VITE_FIREBASE_STORAGE_BUCKET: z.string().describe('Firebase Storage bucket'),
  VITE_FIREBASE_MESSAGING_SENDER_ID: z.string().describe('Firebase Messaging sender ID'),
  VITE_FIREBASE_APP_ID: z.string().describe('Firebase App ID'),
  VITE_APP_GITHUB_URL: z.url().describe('App GitHub Repository URL'),
  VITE_GAME_DEFAULT_PARTICIPANT_NAME: z.string().describe('Default participant name'),
  VITE_HIGHLIGHT_PROJECT_ID: z.string().optional().describe('Highlight project ID'),
};
