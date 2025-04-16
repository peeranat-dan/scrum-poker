import { type UpdateSesionInformationInput } from "@/types/session.types";
import { doc, updateDoc } from "firebase/firestore";
import { sessionsCollection } from "../firestore";
import { getActiveRound } from "../round/get-active-round";
import { getVotesByRoundId } from "../vote/get-votes-by-round-id";
import { getSessionById } from "./get-session-by-id";

export async function updateSessionInformation(
  input: UpdateSesionInformationInput
) {
  const { id: sessionId, name, votingSystem } = input;

  const session = await getSessionById(sessionId);

  if (!session) {
    throw new Error("Session not found");
  }

  if (session.status === "finished") {
    throw new Error("Session is finished");
  }

  if (session.votingSystem !== votingSystem) {
    const activeRound = await getActiveRound(sessionId);

    if (!activeRound) {
      throw new Error("Active round not found");
    }

    const votes = await getVotesByRoundId(activeRound.id);

    if (votes.length > 0) {
      throw new Error("Votes already exist for this round.");
    }
  }

  await updateDoc(doc(sessionsCollection, sessionId), {
    name,
    votingSystem: votingSystem,
  });
}
