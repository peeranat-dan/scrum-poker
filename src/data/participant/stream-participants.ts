import { type Participant } from '@/domain/participant/types';
import { onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { participantsCollection } from '../firestore';
import { participantMapper } from './mapper';

export function streamParticipants(
  sessionId: string,
  callback: (participants: Participant[]) => void,
) {
  const q = query(
    participantsCollection,
    where('sessionId', '==', sessionId),
    where('status', '==', 'active'),
    orderBy('displayName'),
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const participants: Participant[] = [];

    // NOTE: forEach here is from querySnapshot, not from the forEach function in array
    // No need to convert to for const
    querySnapshot.forEach((doc) => {
      const participant = participantMapper.toParticipant(doc);
      participants.push(participant);
    });

    callback(participants);
  });

  return unsubscribe;
}
