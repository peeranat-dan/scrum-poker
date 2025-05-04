import { DomainEntitySchema } from '@/shared/zod/schemas/domain';
import { z } from 'zod';

export const participantRoles = ['owner', 'admin', 'player'] as const;
export const participantStatuses = ['active', 'left', 'removed'] as const;

export const BaseParticipantSchema = z.object({
  sessionId: z.string(),
  uid: z.string(),
  displayName: z.string(),
  role: z.enum(participantRoles),
  status: z.enum(participantStatuses),
});

export const ParticipantSchema = DomainEntitySchema.merge(BaseParticipantSchema);
