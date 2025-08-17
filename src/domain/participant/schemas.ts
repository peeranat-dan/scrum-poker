import { DomainEntitySchema } from '@/shared/zod/schemas/domain';
import { z } from 'zod';

export const participantRoles = ['owner', 'admin', 'player', 'spectator'] as const;
export const participantStatuses = ['active', 'left', 'removed'] as const;

export const BaseParticipantSchema = z.object({
  sessionId: z.string(),
  uid: z.string(),
  displayName: z.string(),
  role: z.enum(participantRoles),
  status: z.enum(participantStatuses),
  winStreak: z.number().default(0),
});

export const ParticipantSchema = DomainEntitySchema.merge(BaseParticipantSchema);
