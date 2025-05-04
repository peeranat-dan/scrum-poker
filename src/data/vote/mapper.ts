import { VoteSchema } from '@/domain/vote/schemas';
import { type Vote } from '@/domain/vote/types';
import { assertValid } from '@/shared/zod/utils';
import { type DocumentData, type DocumentSnapshot } from 'firebase/firestore';
import { type VoteDoc } from './types';

function toVote(doc: DocumentSnapshot<VoteDoc, DocumentData>): Vote {
  const data = doc.data();

  if (!data) {
    throw new Error('Vote not found');
  }

  return assertValid(VoteSchema, {
    id: doc.id,
    roundId: data.roundId,
    participantId: data.participantId,
    value: data.value,
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
  });
}

export const voteMapper = {
  toVote,
};
