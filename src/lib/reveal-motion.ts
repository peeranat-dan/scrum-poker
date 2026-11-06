import type { TargetAndTransition } from 'motion/react';

/** Strong ease-out curve shared by landing page reveals. */
export const REVEAL_EASE = [0.23, 1, 0.32, 1] as const;

interface RevealMotion {
  initial: TargetAndTransition;
  visible: TargetAndTransition;
}

/**
 * Returns the hidden and visible states for a reveal animation.
 * Reduced motion keeps the opacity fade but drops movement and blur.
 * Uses full `transform` strings so motion@12 runs them off the main thread.
 */
export function getRevealMotion(reducedMotion: boolean, blur = false): RevealMotion {
  if (reducedMotion) {
    return { initial: { opacity: 0 }, visible: { opacity: 1 } };
  }

  return {
    initial: {
      opacity: 0,
      transform: 'translateY(12px)',
      ...(blur && { filter: 'blur(4px)' }),
    },
    visible: {
      opacity: 1,
      transform: 'translateY(0px)',
      ...(blur && { filter: 'blur(0px)' }),
    },
  };
}
