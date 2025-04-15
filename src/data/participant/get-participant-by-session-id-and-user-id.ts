import { getDocs, limit, query, where } from "firebase/firestore";
import { participantsCollection } from "../firestore";
import { participantConverter } from "./firestore-converter";

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
  const data = participantConverter(participantDoc.docs[0]);

  return data;
}
