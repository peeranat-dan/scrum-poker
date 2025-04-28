import { addDoc, doc, getDoc, serverTimestamp } from "firebase/firestore";

import { participantsCollection } from "../firestore";
import { participantMapper } from "./mapper";
import { type AddParticipantInput } from "./types";

export async function addParticipant(input: AddParticipantInput) {
  const participantRef = await addDoc(participantsCollection, {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  const participantDoc = await getDoc(
    doc(participantsCollection, participantRef.id)
  );

  return participantMapper.toParticipant(participantDoc);
}
