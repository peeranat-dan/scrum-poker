import { doc, onSnapshot } from 'firebase/firestore';

import { type Session } from '@/domain/session/types'; // This is exception for streaming
import { sessionsCollection } from '../firestore';

export function streamSession(
  sessionId: string,
  callback: (session: Session) => void,
  errorCallback: (error: Error) => void,
) {
  const unsubscribe = onSnapshot(
    doc(sessionsCollection, sessionId),
    (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        callback({
          id: doc.id,
          name: data.name,
          votingSystem: data.votingSystem,
          status: data.status,
          ownerId: data.ownerId,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
        });
        return;
      }
      errorCallback(new Error('Session not found'));
    },
    (error) => {
      errorCallback(error);
    },
  );

  return unsubscribe;
}
