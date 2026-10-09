"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import TechIcon from "@/components/ui/TechIcon";
import {
  Chapter,
  NotDocumented,
  Parallax,
  RevealText,
  Rise,
  ScrollProgress,
  EASE,
} from "./primitives";

/* -------------------------------------------------------------------------- */
/* Sections                                                                    */
/* -------------------------------------------------------------------------- */

function Hero({ project }) {
  const reduceMotion = useReducedMotion();
  const cs = project.caseStudy;

  return (
    <header className="relative w-full px-5 md:px-8 pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <Rise y={12}>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            All work
          </Link>
        </Rise>

        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          {project.category}
        </p>

        <h1 className="mt-4 font-display text-4xl md:text-7xl font-semibold tracking-tight text-foreground text-balance">
          <RevealText text={project.title} />
        </h1>

        {project.subtitle ? (
          <Rise delay={0.15}>
            <p className="mt-5 text-lg md:text-2xl text-muted-foreground max-w-3xl text-balance">
              {project.subtitle}
            </p>
          </Rise>
        ) : null}

        {project.behanceUrl || project.liveUrl ? (
          <Rise delay={0.2} className="mt-9 flex flex-wrap gap-3">
            {project.behanceUrl ? (
              <a
                href={project.behanceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full border border-border/80 bg-background text-sm font-medium text-muted-foreground shadow-sm transition-all duration-200 hover:text-foreground hover:bg-muted/50 active:scale-95"
              >
                <TechIcon name="behance" className="w-4 h-4" strokeWidth={2} />
                Full case study on Behance
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            ) : null}

            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-foreground text-background text-sm font-semibold shadow-sm transition-all duration-200 hover:bg-foreground/90 active:scale-95"
              >
                Open the live app
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            ) : null}
          </Rise>
        ) : null}

        {cs?.chapters?.find((c) => c.kind === "screens")?.shots?.[0] ? (
          <Parallax distance={40} className="mt-14 md:mt-20">
            <motion.div
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: reduceMotion ? 0.3 : 0.9, ease: EASE }}
              className="rounded-2xl overflow-hidden border border-border/60 bg-muted/20"
            >
              <img
                src={cs.chapters.find((c) => c.kind === "screens").shots[0].src}
                alt={cs.chapters.find((c) => c.kind === "screens").shots[0].alt}
                className="w-full h-auto"
              />
            </motion.div>
          </Parallax>
        ) : null}
      </div>
    </header>
  );
}

function Overview({ index, project }) {
  const o = project.caseStudy?.overview;

  const rows = [
    ["Goal", o?.goal ?? project.description],
    ["Role", o?.role ?? project.role],
    ["Timeline", o?.timeline ?? project.timeline],
    ["Tools", (o?.tools ?? project.tech)?.join(", ")],
  ];

  return (
    <Chapter index={index} label="Overview" title="What this project is">
      <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
        {rows.map(([term, value], i) => (
          <Rise key={term} delay={i * 0.06}>
            <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70 mb-2">
              {term}
            </dt>
            <dd className="text-base leading-relaxed text-foreground/90">
              {value || <NotDocumented what={`no ${term.toLowerCase()} recorded`} />}
            </dd>
          </Rise>
        ))}
      </dl>
    </Chapter>
  );
}

function ProblemSection({ index, chapter }) {
  return (
    <Chapter index={index} label="The Problem" className="bg-muted/20">
      <h2 className="font-display text-3xl md:text-6xl font-semibold tracking-tight text-foreground text-balance max-w-4xl">
        <RevealText text={chapter.title} />
      </h2>
      <Rise delay={0.2}>
        <p className="mt-8 text-lg md:text-xl leading-relaxed text-muted-foreground max-w-3xl">
          {chapter.body}
        </p>
      </Rise>
    </Chapter>
  );
}

function Insights({ index, insights, quote }) {
  return (
    <Chapter
      index={index}
      label="Research Insights"
      title="What the research surfaced"
    >
      {quote ? (
        <Rise>
          <blockquote className="mb-12 text-base md:text-lg leading-relaxed text-foreground/85 border-l-2 border-border pl-6 max-w-3xl">
            {quote}
          </blockquote>
        </Rise>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {insights.map((item, i) => (
          <Rise key={item.label} delay={i * 0.08}>
            <article className="group h-full rounded-2xl border border-border/80 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <span className="font-mono text-[10px] text-muted-foreground/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-foreground">
                {item.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </article>
          </Rise>
        ))}
      </div>
    </Chapter>
  );
}

function Personas({ index, personas }) {
  return (
    <Chapter
      index={index}
      label="User Persona"
      title="Who this is for"
      className="bg-muted/20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {personas.map((persona, i) => (
          <Rise key={persona.name} delay={i * 0.1}>
            <article className="h-full rounded-2xl border border-border/80 bg-card p-6 md:p-8">
              <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                {persona.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{persona.role}</p>
              {persona.meta ? (
                <p className="font-mono text-[11px] text-muted-foreground/70 mt-1">
                  {persona.meta}
                </p>
              ) : null}

              <div className="mt-7 space-y-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70 mb-3">
                    Pain points
                  </p>
                  <ul className="space-y-2">
                    {persona.pains.map((pain) => (
                      <li
                        key={pain}
                        className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[7px] w-1.5 h-1.5 rounded-full bg-destructive/70 shrink-0"
                        />
                        {pain}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70 mb-3">
                    Needs
                  </p>
                  <ul className="space-y-2">
                    {persona.needs.map((need) => (
                      <li
                        key={need}
                        className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[var(--brand-live)] shrink-0"
                        />
                        {need}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </Rise>
        ))}
      </div>
    </Chapter>
  );
}

function Journey({ index, journey }) {
  const [open, setOpen] = useState(0);

  return (
    <Chapter index={index} label="User Journey" title={journey.label}>
      <ol className="relative">
        {/* Connector behind the markers ties the stages into one run. */}
        <span
          aria-hidden="true"
          className="absolute left-[15px] top-4 bottom-4 w-px bg-border md:left-1/2"
        />

        {journey.stages.map((stage, i) => {
          const isOpen = open === i;
          return (
            <Rise key={stage.stage} delay={Math.min(i * 0.05, 0.3)}>
              <li className="relative pl-11 md:pl-0 py-2">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className={cn(
                    // block, not the button default inline-block, or
                    // ml-auto cannot push the card to the right.
                    "block w-full text-left rounded-2xl border px-5 py-4 transition-all duration-300",
                    "md:w-[calc(50%-2rem)]",
                    i % 2 === 1 ? "md:ml-auto" : "",
                    isOpen
                      ? "border-foreground/25 bg-card shadow-sm"
                      : "border-border/70 bg-card/50 hover:border-border hover:bg-card",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute left-2 top-6 w-7 h-7 rounded-full border flex items-center justify-center font-mono text-[10px] transition-colors",
                      "md:left-1/2 md:-translate-x-1/2",
                      isOpen
                        ? "border-foreground/30 bg-foreground text-background"
                        : "border-border bg-card text-muted-foreground",
                    )}
                  >
                    {i + 1}
                  </span>

                  <p className="font-display text-base font-semibold text-foreground">
                    {stage.stage}
                  </p>
                  <p className="mt-1 text-[13px] text-muted-foreground">
                    {stage.feeling}
                  </p>

                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 space-y-3">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-destructive/80">
                          Pain
                        </p>
                        <p className="text-[13px] text-muted-foreground mt-1">
                          {stage.pain}
                        </p>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--brand-live)]">
                          Opportunity
                        </p>
                        <p className="text-[13px] text-muted-foreground mt-1">
                          {stage.opportunity}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </button>
              </li>
            </Rise>
          );
        })}
      </ol>
    </Chapter>
  );
}

function Process({ index, steps, label }) {
  return (
    <Chapter
      index={index}
      label="Design Process"
      title={label}
      className="bg-muted/20"
    >
      <div className="flex flex-wrap gap-3">
        {steps.map((step, i) => (
          <Rise key={step} delay={Math.min(i * 0.05, 0.35)}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-card px-4 py-2">
              <span className="font-mono text-[10px] text-muted-foreground/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm text-foreground/90">{step}</span>
            </span>
          </Rise>
        ))}
      </div>
    </Chapter>
  );
}

function FinalUI({ index, shots }) {
  const [tab, setTab] = useState(0);
  const reduceMotion = useReducedMotion();
  const shot = shots[tab];

  return (
    <Chapter index={index} label="Final UI" title="The screens">
      <div className="flex flex-wrap gap-2 mb-8">
        {shots.map((item, i) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setTab(i)}
            aria-current={i === tab ? "true" : undefined}
            className={cn(
              "rounded-full px-4 py-2 text-sm transition-colors border",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              i === tab
                ? "border-foreground/25 bg-foreground text-background"
                : "border-border/80 text-muted-foreground hover:text-foreground hover:bg-muted/50",
            )}
          >
            {item.tab ?? `Screen ${i + 1}`}
          </button>
        ))}
      </div>

      <motion.figure
        key={shot.src}
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
      >
        <img
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          loading="lazy"
          decoding="async"
          className="w-full h-auto rounded-2xl border border-border/60 bg-muted/20"
        />
        {shot.caption ? (
          <figcaption className="mt-3 text-sm text-muted-foreground">
            {shot.caption}
          </figcaption>
        ) : null}
      </motion.figure>
    </Chapter>
  );
}

function Features({ index, features }) {
  return (
    <Chapter
      index={index}
      label="Key Features"
      title="What the design does"
      className="bg-muted/20"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((feature, i) => (
          <Rise key={feature.title} delay={i * 0.07}>
            <article className="group h-full rounded-2xl border border-border/80 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <span
                aria-hidden="true"
                className="inline-flex w-8 h-8 rounded-lg bg-foreground/5 items-center justify-center font-mono text-[11px] text-muted-foreground group-hover:bg-foreground group-hover:text-background transition-colors"
              >
                {i + 1}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.body}
              </p>
            </article>
          </Rise>
        ))}
      </div>
    </Chapter>
  );
}

function Outcome({ index, outcome }) {
  const groups = [
    ["Design decisions", outcome.decisions],
    ["Expected impact", outcome.impact],
    ["Learnings", outcome.learnings],
  ].filter(([, items]) => items?.length);

  return (
    <Chapter index={index} label="Outcome" title="Where it landed">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {groups.map(([heading, items], gi) => (
          <Rise key={heading} delay={gi * 0.1}>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70 mb-4">
              {heading}
            </h3>
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item}
                  className="text-sm leading-relaxed text-muted-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Rise>
        ))}
      </div>

      <Rise delay={0.3}>
        <p className="mt-10 font-mono text-xs text-muted-foreground/70 max-w-2xl">
          Expected impact describes what the design is intended to achieve. The
          concept was not deployed, so no measured results are claimed.
        </p>
      </Rise>
    </Chapter>
  );
}

function Board({ index, project }) {
  return (
    <Chapter
      index={index}
      label="The Full Board"
      title="The study in full"
      lead="The complete board, as presented."
    >
      <Rise>
        <figure>
          {/* Plain <img>: these boards run to tens of thousands of pixels
              tall, which the image loader has no useful answer for. */}
          <img
            src={project.full}
            alt={project.fullAlt ?? `${project.title} case study board`}
            width={project.fullWidth}
            height={project.fullHeight}
            loading="lazy"
            decoding="async"
            className="w-full h-auto rounded-2xl border border-border/60 bg-muted/20"
          />
        </figure>
      </Rise>

      <Rise delay={0.1}>
        <a
          href={project.full}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Open full size
          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
        </a>
      </Rise>
    </Chapter>
  );
}

function NextProject({ project, next }) {
  return (
    <section className="w-full px-5 md:px-8 py-20 md:py-32 border-t border-border/60">
      <div className="max-w-6xl mx-auto">
        {project.behanceUrl ? (
          <Rise>
            <a
              href={project.behanceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-14"
            >
              <TechIcon name="behance" className="w-4 h-4" strokeWidth={2} />
              Full case study on Behance
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </Rise>
        ) : null}

        {next ? (
          <Rise delay={0.08}>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-5">
              Next project
            </p>
            <Link
              href={`/work/${next.slug}`}
              className="group inline-flex items-baseline gap-4 flex-wrap"
            >
              <span className="font-display text-3xl md:text-6xl font-semibold tracking-tight text-foreground group-hover:text-muted-foreground transition-colors text-balance">
                {next.title}
              </span>
              <ArrowRight
                className="w-7 h-7 text-muted-foreground transition-transform duration-300 group-hover:translate-x-2"
                aria-hidden="true"
              />
            </Link>
            <p className="mt-3 text-muted-foreground">{next.subtitle}</p>
          </Rise>
        ) : null}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * A case study presented as its own page: one section per step of the work,
 * animated on entry. Every section is driven by the project's data - a
 * section with nothing behind it is not rendered at all, so the page never
 * pads itself out with invented material.
 */
export default function CaseStudyView({ project, next }) {
  const cs = project.caseStudy ?? {};
  const chapters = cs.chapters ?? [];
  const problem = chapters.find((c) => c.kind === "problem");
  const quote = chapters.find((c) => c.kind === "quote");
  const personas = chapters.find((c) => c.kind === "personas")?.personas;
  const screens = chapters.find((c) => c.kind === "screens")?.shots;
  const steps = project.stages;

  // Numbered in the order they actually appear, so gaps never show.
  let n = 0;
  const step = () => (n += 1);

  return (
    <div className="font-display">
      <ScrollProgress />
      <Hero project={project} />

      <Overview index={step()} project={project} />

      {problem ? <ProblemSection index={step()} chapter={problem} /> : null}

      {cs.insights?.length ? (
        <Insights index={step()} insights={cs.insights} quote={quote?.quote} />
      ) : null}

      {personas?.length ? <Personas index={step()} personas={personas} /> : null}

      {cs.journey?.stages?.length ? (
        <Journey index={step()} journey={cs.journey} />
      ) : null}

      {steps?.length ? (
        <Process
          index={step()}
          steps={steps}
          label={project.stagesLabel || "How it came together"}
        />
      ) : null}

      {screens?.length ? <FinalUI index={step()} shots={screens} /> : null}

      {project.full && !screens?.length ? (
        <Board index={step()} project={project} />
      ) : null}

      {cs.features?.length ? (
        <Features index={step()} features={cs.features} />
      ) : null}

      {cs.outcome ? <Outcome index={step()} outcome={cs.outcome} /> : null}

      <NextProject project={project} next={next} />
    </div>
  );
}
