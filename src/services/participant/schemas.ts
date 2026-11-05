import { z } from 'zod';

import { ParticipantSchema } from '@/domain/participant/schemas';

export const CreateParticipantSchema = ParticipantSchema.extend({
  displayName: z.string().optional(),
}).pick({
  sessionId: true,
  uid: true,
  displayName: true,
  role: true,
});

export const UpdateParticipantNameSchema = ParticipantSchema.pick({
  id: true,
  displayName: true,
});
