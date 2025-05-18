import { type DocumentData, type DocumentSnapshot } from 'firebase/firestore';

import { RoundSchema } from '@/domain/round/schemas';
import { type Round } from '@/domain/round/types';
import { assertValid } from '@/shared/zod/utils';
import { type RoundDoc } from './types';

function toRound(doc: DocumentSnapshot<RoundDoc, DocumentData>): Round {
  const data = doc.data({
    serverTimestamps: 'estimate',
  });

  if (!data) {
    throw new Error('Round not found');
  }

  return assertValid(RoundSchema, {
    id: doc.id,
    sessionId: data.sessionId,
    status: data.status,
    averageVote: data.averageVote,
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
  });
}

export const roundMapper = {
  toRound,
};
