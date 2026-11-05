import type { ReactNode } from 'react';

import { motion, useReducedMotion } from 'motion/react';

import { getRevealMotion, REVEAL_EASE } from '@/lib/reveal-motion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before the reveal starts, used for staggering. */
  delay?: number;
  /** Adds a subtle blur that clears as the element settles. Keep for hero copy only. */
  blur?: boolean;
  /** Play on mount instead of when scrolled into view. */
  onMount?: boolean;
}

/**
 * Fades and lifts its children into place once, either on mount or the first
 * time they scroll into view. Respects `prefers-reduced-motion`.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  blur = false,
  onMount = false,
}: RevealProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const { initial, visible } = getRevealMotion(reducedMotion, blur);
  const transition = { duration: 0.6, ease: REVEAL_EASE, delay };

  return (
    <motion.div
      data-reveal
      className={className}
      initial={initial}
      {...(onMount
        ? { animate: { ...visible, transition } }
        : {
            whileInView: { ...visible, transition },
            viewport: { once: true, margin: '-80px' },
          })}
    >
      {children}
    </motion.div>
  );
}
