import { doc, updateDoc } from 'firebase/firestore';

import { roundsCollection } from '../firestore';
import { type UpdateRoundInput } from './types';

export async function updateRound(id: string, input: UpdateRoundInput) {
  await updateDoc(doc(roundsCollection, id), input);
}
