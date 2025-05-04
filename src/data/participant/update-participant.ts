import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';

import { participantsCollection } from '../firestore';
import { type UpdateParticipantInput } from './types';

export async function updateParticipant(id: string, input: UpdateParticipantInput) {
  await updateDoc(doc(participantsCollection, id), {
    ...input,
    updatedAt: serverTimestamp(),
  });
}
