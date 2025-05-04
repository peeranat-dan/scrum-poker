import { Timestamp, type DocumentData, type DocumentSnapshot } from 'firebase/firestore';

import { type SessionDoc } from '@/data/session/types';
import { SessionSchema } from '@/domain/session/schemas';
import { type Session } from '@/domain/session/types';
import { assertValid } from '@/shared/zod/utils';

function toSession(doc: DocumentSnapshot<SessionDoc, DocumentData>): Session {
  const data = doc.data();

  if (!data) {
    throw new Error('Session not found');
  }

  return assertValid(SessionSchema, {
    id: doc.id,
    createdAt: data.createdAt.toDate(),
    name: data.name,
    votingSystem: data.votingSystem,
    status: data.status,
    ownerId: data.ownerId,
    updatedAt: data.updatedAt?.toDate(),
  });
}

function toSessionDoc(session: Session): SessionDoc {
  return {
    createdAt: Timestamp.fromDate(session.createdAt),
    updatedAt: Timestamp.fromDate(session.updatedAt),
    name: session.name,
    votingSystem: session.votingSystem,
    status: session.status,
    ownerId: session.ownerId,
  };
}

export const sessionMapper = {
  toSession,
  toSessionDoc,
};
