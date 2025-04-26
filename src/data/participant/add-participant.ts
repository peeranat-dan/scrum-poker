import { addDoc, serverTimestamp } from "firebase/firestore";

import { participantsCollection } from "../firestore";
import { type AddParticipantInput } from "./types";

export async function addParticipant(input: AddParticipantInput) {
  const participant = await addDoc(participantsCollection, {
    sessionId: input.sessionId,
    uid: input.uid,
    displayName: input.displayName,
    role: input.role,
    status: input.status,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  // TODO: Get data and map for return
  return participant;
}
