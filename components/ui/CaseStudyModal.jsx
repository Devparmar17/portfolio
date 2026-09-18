"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Maximize2, X } from "lucide-react";

import { brandStyle } from "@/lib/brandColors";
import { cn } from "@/lib/utils";
import Badge from "./Badge";
import TechIcon from "./TechIcon";

const EASE = [0.22, 1, 0.36, 1];

/** Fades each block in just after the panel settles. */
function Block({ children, delay = 0, reduceMotion, className }) {
  return (
    <motion.section
      className={className}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: EASE }}
    >
      {children}
    </motion.section>
  );
}

/**
 * Full-screen project detail. The uploaded case-study board is the real
 * content here, so it is rendered at full width and left scrollable rather
 * than cropped into a gallery.
 */
export default function CaseStudyModal({ project, onClose }) {
  const panelRef = useRef(null);
  /** "loading" | "loaded" | "error" — an absent board must not hang on a skeleton. */
  const [imageState, setImageState] = useState("loading");
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();
  const open = Boolean(project);

  // Portalled to <body> so the page's `z-10` wrapper and the decorative grid
  // overlay can't paint over the dialog.
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    setImageState("loading");

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    const id = window.setTimeout(() => panelRef.current?.focus(), 20);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(id);
    };
  }, [open, onClose]);

  const hasLive = project?.type === "live" && Boolean(project?.liveUrl);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] overflow-y-auto overscroll-contain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="fixed inset-0 bg-background/85 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} case study`}
            className="relative mx-auto w-full max-w-4xl bg-card border border-border/80 sm:my-8 sm:rounded-3xl shadow-xl outline-none overflow-hidden"
            initial={
              reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }
            }
            transition={{ duration: reduceMotion ? 0.15 : 0.35, ease: EASE }}
          >
            {/* Sticky bar keeps the close button reachable down a long board. */}
            <div className="sticky top-0 z-20 flex items-center justify-between gap-4 h-14 px-5 md:px-8 border-b border-border/60 bg-card/90 backdrop-blur-md">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground truncate">
                {project.type === "live" ? "Demo App" : "Case Study"}
                <span className="mx-2 opacity-40">/</span>
                {project.title}
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                className="inline-flex items-center justify-center h-10 w-10 -mr-2 shrink-0 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="px-5 md:px-10 py-8 md:py-12 space-y-10">
              {/* Header */}
              <Block reduceMotion={reduceMotion} className="space-y-5">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-px bg-primary/50" />
                  <span className="font-mono text-xs text-primary uppercase tracking-widest font-medium">
                    {project.role}
                  </span>
                </div>

                <div>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-[1.1]">
                    {project.title}
                  </h2>
                  <p className="text-base text-muted-foreground mt-2">
                    {project.subtitle}
                  </p>
                </div>

                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground/70">
                  {project.category}
                </p>

                <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
                  {project.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  {hasLive ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={brandStyle("live")}
                      className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-foreground text-background text-sm font-semibold shadow-sm transition-all duration-200 hover:bg-foreground/90 active:scale-95"
                    >
                      <span className="relative flex h-2 w-2 shrink-0">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--brand-live)] opacity-70" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--brand-live)]" />
                      </span>
                      Demo App
                      <ArrowUpRight
                        className="brand-icon w-4 h-4"
                        aria-hidden="true"
                      />
                    </a>
                  ) : null}

                  {project.behanceUrl ? (
                    <a
                      href={project.behanceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full border border-border/80 bg-background text-muted-foreground text-sm font-medium shadow-sm transition-all duration-200 hover:text-foreground hover:bg-muted/50 active:scale-95"
                    >
                      <TechIcon
                        name="behance"
                        className="w-4 h-4"
                        strokeWidth={2}
                      />
                      Behance
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                  ) : null}

                  {project.full ? (
                    <a
                      href={project.full}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full border border-border/80 bg-background text-muted-foreground text-sm font-medium shadow-sm transition-all duration-200 hover:text-foreground hover:bg-muted/50 active:scale-95"
                    >
                      <Maximize2 className="w-4 h-4" aria-hidden="true" />
                      Full size
                    </a>
                  ) : null}
                </div>
              </Block>

              {/* What I did */}
              {project.points?.length ? (
                <Block
                  reduceMotion={reduceMotion}
                  delay={0.06}
                  className="space-y-4"
                >
                  <h3 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    What I did
                  </h3>
                  <ul className="space-y-3">
                    {project.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-sm text-muted-foreground leading-relaxed"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 w-1 h-1 rounded-full bg-primary/60 shrink-0"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </Block>
              ) : null}

              {/* Process */}
              {project.stages?.length ? (
                <Block
                  reduceMotion={reduceMotion}
                  delay={0.12}
                  className="space-y-4"
                >
                  <h3 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    {project.stagesLabel ?? "Process"}
                  </h3>
                  <ol className="flex flex-wrap gap-2">
                    {project.stages.map((stage, i) => (
                      <li key={stage}>
                        <Badge
                          variant="tech"
                          className="inline-flex items-center gap-2"
                        >
                          <span className="font-mono text-[10px] text-muted-foreground/60">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {stage}
                        </Badge>
                      </li>
                    ))}
                  </ol>
                </Block>
              ) : null}

              {/* Tools */}
              {project.tech?.length ? (
                <Block
                  reduceMotion={reduceMotion}
                  delay={0.18}
                  className="space-y-4"
                >
                  <h3 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    Tools &amp; Skills
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <li key={tech}>
                        <Badge variant="tech">{tech}</Badge>
                      </li>
                    ))}
                  </ul>
                </Block>
              ) : null}

              {/* The board itself */}
              {project.full ? (
                <Block
                  reduceMotion={reduceMotion}
                  delay={0.24}
                  className="space-y-4"
                >
                  <h3 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    Full case study
                  </h3>

                  {imageState === "error" ? (
                    <p className="rounded-2xl border border-border/60 bg-muted/20 px-5 py-6 text-sm text-muted-foreground">
                      The case-study board hasn&apos;t been generated yet. Run{" "}
                      <code className="font-mono text-xs text-foreground">
                        node scripts/prepare-case-studies.mjs
                      </code>{" "}
                      to add it.
                    </p>
                  ) : (
                    <>
                      <div className="relative rounded-2xl overflow-hidden border border-border/60 bg-muted/20">
                        {imageState === "loading" ? (
                          <div
                            className="absolute inset-x-0 top-0 h-64 animate-pulse bg-muted/40"
                            aria-hidden="true"
                          />
                        ) : null}

                        {/*
                          A plain <img> on purpose: these boards run to ~30,000px
                          tall, past what the image optimiser will resize, and the
                          progressive JPEG paints top-down as it streams.
                        */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={project.full}
                          alt={project.fullAlt ?? `${project.title} case study`}
                          width={project.fullWidth}
                          height={project.fullHeight}
                          loading="lazy"
                          decoding="async"
                          onLoad={() => setImageState("loaded")}
                          onError={() => setImageState("error")}
                          className={cn(
                            "w-full h-auto block transition-opacity duration-500",
                            imageState === "loaded" ? "opacity-100" : "opacity-0",
                          )}
                        />
                      </div>

                      <p className="text-xs text-muted-foreground/60">
                        Long board — scroll to read, or open it full size above.
                      </p>
                    </>
                  )}
                </Block>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
