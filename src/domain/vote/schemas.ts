import { DomainEntitySchema } from "@/shared/zod/schemas/domain";
import { z } from "zod";

export const BaseVoteSchema = z.object({
  roundId: z.string(),
  participantId: z.string(),
  value: z.number(),
});

export const VoteSchema = DomainEntitySchema.merge(BaseVoteSchema);

export const CastVoteSchema = z.object({
  roundId: z.string(),
  participantId: z.string(),
  value: z.number(),
});

export const UpdateVoteValueSchema = z.object({
  id: z.string(),
  value: z.number(),
});

export const GetParticipantVoteByRoundIdSchema = VoteSchema.pick({
  roundId: true,
  participantId: true,
});
