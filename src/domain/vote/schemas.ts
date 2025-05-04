import { DomainEntitySchema } from '@/shared/zod/schemas/domain';
import { z } from 'zod';

export const BaseVoteSchema = z.object({
  roundId: z.string(),
  participantId: z.string(),
  value: z.number(),
});

export const VoteSchema = DomainEntitySchema.merge(BaseVoteSchema);
