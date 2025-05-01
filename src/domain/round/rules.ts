import { type Round } from "./types";

export function assertRoundExists(round: Round | null): asserts round is Round {
  if (!round) throw new Error("No previous round found");
}

/**
 * Asserts that the latest round is not null and not revealed.
 *
 * @param latestRound The latest round
 */
export function canStartNewRound(
  latestRound: Round | null
): asserts latestRound is Round {
  assertRoundExists(latestRound);

  if (latestRound.status !== "revealed") {
    throw new Error("Latest round is not revealed");
  }
}
