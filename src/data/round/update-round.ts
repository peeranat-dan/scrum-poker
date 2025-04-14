import { type UpdateRoundInput } from "@/types/round.types";
import { doc, updateDoc } from "firebase/firestore";
import { roundsCollection } from "../firestore";

export async function updateRound(input: UpdateRoundInput) {
  const { id, ...rest } = input;

  await updateDoc(doc(roundsCollection, id), rest);
}
