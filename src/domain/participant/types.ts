import { type z } from 'zod';
import { type ParticipantSchema } from './schemas';

export type Participant = z.infer<typeof ParticipantSchema>;
