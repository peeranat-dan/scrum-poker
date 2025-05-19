import { doc, getDoc } from 'firebase/firestore';

import { sessionsCollection } from '../firestore';
import { sessionMapper } from './mapper';

export async function getSession(id: string) {
  const sessionDoc = await getDoc(doc(sessionsCollection, id));

  if (!sessionDoc.exists()) {
    return null;
  }

  return sessionMapper.toSession(sessionDoc);
}
