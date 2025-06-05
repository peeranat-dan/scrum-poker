import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

import { votesCollection } from '../firestore';
import { type UpsertVoteInput } from './types';

export async function upsertVote(input: UpsertVoteInput) {
  const id = `${input.roundId}-${input.participantId}`;

  const voteDoc = await getDoc(doc(votesCollection, id));

  const createdAt = voteDoc.exists() ? voteDoc.data().createdAt : serverTimestamp();

  await setDoc(doc(votesCollection, id), {
    ...input,
    createdAt,
    updatedAt: serverTimestamp(),
  });

  return { id };
}
