import { streamParticipants as streamParticipantsData } from "@/data/participant/stream-participants";
import { type Participant } from "./types";

export function streamParticipants(
  sessionId: string,
  callback: (participants: Participant[]) => void
) {
  return streamParticipantsData(sessionId, callback);
}
