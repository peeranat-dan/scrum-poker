import { doc, getDoc } from "firebase/firestore";
import { sessionsCollection } from "../firestore";
import { sessionConverter } from "./firestore-converter";

export async function getSessionById(id: string) {
  const sessionDoc = await getDoc(doc(sessionsCollection, id));

  const data = sessionConverter(sessionDoc);

  return data;
}
