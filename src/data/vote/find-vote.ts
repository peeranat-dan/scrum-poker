import { buildQueryConstraints } from '@/shared/firestore/utils';
import { getDocs, query } from 'firebase/firestore';
import { votesCollection } from '../firestore';
import { voteMapper } from './mapper';
import { type FindVoteInput } from './types';

export async function findVote(input: FindVoteInput) {
  const constraints = buildQueryConstraints({
    filter: input.filter,
    order: input.order,
    paging: {
      limit: 1,
    },
  });

  const q = query(votesCollection, ...constraints);
  const snapshot = await getDocs(q);

  return snapshot.empty ? null : voteMapper.toVote(snapshot.docs[0]);
}
