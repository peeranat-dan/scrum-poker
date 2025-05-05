import { getDocs, query } from 'firebase/firestore';

import { buildQueryConstraints } from '@/shared/firestore/utils';
import { roundsCollection } from '../firestore';
import { roundMapper } from './mapper';
import { type SearchRoundInput } from './types';

export async function searchRounds(input: SearchRoundInput) {
  const constraints = buildQueryConstraints(input);

  const q = query(roundsCollection, ...constraints);
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return [];
  }

  return snapshot.docs.map((doc) => roundMapper.toRound(doc));
}
