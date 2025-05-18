import { ParticipantSchema } from '@/domain/participant/schemas';
import { type Participant } from '@/domain/participant/types';
import { assertValid } from '@/shared/zod/utils';
import { type DocumentData, type DocumentSnapshot } from 'firebase/firestore';
import { type ParticipantDoc } from './types';

function toParticipant(doc: DocumentSnapshot<ParticipantDoc, DocumentData>): Participant {
  const data = doc.data({
    serverTimestamps: 'estimate',
  });

  if (!data) {
    throw new Error('Participant not found');
  }

  return assertValid(ParticipantSchema, {
    id: doc.id,
    displayName: data.displayName,
    role: data.role,
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
    sessionId: data.sessionId,
    uid: data.uid,
    status: data.status,
  });
}

export const participantMapper = {
  toParticipant,
};
