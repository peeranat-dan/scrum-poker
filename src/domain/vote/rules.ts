import { type Round } from '../round/types';
import { type Vote } from './types';

export function canCastOrUpdateVote(round: Round | null) {
  if (!round) {
    throw new Error('Round not found');
  }
  if (round.status !== 'in-progress') {
    throw new Error('Round is not in progress');
  }
  return true;
}

export function canCastVote(round: Round | null) {
  if (!round) {
    throw new Error('Round not found');
  }
  if (round.status !== 'in-progress') {
    throw new Error('Round is not in progress');
  }
  return true;
}

export function canUpdateVoteValue(round: Round, vote: Vote | null) {
  if (!vote) {
    throw new Error('Vote not found');
  }
  if (round.status !== 'in-progress') {
    throw new Error('Round is not in progress');
  }
  if (vote.roundId !== round.id) {
    throw new Error('Vote does not belong to this round');
  }
  return true;
}
