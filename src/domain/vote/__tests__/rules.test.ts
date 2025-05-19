import { describe, expect, it } from 'vitest';

import { type Round } from '../../round/types';
import { canCastOrUpdateVote, canCastVote, canUpdateVoteValue } from '../rules';
import { type Vote } from '../types';

describe('vote rules', () => {
  describe('canCastVote', () => {
    it('throws error when round is null', () => {
      expect(() => canCastVote(null)).toThrowError(new Error('Round not found'));
    });

    it('throws error when round is not in progress', () => {
      const round = { status: 'revealed' } as Round;
      expect(() => canCastVote(round)).toThrowError(new Error('Round is not in progress'));
    });

    it('does not throw when round exists and is in progress', () => {
      const round = { status: 'in-progress' } as Round;
      expect(() => canCastVote(round)).not.toThrowError();
    });
  });

  describe('canUpdateVoteValue', () => {
    it('throws error when vote is null', () => {
      const round = { status: 'in-progress' } as Round;
      expect(() => canUpdateVoteValue(round, null)).toThrowError(new Error('Vote not found'));
    });

    it('throws error when round is not in progress', () => {
      const round = { status: 'revealed' } as Round;
      const vote = { roundId: round.id } as Vote;
      expect(() => canUpdateVoteValue(round, vote)).toThrowError(
        new Error('Round is not in progress'),
      );
    });

    it('does not throw when round exists and is in progress', () => {
      const round = { status: 'in-progress' } as Round;
      const vote = { roundId: round.id } as Vote;
      expect(() => canUpdateVoteValue(round, vote)).not.toThrowError();
    });

    it('throws error when vote does not belong to this round', () => {
      const round = { status: 'in-progress' } as Round;
      const vote = { roundId: 'other-round-id' } as Vote;
      expect(() => canUpdateVoteValue(round, vote)).toThrowError(
        new Error('Vote does not belong to this round'),
      );
    });
  });

  describe('canCastOrUpdateVote', () => {
    it('throws error when round is null', () => {
      expect(() => canCastOrUpdateVote(null)).toThrowError(new Error('Round not found'));
    });

    it('throws error when round is not in progress', () => {
      const round = { status: 'revealed' } as Round;
      expect(() => canCastOrUpdateVote(round)).toThrowError(new Error('Round is not in progress'));
    });

    it('does not throw when round exists and is in progress', () => {
      const round = { status: 'in-progress' } as Round;
      expect(() => canCastOrUpdateVote(round)).not.toThrowError();
    });
  });
});
