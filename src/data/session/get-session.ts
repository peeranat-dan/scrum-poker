import { doc, getDoc } from 'firebase/firestore';

import { sessionsCollection } from '../firestore';
import { sessionMapper } from './mapper';

export async function getSession(id: string) {
  const sessionDoc = await getDoc(doc(sessionsCollection, id));

  if (!sessionDoc.exists()) {
    throw new Error('Session not found');
  }

  return sessionMapper.toSession(sessionDoc);
}
