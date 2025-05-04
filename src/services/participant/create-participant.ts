import config from '@/config';
import { addParticipant } from '@/data/participant/add-participant';
import { findParticipant } from '@/data/participant/find-participant';
import { assertValid } from '@/shared/zod/utils';
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
    displayName: validInput.displayName ?? config.game.defaultParticipantName,
    role: validInput.role,
    status: 'active',
  });

  return participant;
}
