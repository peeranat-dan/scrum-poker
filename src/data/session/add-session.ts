import { addDoc, serverTimestamp } from "firebase/firestore";

import { sessionsCollection } from "../firestore";
import { type AddSessionInput } from "./types";

export async function addSession(input: AddSessionInput) {
  const session = await addDoc(sessionsCollection, {
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    name: input.name,
    votingSystem: input.votingSystem,
    status: input.status,
    ownerId: input.ownerId,
  });

  return session;
}
