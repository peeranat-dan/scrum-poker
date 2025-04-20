import { addDoc, serverTimestamp } from "firebase/firestore";

import { assertValid } from "@/shared/zod/utils";
import { participantsCollection } from "../firestore";
import { CreateParticipantSchema } from "./schemas";
import { type CreateParticipantInput } from "./types";

export async function createParticipant(input: CreateParticipantInput) {
  const { sessionId, uid, role, displayName } = assertValid(
    CreateParticipantSchema,
    input
  );

  const participant = await addDoc(participantsCollection, {
    sessionId: sessionId,
    uid: uid,
    displayName:
      displayName ?? import.meta.env.VITE_GAME_DEFAULT_PARTICIPANT_NAME,
    role: role,
    joinedAt: serverTimestamp(),
    deletedAt: null,
    leftAt: null,
    status: "active",
  });

  return participant;
}
