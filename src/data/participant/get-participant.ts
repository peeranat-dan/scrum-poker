import { doc, getDoc } from 'firebase/firestore';

import { participantsCollection } from '../firestore';
import { participantMapper } from './mapper';

export async function getParticipant(id: string) {
  const participantDoc = await getDoc(doc(participantsCollection, id));

  if (!participantDoc.exists()) {
    return null;
  }

  return participantMapper.toParticipant(participantDoc);
}
