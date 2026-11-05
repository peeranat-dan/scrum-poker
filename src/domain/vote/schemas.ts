import { z } from 'zod';

import { DomainEntitySchema } from '@/shared/zod/schemas/domain';

export const BaseVoteSchema = z.object({
  roundId: z.string(),
  participantId: z.string(),
  value: z.number(),
});

export const VoteSchema = DomainEntitySchema.merge(BaseVoteSchema);
