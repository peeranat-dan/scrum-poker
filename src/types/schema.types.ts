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
