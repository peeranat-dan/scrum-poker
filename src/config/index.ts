import { env } from './env';

export * from './env';
export * from './env-schema';

export const config = {
  firebase: {
    apiKey: env.VITE_FIREBASE_API_KEY,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.VITE_FIREBASE_APP_ID,
  },
  app: {
    githubUrl: env.VITE_APP_GITHUB_URL,
    highlightProjectId: env.VITE_HIGHLIGHT_PROJECT_ID,
  },
  game: {
    defaultParticipantName: env.VITE_GAME_DEFAULT_PARTICIPANT_NAME,
  },
} as const;

export default config;
