import { type z } from 'zod';
import {
  type CastVoteSchema,
  type GetParticipantVoteByRoundIdSchema,
  type UpdateVoteValueSchema,
} from './schemas';

export type CastVoteInput = z.infer<typeof CastVoteSchema>;

export type UpdateVoteValueInput = z.infer<typeof UpdateVoteValueSchema>;

export type GetParticipantVoteByRoundIdInput = z.infer<typeof GetParticipantVoteByRoundIdSchema>;
