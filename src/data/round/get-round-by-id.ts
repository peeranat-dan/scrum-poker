import { doc, getDoc } from "firebase/firestore";
import { roundsCollection } from "../firestore";
import { roundConverter } from "./firestore-converter";

export async function getRoundById(id: string) {
  const roundDoc = await getDoc(doc(roundsCollection, id));

  if (!roundDoc.exists()) {
    throw new Error("Round not found");
  }

  return roundConverter(roundDoc);
}
