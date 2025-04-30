import { type Session } from "../session/types";
import { type Participant } from "./types";

export function canManageSession(participant: Participant) {
  return participant.role === "owner" || participant.role === "admin";
}

export function canRejoinSession(
  participant: Participant,
  session: Session | null
) {
  if (!participant) {
    throw new Error("Participant not found");
  }
  if (participant.status !== "left") {
    throw new Error("Participant has not left the session");
  }
  if (!session) {
    throw new Error("Session not found");
  }
  if (session.status !== "active") {
    throw new Error("Session is not active");
  }
  return true;
}

export function canLeaveSession(
  participant: Participant,
  session: Session | null
) {
  if (!participant) {
    throw new Error("Participant not found");
  }
  if (participant.status !== "active") {
    throw new Error("Participant is not active, cannot leave the session");
  }
  if (!session) {
    throw new Error("Session not found");
  }
  if (session.status === "finished") {
    throw new Error("Session is finished");
  }
  return true;
}

export function canBeRemoved(participant: Participant) {
  if (!participant) {
    throw new Error("Participant not found");
  }

  if (participant.status !== "active") {
    throw new Error("Participant is not active, cannot be removed");
  }
  return true;
}
