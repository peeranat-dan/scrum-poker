import { findRound } from "@/data/round/find-round";
import { getSession } from "@/data/session/get-session";
import { updateSession } from "@/data/session/update-session";
import { searchVotes } from "@/data/vote/search-votes";
import {
  assertSessionExists,
  assertSessionIsActive,
  shouldValidateVotingSystemChange,
} from "@/domain/session/rules";
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

  assertSessionExists(session);

  assertSessionIsActive(session);

  if (shouldValidateVotingSystemChange(session, votingSystem)) {
    const activeRound = await findRound({
      filter: { sessionId: sessionId, status: "in-progress" },
    });

    // NOTE: This is a sanity check and should never happen
    if (!activeRound) {
      throw new Error("Active round not found");
    }

    const votes = await searchVotes({
      filter: {
        roundId: activeRound.id,
      },
    });

    // NOTE: This is a service level validation, do not move this check to domain rules
    if (votes.length > 0) {
      throw new Error("Votes already exist for this round.");
    }
  }

  await updateSession(sessionId, {
    name,
    votingSystem,
  });
}
