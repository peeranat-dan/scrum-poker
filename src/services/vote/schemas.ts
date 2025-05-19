import { VoteSchema } from '@/domain/vote/schemas';
import { z } from 'zod';

export const CastVoteSchema = z.object({
  roundId: z.string().min(1),
  participantId: z.string().min(1),
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
