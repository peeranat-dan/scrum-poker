import { type Session } from "./types";

export function assertSessionExists(
  session: Session | null
): asserts session is Session {
  if (!session) throw new Error("Session not found");
}

export function assertSessionIsActive(session: Session) {
  if (session.status === "finished") {
    throw new Error("Session is finished");
  }
}

export function shouldValidateVotingSystemChange(
  session: Session,
  newVotingSystem: string | undefined
): boolean {
  return session.votingSystem !== newVotingSystem;
}
