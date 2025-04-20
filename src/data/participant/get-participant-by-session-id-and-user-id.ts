import { getDocs, limit, query, where } from "firebase/firestore";

import { participantsCollection } from "../firestore";
import { toParticipant } from "./mapper";

export async function getParticipantBySessionIdAndUserId(
  sessionId: string,
  userId: string
) {
  const participantDoc = await getDocs(
    query(
      participantsCollection,
      where("sessionId", "==", sessionId),
      where("uid", "==", userId),
      limit(1)
    )
  );

  if (participantDoc.empty) {
    return null;
  }

  // NOTE: We are assuming that there is only one participant with the same sessionId and userId
  const data = toParticipant(participantDoc.docs[0]);

  return data;
}
