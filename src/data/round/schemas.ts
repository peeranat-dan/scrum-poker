import { z } from "zod";

export const roundStatuses = ["in-progress", "revealed", "finished"] as const;

export const RoundSchema = z.object({
  id: z.string(),
  sessionId: z.string(),
  status: z.enum(roundStatuses),
  revealedAt: z.date().nullable(),
  averageVote: z.number().nullable(),
  finishedAt: z.date().nullable(),
});

export const UpdateRoundSchema = RoundSchema.partial();
