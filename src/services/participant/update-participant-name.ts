import { updateParticipant } from '@/data/participant/update-participant';
import { assertValid } from '@/shared/zod/utils';
import { UpdateParticipantNameSchema } from './schemas';
import { type UpdateParticipantNameInput } from './types';

export async function updateParticipantName(input: UpdateParticipantNameInput) {
  const { id, displayName } = assertValid(UpdateParticipantNameSchema, input);

  return await updateParticipant(id, { displayName });
}
