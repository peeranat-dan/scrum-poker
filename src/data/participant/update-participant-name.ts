import { type UpdateParticipantNameInput } from "@/types/participant.types";
import { doc, updateDoc } from "firebase/firestore";
import { participantsCollection } from "../firestore";

export async function updateParticipantName(input: UpdateParticipantNameInput) {
  const { participantId, name } = input;

  return await updateDoc(doc(participantsCollection, participantId), {
    displayName: name,
  });
}
