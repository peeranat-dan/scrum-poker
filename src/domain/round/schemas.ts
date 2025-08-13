import { DomainEntitySchema } from '@/shared/zod/schemas/domain';
import { z } from 'zod';

export const roundStatuses = ['in-progress', 'revealed', 'finished'] as const;

const BaseRoundSchema = z.object({
  sessionId: z.string(),
  status: z.enum(roundStatuses),
  averageVote: z.number().nullable(),
  originalEstimate: z.number().nullable(),
});

export const RoundSchema = DomainEntitySchema.merge(BaseRoundSchema);
