import { getDocs, query } from "firebase/firestore";

import { buildQueryConstraints } from "@/shared/firestore/utils";
import { participantsCollection } from "../firestore";
import { participantMapper } from "./mapper";
import { type SearchParticipantInput } from "./types";

export async function searchParticipants(input: SearchParticipantInput) {
  const constraints = buildQueryConstraints(input);

  const q = query(participantsCollection, ...constraints);
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => participantMapper.toParticipant(doc));
}
