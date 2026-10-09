"use client";

import { Fragment, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import { cn } from "@/lib/utils";

export const EASE = [0.22, 1, 0.36, 1];

/** Fades and lifts its children the first time they reach the viewport. */
export function Rise({ children, delay = 0, y = 24, className, as = "div" }) {
  const reduceMotion = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  return (
    <Tag
      className={className}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reduceMotion ? 0.25 : 0.6, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/**
 * Reveals a heading word by word. Falls back to a plain fade when the visitor
 * has asked for reduced motion, so nothing animates per-word.
 */
export function RevealText({ text, className, delay = 0 }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <motion.span
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay }}
      >
        {text}
      </motion.span>
    );
  }

  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: "0.4em" }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: delay + i * 0.045, ease: EASE }}
          >
            {word}
          </motion.span>
          {/*
            The space lives between the spans as an ordinary text node, not
            inside them. Inside, it would be a non-breaking space and the
            heading could never wrap - which pushes the whole page wider
            than the screen on a phone.
          */}
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}

/** Drifts its children against the scroll. No-op under reduced motion. */
export function Parallax({ children, distance = 60, className }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduceMotion ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}

/** Thin bar across the top showing how far through the study you are. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] origin-left bg-foreground z-[60]"
    />
  );
}

/** Section shell: number, label, heading, and a consistent rhythm. */
export function Chapter({ index, label, title, lead, children, className, id }) {
  return (
    <section
      id={id}
      className={cn("w-full px-5 md:px-8 py-20 md:py-28", className)}
    >
      <div className="max-w-6xl mx-auto">
        <Rise className="flex items-center gap-3 mb-5">
          <span className="font-mono text-[11px] text-muted-foreground/70">
            {String(index).padStart(2, "0")}
          </span>
          <span
            aria-hidden="true"
            className="h-px w-8 bg-border"
          />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {label}
          </span>
        </Rise>

        {title ? (
          <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight text-foreground text-balance max-w-3xl">
            <RevealText text={title} />
          </h2>
        ) : null}

        {lead ? (
          <Rise delay={0.1}>
            <p className="mt-5 text-base md:text-lg leading-relaxed text-muted-foreground max-w-2xl">
              {lead}
            </p>
          </Rise>
        ) : null}

        <div className={cn(title || lead ? "mt-12" : "mt-2")}>{children}</div>
      </div>
    </section>
  );
}

/** Marks content the case study genuinely does not record. */
export function NotDocumented({ what }) {
  return (
    <p className="rounded-xl border border-dashed border-border px-4 py-3 font-mono text-xs text-muted-foreground/80">
      Not documented - {what}
    </p>
  );
}
