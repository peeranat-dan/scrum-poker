import { describe, expect, it } from 'vitest';

import { getRevealMotion } from '../reveal-motion';

describe('getRevealMotion', () => {
  it('lifts and fades in by default', () => {
    expect(getRevealMotion(false)).toEqual({
      initial: { opacity: 0, transform: 'translateY(12px)' },
      visible: { opacity: 1, transform: 'translateY(0px)' },
    });
  });

  it('adds a clearing blur when requested', () => {
    const { initial, visible } = getRevealMotion(false, true);

    expect(initial.filter).toBe('blur(4px)');
    expect(visible.filter).toBe('blur(0px)');
  });

  it('only fades opacity when reduced motion is preferred', () => {
    expect(getRevealMotion(true, true)).toEqual({
      initial: { opacity: 0 },
      visible: { opacity: 1 },
    });
  });
});
