import { getDocs, query } from 'firebase/firestore';

import { buildQueryConstraints } from '@/shared/firestore/utils';
import { votesCollection } from '../firestore';
import { voteMapper } from './mapper';
import { type SearchVoteInput } from './types';

export async function searchVotes(input: SearchVoteInput) {
  const constraints = buildQueryConstraints(input);

  const q = query(votesCollection, ...constraints);
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => voteMapper.toVote(doc));
}
