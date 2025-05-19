import { schema } from './schema';

export const config = schema.parse({
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  },
  app: {
    githubUrl: import.meta.env.VITE_APP_GITHUB_URL,
  },
  game: {
    defaultParticipantName: import.meta.env.VITE_GAME_DEFAULT_PARTICIPANT_NAME,
  },
});

export default config;
