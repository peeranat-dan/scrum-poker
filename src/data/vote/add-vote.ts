import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

import { votesCollection } from '../firestore';
import { voteMapper } from './mapper';
import { type AddVoteInput } from './types';

export async function addVote(input: AddVoteInput) {
  const id = `${input.roundId}-${input.participantId}`;
  // NOTE: We use the roundId and participantId as the id to ensure that the vote is unique and to avoid race conditions
  await setDoc(doc(votesCollection, id), {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  const voteDoc = await getDoc(doc(votesCollection, id));

  return voteMapper.toVote(voteDoc);
}
