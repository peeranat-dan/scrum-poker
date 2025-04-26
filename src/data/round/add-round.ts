import { addDoc, serverTimestamp } from "firebase/firestore";
import { roundsCollection } from "../firestore";
import { type AddRoundInput } from "./types";

export async function addRound(input: AddRoundInput) {
  const round = await addDoc(roundsCollection, {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return round;
}
