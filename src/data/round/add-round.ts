import { addDoc, doc, getDoc, serverTimestamp } from "firebase/firestore";

import { roundsCollection } from "../firestore";
import { roundMapper } from "./mapper";
import { type AddRoundInput } from "./types";

export async function addRound(input: AddRoundInput) {
  const roundRef = await addDoc(roundsCollection, {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  const roundDoc = await getDoc(doc(roundsCollection, roundRef.id));

  return roundMapper.toRound(roundDoc);
}
