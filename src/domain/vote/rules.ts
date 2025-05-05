import { assertRoundExists } from '../round/rules';
import { type Round } from '../round/types';
import { type Vote } from './types';

export function assertVoteExists(vote: Vote | null): asserts vote is Vote {
  if (!vote) {
    throw new Error('Vote not found');
  }
}

export function canCastOrUpdateVote(round: Round | null) {
  assertRoundExists(round);
  if (round.status !== 'in-progress') {
    throw new Error('Round is not in progress');
  }
  return true;
}

export function canCastVote(round: Round | null) {
  assertRoundExists(round);
  if (round.status !== 'in-progress') {
    throw new Error('Round is not in progress');
  }
  return true;
}

export function canUpdateVoteValue(round: Round | null, vote: Vote | null) {
  assertVoteExists(vote);
  assertRoundExists(round);

  if (round.status !== 'in-progress') {
    throw new Error('Round is not in progress');
  }
  if (vote.roundId !== round.id) {
    throw new Error('Vote does not belong to this round');
  }

  return true;
}
