import { doc, updateDoc } from "firebase/firestore";
import { participantsCollection } from "../firestore";
import { type UpdateParticipantNameInput } from "./types";
import { assertValid } from "@/shared/zod/utils";
import { UpdateParticipantNameSchema } from "./schemas";

export async function updateParticipantName(input: UpdateParticipantNameInput) {
  const { id, name } = assertValid(UpdateParticipantNameSchema, input);

  return await updateDoc(doc(participantsCollection, id), {
    displayName: name,
  });
}
