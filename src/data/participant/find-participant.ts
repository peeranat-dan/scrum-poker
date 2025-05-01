import { buildQueryConstraints } from "@/shared/firestore/utils";
import { getDocs, query } from "firebase/firestore";
import { participantsCollection } from "../firestore";
import { participantMapper } from "./mapper";
import { type FindParticipantInput } from "./types";

export async function findParticipant(input: FindParticipantInput) {
  const constraints = buildQueryConstraints({
    filter: input.filter,
    order: input.order,
    paging: {
      limit: 1,
    },
  });

  const q = query(participantsCollection, ...constraints);
  const snapshot = await getDocs(q);

  return snapshot.empty
    ? null
    : participantMapper.toParticipant(snapshot.docs[0]);
}
