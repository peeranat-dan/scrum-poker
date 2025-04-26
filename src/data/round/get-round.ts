import { doc, getDoc } from "firebase/firestore";

import { roundsCollection } from "../firestore";
import { roundMapper } from "./mapper";

export async function getRound(id: string) {
  const roundDoc = await getDoc(doc(roundsCollection, id));

  return roundMapper.toRound(roundDoc);
}
