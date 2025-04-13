import { addDoc, Timestamp } from "firebase/firestore";

import { type CreateParticipantInput } from "@/types/participant.types";
import { participantsCollection } from "../firestore";

export async function createParticipant(input: CreateParticipantInput) {
  const participant = await addDoc(participantsCollection, {
    sessionId: input.sessionId,
    uid: input.uid,
    displayName: "John Doe",
    isOwner: input.isOwner,
    joinedAt: Timestamp.now(),
  });

  return participant;
}
