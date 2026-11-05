import { type Round } from './types';

export function assertRoundExists(round: Round | null): asserts round is Round {
  if (!round) throw new Error('Round not found');
}

/**
 * Asserts that the latest round is not null and not revealed.
 *
 * @param latestRound The latest round
 */
export function canStartNewRound(latestRound: Round | null): asserts latestRound is Round {
  assertRoundExists(latestRound);

  if (latestRound.status !== 'revealed') {
    throw new Error('Latest round is not revealed');
  }
}

/** Round statuses reached once the votes have been revealed */
export const revealedRoundStatuses: Round['status'][] = ['revealed', 'finished'];

/**
 * Checks whether the round's votes have been revealed, i.e. the round is `revealed` or `finished`.
 *
 * @param round The round
 */
export function hasRoundBeenRevealed(round: Round) {
  return revealedRoundStatuses.includes(round.status);
}

export function canRevoteRound(round: Round | null): asserts round is Round {
  assertRoundExists(round);

  if (round.status !== 'revealed') {
    throw new Error('Round is not revealed');
  }
}
