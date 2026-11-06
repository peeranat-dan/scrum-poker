import { z } from 'zod';

const sessionNameSchema = z
  .string()
  .trim()
  .min(1, 'Session name is required')
  .max(20, 'Session name is too long');

const playerNameSchema = z
  .string()
  .trim()
  .min(1, 'Display name is required')
  .max(30, 'Display name is too long');

const votingSystemSchema = z.enum(['fibonacci', 't-shirt']);

const issueTrackerUrlSchema = z
  .string()
  .trim()
  .refine(
    (value) => value === '' || (/^https?:\/\//i.test(value) && URL.canParse(value)),
    'Issue tracker URL must start with http:// or https://',
  );

export const CreateSessionSchema = z.object({
  name: sessionNameSchema,
  votingSystem: votingSystemSchema,
});

export type CreateSessionInput = z.infer<typeof CreateSessionSchema>;

export const UserProfileSchema = z.object({
  displayName: playerNameSchema,
});

export type UserProfileInput = z.infer<typeof UserProfileSchema>;

export const JoinSessionSchema = z.object({
  name: playerNameSchema,
  role: z.enum(['player', 'spectator']),
});

export type JoinSessionInput = z.infer<typeof JoinSessionSchema>;

export const SessionInformationSchema = z.object({
  name: sessionNameSchema,
  votingSystem: votingSystemSchema,
  issueTrackerUrl: issueTrackerUrlSchema,
});

export type SessionInformationInput = z.infer<typeof SessionInformationSchema>;
