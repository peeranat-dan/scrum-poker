import { doc, getDoc } from "firebase/firestore";
import { roundsCollection } from "../firestore";
import { toRound } from "./mapper";

export async function getRoundById(id: string) {
  const roundDoc = await getDoc(doc(roundsCollection, id));

  if (!roundDoc.exists()) {
    throw new Error("Round not found");
  }

  return toRound(roundDoc);
}
