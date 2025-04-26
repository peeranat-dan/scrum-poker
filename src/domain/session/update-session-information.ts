import { findRound } from "@/data/round/find-round";
import { getSession } from "@/data/session/get-session";
import { updateSession } from "@/data/session/update-session";
import { searchVotes } from "@/data/vote/search-votes";
import { assertValid } from "@/shared/zod/utils";
import { UpdateSessionInformationSchema } from "./schemas";
import { type UpdateSessionInformationInput } from "./types";

export async function updateSessionInformation(
  input: UpdateSessionInformationInput
) {
  const {
    id: sessionId,
    name,
    votingSystem,
  } = assertValid(UpdateSessionInformationSchema, input);

  const session = await getSession(sessionId);

  if (!session) {
    throw new Error("Session not found");
  }

  if (session.status === "finished") {
    throw new Error("Session is finished");
  }

  if (session.votingSystem !== votingSystem) {
    const activeRound = await findRound({
      filter: { sessionId: sessionId, status: "in-progress" },
    });

    if (!activeRound) {
      throw new Error("Active round not found");
    }

    const votes = await searchVotes({
      filter: {
        roundId: activeRound.id,
      },
    });

    if (votes.length > 0) {
      throw new Error("Votes already exist for this round.");
    }
  }

  await updateSession(sessionId, {
    name,
    votingSystem,
  });
}
