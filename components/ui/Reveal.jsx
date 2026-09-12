"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Scroll-triggered entrance animation.
 *
 * When the visitor prefers reduced motion this degrades to a short opacity
 * fade with no movement, rather than being disabled outright — the content
 * still arrives, it just stops sliding.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
  y = 20,
  x = 0,
  scale = 1,
  amount = 0.2,
  once = true,
}) {
  const reduceMotion = useReducedMotion();

  const hidden = reduceMotion ? { opacity: 0 } : { opacity: 0, y, x, scale };
  const visible = reduceMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, x: 0, scale: 1 };

  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={visible}
      viewport={{ once, amount }}
      transition={{
        duration: reduceMotion ? 0.25 : duration,
        delay: reduceMotion ? 0 : delay,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  );
}
