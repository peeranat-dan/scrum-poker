import { addDoc, Timestamp } from "firebase/firestore";

import { type CreateParticipantInput } from "@/types/participant.types";
import { participantsCollection } from "../firestore";

export async function createParticipant(input: CreateParticipantInput) {
  const participant = await addDoc(participantsCollection, {
    sessionId: input.sessionId,
    uid: input.uid,
    displayName:
      input?.displayName ?? import.meta.env.VITE_GAME_DEFAULT_PARTICIPANT_NAME,
    isOwner: input.isOwner,
    joinedAt: Timestamp.now(),
    deletedAt: null,
  });

  return participant;
}
