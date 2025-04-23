import { z } from "zod";

export const VoteSchema = z.object({
  id: z.string(),
  roundId: z.string(),
  participantId: z.string(),
  value: z.number(),
  castAt: z.date(),
});

export const CastVoteSchema = z.object({
  roundId: z.string(),
  participantId: z.string(),
  value: z.number(),
});

export const UpdateVoteSchema = z.object({
  id: z.string(),
  value: z.number(),
});
