import { z } from 'zod';

export const schema = z.object({
  firebase: z.object({
    apiKey: z.string().describe('Firebase API key'),
    authDomain: z.string().describe('Firebase Auth domain'),
    projectId: z.string().describe('Firebase Project ID'),
    storageBucket: z.string().describe('Firebase Storage bucket'),
    messagingSenderId: z.string().describe('Firebase Messaging sender ID'),
    appId: z.string().describe('Firebase App ID'),
  }),
  app: z.object({
    githubUrl: z.string().url().describe('App GitHub Repository URL'),
  }),
  game: z.object({
    defaultParticipantName: z.string().describe('Default participant name'),
  }),
});
