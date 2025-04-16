import { z } from "zod";

export const CreateSessionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Session name is required")
    .max(50, "Session name is too long"),
  votingSystem: z.enum(["fibonacci", "t-shirt"]),
});

export type CreateSessionInput = z.infer<typeof CreateSessionSchema>;

export const UserProfileSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(1, "Display name is required")
    .max(20, "Display name is too long"),
});

export type UserProfileInput = z.infer<typeof UserProfileSchema>;

export const JoinSessionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Session name is required")
    .max(20, "Session name is too long"),
});

export type JoinSessionInput = z.infer<typeof JoinSessionSchema>;

export const SessionInformationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Session name is required")
    .max(20, "Session name is too long"),
  votingSystem: z.enum(["fibonacci", "t-shirt"]),
});

export type SessionInformationInput = z.infer<typeof SessionInformationSchema>;
