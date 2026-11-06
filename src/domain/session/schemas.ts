import { z } from 'zod';

import { votingSystemEnum } from '@/shared/zod/enum';
import { DomainEntitySchema } from '@/shared/zod/schemas/domain';

const sessionStatusEnum = z.enum(['active', 'finished']);

const BaseSessionSchema = z.object({
  name: z.string(),
  votingSystem: votingSystemEnum,
  status: sessionStatusEnum,
  ownerId: z.string(),
  issueTrackerUrl: z.string().nullable(),
});

export const SessionSchema = DomainEntitySchema.merge(BaseSessionSchema);
