"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

/**
 * The numbered section header used throughout: a short rule, a mono
 * "NN. / Label" eyebrow, the heading itself, and an optional lede.
 */
export default function SectionHeading({
  index,
  label,
  title,
  description,
  className,
  titleClassName,
}) {
  const reduceMotion = useReducedMotion();

  return (
    <Reveal className={cn("space-y-4", className)}>
      <div className="flex items-center gap-3">
        {/* The rule draws out from the left as the heading settles. */}
        <motion.span
          className="w-8 h-px bg-primary/50 origin-left"
          initial={reduceMotion ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        />
        <span className="font-mono text-xs md:text-sm text-primary uppercase tracking-widest font-medium">
          {index}. / {label}
        </span>
      </div>

      <h2
        className={cn(
          "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.1]",
          titleClassName,
        )}
      >
        {title}
      </h2>

      {description ? (
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl leading-relaxed">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
