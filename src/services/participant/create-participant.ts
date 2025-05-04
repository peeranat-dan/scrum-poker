import { addParticipant } from '@/data/participant/add-participant';
import { assertValid } from '@/shared/zod/utils';

import { findParticipant } from '@/data/participant/find-participant';
import { CreateParticipantSchema } from './schemas';
import { type CreateParticipantInput } from './types';

export async function createParticipant(input: CreateParticipantInput) {
  const validInput = assertValid(CreateParticipantSchema, input);

  const existingParticipant = await findParticipant({
    filter: {
      sessionId: validInput.sessionId,
      uid: validInput.uid,
    },
  });

  if (existingParticipant) {
    return existingParticipant;
  }

  const participant = await addParticipant({
    sessionId: validInput.sessionId,
    uid: validInput.uid,
    displayName: validInput.displayName ?? import.meta.env.VITE_GAME_DEFAULT_PARTICIPANT_NAME,
    role: validInput.role,
    status: 'active',
  });

  return participant;
}
