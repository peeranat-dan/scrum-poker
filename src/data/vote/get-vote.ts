import { doc, getDoc } from 'firebase/firestore';

import { votesCollection } from '../firestore';
import { voteMapper } from './mapper';

export async function getVote(id: string) {
  const voteDoc = await getDoc(doc(votesCollection, id));

  if (!voteDoc.exists()) {
    return null;
  }

  return voteMapper.toVote(voteDoc);
}
