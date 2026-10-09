"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Children appear one after another once their chapter has settled, so a
 * chapter reads as a sequence rather than arriving all at once.
 */
function Beat({ children, index = 0, reduceMotion, className }) {
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0.2 : 0.45,
        delay: reduceMotion ? 0 : 0.12 + index * 0.07,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  );
}

function PersonaCard({ persona, index, reduceMotion }) {
  return (
    <Beat
      index={index}
      reduceMotion={reduceMotion}
      className="flex-1 min-w-0 rounded-2xl border border-border/80 bg-card p-5 md:p-6"
    >
      <p className="text-base font-semibold tracking-tight text-foreground">
        {persona.name}
      </p>
      <p className="text-sm text-muted-foreground mt-0.5">{persona.role}</p>
      {persona.meta ? (
        <p className="font-mono text-[11px] text-muted-foreground/70 mt-1">
          {persona.meta}
        </p>
      ) : null}

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-2">
            Pain points
          </p>
          <ul className="space-y-1.5">
            {persona.pains.map((pain) => (
              <li
                key={pain}
                className="flex gap-2 text-[13px] leading-relaxed text-muted-foreground"
              >
                <span
                  aria-hidden="true"
                  className="mt-[7px] w-1 h-1 rounded-full bg-destructive/70 shrink-0"
                />
                <span>{pain}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-2">
            Needs
          </p>
          <ul className="space-y-1.5">
            {persona.needs.map((need) => (
              <li
                key={need}
                className="flex gap-2 text-[13px] leading-relaxed text-muted-foreground"
              >
                <span
                  aria-hidden="true"
                  className="mt-[7px] w-1 h-1 rounded-full bg-[var(--brand-live)] shrink-0"
                />
                <span>{need}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Beat>
  );
}

/** Each chapter kind gets the shape that suits it, not one generic slab. */
function Chapter({ chapter, reduceMotion }) {
  if (chapter.kind === "problem") {
    return (
      <>
        <Beat reduceMotion={reduceMotion}>
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground text-balance">
            {chapter.title}
          </h3>
        </Beat>
        <Beat index={1} reduceMotion={reduceMotion}>
          <p className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground max-w-2xl">
            {chapter.body}
          </p>
        </Beat>
      </>
    );
  }

  if (chapter.kind === "quote") {
    return (
      <>
        <Beat reduceMotion={reduceMotion}>
          <Quote
            className="w-7 h-7 text-muted-foreground/40"
            aria-hidden="true"
          />
        </Beat>
        <Beat index={1} reduceMotion={reduceMotion}>
          <blockquote className="mt-4 text-base md:text-lg leading-relaxed text-foreground/90 max-w-3xl">
            {chapter.quote}
          </blockquote>
        </Beat>
        {chapter.tags?.length ? (
          <Beat index={2} reduceMotion={reduceMotion}>
            <ul className="mt-6 flex flex-wrap gap-2">
              {chapter.tags.map((tag) => (
                <li
                  key={tag}
                  className="px-3 py-1 rounded-full border border-border/80 bg-muted/40 font-mono text-[11px] text-muted-foreground"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </Beat>
        ) : null}
      </>
    );
  }

  if (chapter.kind === "personas") {
    return (
      <>
        <Beat reduceMotion={reduceMotion}>
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">
            {chapter.title}
          </h3>
        </Beat>
        <div className="mt-5 flex flex-col lg:flex-row gap-4">
          {chapter.personas.map((persona, i) => (
            <PersonaCard
              key={persona.name}
              persona={persona}
              index={i + 1}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </>
    );
  }

  if (chapter.kind === "solution") {
    return (
      <>
        <Beat reduceMotion={reduceMotion}>
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground text-balance">
            {chapter.title}
          </h3>
        </Beat>
        {chapter.body ? (
          <Beat index={1} reduceMotion={reduceMotion}>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground max-w-2xl">
              {chapter.body}
            </p>
          </Beat>
        ) : null}
        <ul className="mt-6 space-y-3 max-w-2xl">
          {chapter.bullets.map((bullet, i) => (
            <Beat
              key={bullet}
              index={i + 2}
              reduceMotion={reduceMotion}
              className="flex gap-3 items-start"
            >
              <span
                aria-hidden="true"
                className="mt-1 shrink-0 w-5 h-5 rounded-full bg-[var(--brand-live)]/15 text-[var(--brand-live)] font-mono text-[10px] flex items-center justify-center"
              >
                {i + 1}
              </span>
              <span className="text-sm leading-relaxed text-muted-foreground">
                {bullet}
              </span>
            </Beat>
          ))}
        </ul>
      </>
    );
  }

  if (chapter.kind === "process") {
    return (
      <>
        <Beat reduceMotion={reduceMotion}>
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">
            {chapter.title}
          </h3>
        </Beat>
        <ol className="mt-6 relative">
          {/* The rail is drawn behind the markers so the steps read as one
              run rather than separate rows. */}
          <span
            aria-hidden="true"
            className="absolute left-[11px] top-2 bottom-2 w-px bg-border"
          />
          {chapter.steps.map((step, i) => (
            <Beat
              key={step}
              index={i + 1}
              reduceMotion={reduceMotion}
              className="relative flex items-center gap-4 py-2"
            >
              <span
                aria-hidden="true"
                className="relative z-10 shrink-0 w-6 h-6 rounded-full border border-border bg-card text-muted-foreground font-mono text-[10px] flex items-center justify-center"
              >
                {i + 1}
              </span>
              <span className="text-sm text-foreground/90">{step}</span>
            </Beat>
          ))}
        </ol>
      </>
    );
  }

  if (chapter.kind === "screens") {
    return (
      <>
        <Beat reduceMotion={reduceMotion}>
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">
            {chapter.title}
          </h3>
        </Beat>
        <div className="mt-5 space-y-6">
          {chapter.shots.map((shot, i) => (
            <Beat key={shot.src} index={i + 1} reduceMotion={reduceMotion}>
              <figure>
                {/* Plain <img>: these are static board crops, already sized
                    and compressed by scripts, so the loader adds nothing. */}
                <img
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto rounded-xl border border-border/60 bg-muted/20"
                />
                {shot.caption ? (
                  <figcaption className="mt-2 text-xs text-muted-foreground/80">
                    {shot.caption}
                  </figcaption>
                ) : null}
              </figure>
            </Beat>
          ))}
        </div>
      </>
    );
  }

  return null;
}

/**
 * Chapter-by-chapter walkthrough of a case study: the few points that carry
 * the story, rather than the full board. Advances on click, arrow keys, or
 * the progress dots.
 */
export default function CaseStudyStory({ chapters, className }) {
  const reduceMotion = useReducedMotion();
  // Direction drives which way a chapter slides, so back feels like back.
  const [[index, direction], setPosition] = useState([0, 0]);
  const total = chapters?.length ?? 0;

  const goTo = useCallback(
    (next) => {
      setPosition(([current]) => {
        const clamped = Math.max(0, Math.min(total - 1, next));
        return [clamped, clamped >= current ? 1 : -1];
      });
    },
    [total],
  );

  useEffect(() => {
    const onKeyDown = (event) => {
      // Leave typing alone - the dialog has focusable controls of its own.
      const tag = event.target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setPosition(([c]) => [Math.min(total - 1, c + 1), 1]);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setPosition(([c]) => [Math.max(0, c - 1), -1]);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [total]);

  if (!total) return null;

  const chapter = chapters[index];
  const atStart = index === 0;
  const atEnd = index === total - 1;

  const slide = {
    enter: (dir) =>
      reduceMotion ? { opacity: 0 } : { opacity: 0, x: dir > 0 ? 36 : -36 },
    center: { opacity: 1, x: 0 },
    exit: (dir) =>
      reduceMotion ? { opacity: 0 } : { opacity: 0, x: dir > 0 ? -36 : 36 },
  };

  return (
    <section className={cn("space-y-5", className)} aria-label="Case study walkthrough">
      {/* Chapter rail */}
      <div className="flex items-center gap-3 flex-wrap">
        {chapters.map((item, i) => {
          const active = i === index;
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => goTo(i)}
              aria-current={active ? "step" : undefined}
              className={cn(
                "font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active
                  ? "border-foreground/30 bg-foreground text-background"
                  : "border-border/70 text-muted-foreground hover:text-foreground hover:bg-muted/50",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Stage. min-height stops the panel jumping between short and tall
          chapters as they swap. */}
      <div className="relative min-h-[18rem] rounded-2xl border border-border/80 bg-card/40 p-5 md:p-7 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={index}
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduceMotion ? 0.2 : 0.4, ease: EASE }}
          >
            <Chapter chapter={chapter} reduceMotion={reduceMotion} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4">
        <p
          className="font-mono text-[11px] text-muted-foreground"
          aria-live="polite"
        >
          {index + 1} / {total} - {chapter.label}
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            disabled={atStart}
            aria-label="Previous chapter"
            className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-border/80 text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50 disabled:opacity-35 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            disabled={atEnd}
            aria-label="Next chapter"
            className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-border/80 text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50 disabled:opacity-35 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
