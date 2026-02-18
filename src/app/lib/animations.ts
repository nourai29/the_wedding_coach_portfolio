import { useInView } from 'motion/react';
import { useRef } from 'react';
import { EASE_LUXURY } from './tokens';

export const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [...EASE_LUXURY],
    },
  },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
      ease: [...EASE_LUXURY],
    },
  },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
      ease: [...EASE_LUXURY],
    },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: [...EASE_LUXURY],
    },
  },
};

export function staggerContainer(stagger = 0.2, delay = 0.2) {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };
}

/**
 * Scroll-triggered animation hook.
 * By default replays each time the element scrolls into view.
 * Pass once = true to animate in once and stay visible.
 */
export function useScrollAnimation(amount = 0.2, once = false) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });
  return { ref, isInView };
}
