import { type Session } from "@/types/session.types";
import { doc, onSnapshot } from "firebase/firestore";
import { sessionsCollection } from "../firestore";
import { sessionConverter } from "./firestore-converter";

export function streamSession(
  sessionId: string,
  callback: (session: Session) => void
) {
  const unsubscribe = onSnapshot(doc(sessionsCollection, sessionId), (doc) => {
    callback(sessionConverter(doc));
  });

  return unsubscribe;
}
