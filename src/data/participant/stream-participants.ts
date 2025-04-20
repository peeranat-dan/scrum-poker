import { onSnapshot, orderBy, query, where } from "firebase/firestore";
import { participantsCollection } from "../firestore";
import { toParticipant } from "./mapper";
import { type Participant } from "./types";

export function streamParticipants(
  sessionId: string,
  callback: (participants: Participant[]) => void
) {
  const q = query(
    participantsCollection,
    where("sessionId", "==", sessionId),
    where("deletedAt", "==", null),
    where("leftAt", "==", null),
    orderBy("joinedAt")
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const participants: Participant[] = [];

    // NOTE: forEach here is from querySnapshot, not from the forEach function in array
    // No need to convert to for const
    querySnapshot.forEach((doc) => {
      const participant = toParticipant(doc);
      participants.push(participant);
    });

    callback(participants);
  });

  return unsubscribe;
}
