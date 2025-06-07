import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

import { votesCollection } from '../firestore';
import { voteMapper } from './mapper';
import { type UpsertVoteInput } from './types';

export async function upsertVote(input: UpsertVoteInput) {
  const id = `${input.roundId}-${input.participantId}`;

  const voteDoc = await getDoc(doc(votesCollection, id));

  const createdAt = voteDoc.exists() ? voteMapper.toVote(voteDoc).createdAt : serverTimestamp();

  await setDoc(doc(votesCollection, id), {
    ...input,
    createdAt: createdAt ?? serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  const newVoteDoc = await getDoc(doc(votesCollection, id));

  return voteMapper.toVote(newVoteDoc);
}
