import { z } from 'zod';

import { DomainEntitySchema } from '@/shared/zod/schemas/domain';

export const participantRoles = ['owner', 'admin', 'player', 'spectator'] as const;
export const participantStatuses = ['active', 'left', 'removed'] as const;

export const BaseParticipantSchema = z.object({
  sessionId: z.string(),
  uid: z.string(),
  displayName: z.string(),
  role: z.enum(participantRoles),
  status: z.enum(participantStatuses),
});

export const ParticipantSchema = DomainEntitySchema.merge(BaseParticipantSchema);
