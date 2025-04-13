import { z } from "zod";

export const CreateSessionSchema = z.object({
  name: z.string().min(1, "Session name is required"),
  votingSystem: z.enum(["fibonacci", "t-shirt"]),
});

export type CreateSessionInput = z.infer<typeof CreateSessionSchema>;
