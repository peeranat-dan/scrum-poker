import { doc, getDoc } from "firebase/firestore";

import { sessionsCollection } from "../firestore";
import { toSession } from "./mapper";

export async function getSessionById(id: string) {
  const sessionDoc = await getDoc(doc(sessionsCollection, id));

  const data = toSession(sessionDoc);

  return data;
}
