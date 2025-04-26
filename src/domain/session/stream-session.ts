import { streamSession as streamSessionData } from "@/data/session/stream-session";
import { type Session } from "./types";

export function streamSession(
  sessionId: string,
  callback: (session: Session) => void,
  errorCallback: (error: Error) => void
) {
  return streamSessionData(sessionId, callback, errorCallback);
}
