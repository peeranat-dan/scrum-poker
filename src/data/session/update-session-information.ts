import { getActiveRound } from "../round/get-active-round";
import { getVotesByRoundId } from "../vote/get-votes-by-round-id";
import { getSessionById } from "./get-session-by-id";
import { type UpdateSessionInformationInput } from "./types";
import { updateSession } from "./update-session";

/**
 * Updates the information for a specific session.
 *
 * @param input - The input parameters for updating the session.
 * @param input.id - The ID of the session to update.
 * @param input.name - The new name for the session.
 * @param input.votingSystem - The new voting system for the session.
 *
 * @throws {Error} If the session is not found, already finished, or has existing votes when changing voting system.
 *
 * Note: We did not parse the input since we've parse it on the form
 */
export async function updateSessionInformation(
  input: UpdateSessionInformationInput
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

  updateSession({
    id: sessionId,
    name,
    votingSystem,
  });
}
