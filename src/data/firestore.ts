import {
  collection,
  type CollectionReference,
  // connectFirestoreEmulator,
  type DocumentData,
  getFirestore,
} from 'firebase/firestore';

import { app } from './firebase';
import { type ParticipantDoc } from './participant/types';
import { type RoundDoc } from './round/types';
import { type SessionDoc } from './session/types';
import { type VoteDoc } from './vote/types';

const db = getFirestore(app);

// NOTE: This is only for development purposes
// connectFirestoreEmulator(db, "127.0.0.1", 8080);

function createCollection<T = DocumentData>(collectionName: string) {
  return collection(db, collectionName) as CollectionReference<T>;
}

const participantsCollection = createCollection<ParticipantDoc>('participants');
const roundsCollection = createCollection<RoundDoc>('rounds');
const sessionsCollection = createCollection<SessionDoc>('sessions');
const votesCollection = createCollection<VoteDoc>('votes');

export { participantsCollection, roundsCollection, sessionsCollection, votesCollection };
