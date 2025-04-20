import { doc, onSnapshot } from "firebase/firestore";

import { sessionsCollection } from "../firestore";
import { toSession } from "./mapper";
import { type Session } from "./types";

export function streamSession(
  sessionId: string,
  callback: (session: Session) => void,
  errorCallback: (error: Error) => void
) {
  const unsubscribe = onSnapshot(
    doc(sessionsCollection, sessionId),
    (doc) => {
      if (doc.exists()) {
        callback(toSession(doc));
        return;
      }
      errorCallback(new Error("Session not found"));
    },
    (error) => {
      errorCallback(error);
    }
  );

  return unsubscribe;
}
