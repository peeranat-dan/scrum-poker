import { addDoc, Timestamp } from "firebase/firestore";

import { type CreateParticipantInput } from "@/types/participant.types";
import { participantsCollection } from "../firestore";

export async function createParticipant(input: CreateParticipantInput) {
  const participant = await addDoc(participantsCollection, {
    sessionId: input.sessionId,
    uid: input.uid,
    displayName:
      input?.displayName ?? import.meta.env.VITE_GAME_DEFAULT_PARTICIPANT_NAME,
    role: input.role,
    joinedAt: Timestamp.now(),
    deletedAt: null,
    leftAt: null,
  });

  return participant;
}
