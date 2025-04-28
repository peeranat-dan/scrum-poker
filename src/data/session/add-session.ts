import { addDoc, doc, getDoc, serverTimestamp } from "firebase/firestore";

import { sessionsCollection } from "../firestore";
import { sessionMapper } from "./mapper";
import { type AddSessionInput } from "./types";

export async function addSession(input: AddSessionInput) {
  const session = await addDoc(sessionsCollection, {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  const sessionDoc = await getDoc(doc(sessionsCollection, session.id));

  return sessionMapper.toSession(sessionDoc);
}
