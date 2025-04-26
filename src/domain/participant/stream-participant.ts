import { streamParticipant as streamParticipantData } from "@/data/participant/stream-participant";
import { type Participant } from "@/domain/participant/types";

export function streamParticipant(
  sessionId: string,
  uid: string,
  callback: (participant: Participant | undefined) => void,
  errorCallback: (error: Error) => void
) {
  return streamParticipantData(sessionId, uid, callback, errorCallback);
}
