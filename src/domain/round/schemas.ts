import { z } from 'zod';

import { DomainEntitySchema } from '@/shared/zod/schemas/domain';

export const roundStatuses = ['in-progress', 'revealed', 'finished'] as const;

const BaseRoundSchema = z.object({
  sessionId: z.string(),
  status: z.enum(roundStatuses),
  averageVote: z.number().nullable(),
  issueId: z.string().nullable(),
});

export const RoundSchema = DomainEntitySchema.merge(BaseRoundSchema);
