import { type Session } from "@/types/session.types";
import { doc, onSnapshot } from "firebase/firestore";
import { sessionsCollection } from "../firestore";
import { sessionConverter } from "./firestore-converter";

export function streamSession(
  sessionId: string,
  callback: (session: Session) => void,
  errorCallback: (error: Error) => void
) {
  const unsubscribe = onSnapshot(
    doc(sessionsCollection, sessionId),
    (doc) => {
      if (doc.exists()) {
        callback(sessionConverter(doc));
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
