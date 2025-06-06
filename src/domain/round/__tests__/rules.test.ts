import { describe, expect, it } from 'vitest';

import { assertRoundExists, canRevoteRound, canStartNewRound } from '../rules';
import { type Round } from '../types';

describe('round rules', () => {
  describe('assertRoundExists', () => {
    it('throws error when round is null', () => {
      expect(() => assertRoundExists(null)).toThrowError(new Error('Round not found'));
    });

    it('does not throw when round exists', () => {
      const round = { status: 'revealed' } as Round;
      expect(() => assertRoundExists(round)).not.toThrowError();
    });
  });

  describe('canStartNewRound', () => {
    it('throws error when round is null', () => {
      expect(() => canStartNewRound(null)).toThrowError(new Error('Round not found'));
    });

    it('throws error when round is not revealed', () => {
      const round = { status: 'in-progress' } as Round;
      expect(() => canStartNewRound(round)).toThrowError(new Error('Latest round is not revealed'));
    });

    it('does not throw when round exists and is revealed', () => {
      const round = { status: 'revealed' } as Round;
      expect(() => canStartNewRound(round)).not.toThrowError();
    });
  });

  describe('canRevoteRound', () => {
    it('throws error when round is null', () => {
      expect(() => canRevoteRound(null)).toThrowError(new Error('Round not found'));
    });

    it('throws error when round is not revealed', () => {
      const round = { status: 'in-progress' } as Round;
      expect(() => canRevoteRound(round)).toThrowError(new Error('Round is not revealed'));
    });

    it('does not throw when round exists and is revealed', () => {
      const round = { status: 'revealed' } as Round;
      expect(() => canRevoteRound(round)).not.toThrowError();
    });
  });
});
