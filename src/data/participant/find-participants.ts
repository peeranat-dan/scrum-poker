import {
  getDocs,
  query,
  type QueryConstraint,
  where,
} from "firebase/firestore";
import { participantsCollection } from "../firestore";
import { participantMapper } from "./mapper";
import { type FilterParticipantInput } from "./types";

export async function findParticipants(filter: FilterParticipantInput) {
  const constraints: QueryConstraint[] = [];
  for (const [field, value] of Object.entries(filter)) {
    if (value !== undefined) {
      constraints.push(where(field, "==", value));
    }
  }

  const q = query(participantsCollection, ...constraints);
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => participantMapper.toParticipant(doc));
}
