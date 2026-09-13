"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";

import { profile, workflow } from "@/data/portfolio";
import { BRAND_COLORS } from "@/lib/brandColors";
import { cn } from "@/lib/utils";
import TechIcon from "./TechIcon";

const EASE = [0.22, 1, 0.36, 1];

/** How long each skill stays in mind. Deliberately unhurried. */
const DWELL_MS = 1900;
/** An extra beat when the mind switches between thinking and computing. */
const STAGE_BEAT_MS = 700;
/** Rest after the last skill before starting over. */
const REST_MS = 3200;

/** Skills without a brand of their own borrow a colour for the stage. */
const STAGE_ACCENT = { think: "var(--brand-figma)", build: "var(--brand-vscode)" };

/** Every skill in the portfolio, in order, with its mode and brand colour. */
const SEQUENCE = workflow.flatMap((stage) =>
  stage.skills.map((skill) => ({
    ...skill,
    mode: stage.mode,
    accent: BRAND_COLORS[skill.icon] ?? STAGE_ACCENT[stage.mode],
  })),
);

/** The brand colour of the skill currently in mind. */
const ACCENT = "var(--mind-accent)";
const MUTED = "var(--muted-foreground)";
const CARD = "var(--card)";
const LINE = "var(--border)";
const MONO = { fontFamily: "var(--font-mono), ui-monospace, monospace" };

/** x, y, width, lit — lines of code typing into the panel. */
const CODE_LINES = [
  [220, 44, 34, true],
  [220, 54, 24, false],
  [228, 64, 26, false],
  [220, 74, 18, true],
];

/**
 * The hero: Dev's photo, with his skills passing through his mind.
 *
 * Skills appear one at a time in the thought bubble above him. While a design
 * skill is in mind the bubble reads "Thinking" and design doodles float
 * around his head; while a programming skill is in mind it reads "Computing"
 * and code panels take their place. The round backdrop, bubble border and
 * doodles are tinted with the brand colour of the skill in mind
 * (--mind-accent). The photo itself is never altered.
 *
 * His body is clipped to the circle while his head rises above it. One timeout
 * drives the sequence, only while the hero is on screen and the tab is
 * visible; the CSS loops ("PORTRAIT" in globals.css) pause at the same time.
 * With reduced motion neither runs.
 */
export default function MindPhoto({ className }) {
  const rootRef = useRef(null);
  const inView = useInView(rootRef, { amount: 0.3 });
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [step, setStep] = useState(0);
  // Until the photo has been added, show the bubble and backdrop without a broken image.
  const [photoMissing, setPhotoMissing] = useState(false);

  // Reduced motion is only known on the client. Waiting for mount keeps the
  // first client render identical to the server render.
  useEffect(() => setMounted(true), []);
  const reduce = mounted && prefersReduced;

  useEffect(() => {
    const sync = () => setPageVisible(!document.hidden);
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  const running = inView && pageVisible && !reduce;

  useEffect(() => {
    if (!running) return undefined;

    const last = step >= SEQUENCE.length - 1;
    const modeChanges = !last && SEQUENCE[step + 1].mode !== SEQUENCE[step].mode;
    const delay = DWELL_MS + (last ? REST_MS : modeChanges ? STAGE_BEAT_MS : 0);

    const id = window.setTimeout(() => setStep(last ? 0 : step + 1), delay);
    return () => window.clearTimeout(id);
  }, [running, step]);

  const active = SEQUENCE[step];
  const thinking = active.mode === "think";

  return (
    <div
      ref={rootRef}
      data-mode={active.mode}
      style={{ "--mind-accent": active.accent }}
      className={cn(
        "mind-hero relative flex w-full flex-col items-center",
        !running && "is-paused",
        className,
      )}
    >
      {/* Thought bubble — echoes the Skills section, so hidden from assistive tech */}
      <div
        aria-hidden="true"
        className="mind-tint relative z-10 w-full rounded-2xl border bg-background/85 px-4 py-3 shadow-sm backdrop-blur-sm"
        style={{ borderColor: "color-mix(in oklab, var(--mind-accent) 45%, var(--border))" }}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
            <span
              className="mind-tint mind-pulse h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: ACCENT }}
            />
            {thinking ? "Thinking" : "Computing"}
            <span className="flex gap-0.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="mind-dot inline-block h-[3px] w-[3px] rounded-full bg-muted-foreground"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </span>
          </span>
          <span className="font-mono text-[10px] tabular-nums text-muted-foreground/60">
            {String(step + 1).padStart(2, "0")}/{String(SEQUENCE.length).padStart(2, "0")}
          </span>
        </div>

        <div className="mt-2 flex h-9 items-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={step}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="inline-flex items-center gap-2"
            >
              <span className="mind-tint" style={{ color: ACCENT }}>
                <TechIcon name={active.icon} brand={null} className="h-5 w-5" />
              </span>
              <span className="text-base font-semibold tracking-tight text-foreground">
                {active.name}
              </span>
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <div className="relative -mt-1 w-full" style={{ aspectRatio: "280 / 300" }}>
        {/* Clip for the photo: everything above the circle centre, plus the circle */}
        <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
          <defs>
            <clipPath id="mind-photo-clip" clipPathUnits="objectBoundingBox">
              <rect x="0" y="0" width="1" height="0.6" />
              <ellipse cx="0.5" cy="0.6" rx="0.4" ry="0.3733" />
            </clipPath>
          </defs>
        </svg>

        {/* Backdrop, tinted with the skill colour */}
        <svg
          viewBox="0 0 280 300"
          fill="none"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
        >
          <circle className="mind-tint" cx="140" cy="180" r="112" fill={ACCENT} fillOpacity="0.14" />
          <circle
            className="mind-tint"
            cx="140"
            cy="180"
            r="112"
            stroke={ACCENT}
            strokeOpacity="0.4"
            strokeWidth="1.5"
            strokeDasharray="2 7"
          />
        </svg>

        {/* The photo — untouched, body inside the circle, head above it */}
        {photoMissing ? null : (
          <div className="absolute inset-0" style={{ clipPath: "url(#mind-photo-clip)" }}>
            <div className="mind-photo absolute inset-x-[12%] top-[2%] bottom-0">
              <Image
                src={profile.photo}
                alt={`Photo of ${profile.name}`}
                fill
                priority
                sizes="(max-width: 768px) 13rem, 16rem"
                className="object-contain object-bottom"
                onError={() => setPhotoMissing(true)}
              />
            </div>
          </div>
        )}

        {/* What is on his mind, drawn around his head */}
        <svg
          viewBox="0 0 280 300"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          {[
            [196, 28, 3],
            [206, 17, 4],
            [218, 8, 5],
          ].map(([cx, cy, r], i) => (
            <circle
              key={cx}
              className="mind-tint mind-dot"
              style={{ animationDelay: `${i * 0.25}s` }}
              cx={cx}
              cy={cy}
              r={r}
              fill={ACCENT}
            />
          ))}

          {/* THINKING — design doodles */}
          <g className="mind-layer mind-think">
            <g className="mind-float">
              <rect className="mind-tint" x="8" y="34" width="62" height="46" rx="9" fill={CARD} stroke={ACCENT} strokeWidth="1.5" />
              <rect className="mind-tint" x="16" y="42" width="19" height="15" rx="3" fill={ACCENT} fillOpacity="0.3" />
              <path d="M41 46h21M41 53h14M16 68h46" stroke={MUTED} strokeWidth="2.5" />
            </g>
            <g className="mind-float" style={{ animationDelay: "1.2s" }}>
              <circle className="mind-tint" cx="244" cy="64" r="14" fill={ACCENT} fillOpacity="0.2" stroke={ACCENT} strokeWidth="2" />
              <path className="mind-tint" d="M238 83h12M240 90h8" stroke={ACCENT} strokeWidth="2.5" />
              <path className="mind-tint mind-pulse" d="M244 42v-6M227 50l-5-4M261 50l5-4" stroke={ACCENT} strokeWidth="2.5" />
            </g>
            <g className="mind-float" style={{ animationDelay: "0.6s" }}>
              <path className="mind-tint" d="M236 146l18-18 6 6-18 18-9 3z" fill={ACCENT} fillOpacity="0.85" />
              <path d="M252 130l6 6" stroke={CARD} strokeWidth="2" />
            </g>
          </g>

          {/* COMPUTING — code panels */}
          <g className="mind-layer mind-build">
            <g className="mind-float">
              <rect className="mind-tint" x="8" y="34" width="62" height="42" rx="9" fill={CARD} stroke={ACCENT} strokeWidth="1.5" />
              <text className="mind-tint" x="18" y="61" fontSize="17" fontWeight="700" fill={ACCENT} style={MONO}>
                &lt;/&gt;
              </text>
            </g>
            <g className="mind-float" style={{ animationDelay: "1.2s" }}>
              <rect x="210" y="32" width="62" height="54" rx="9" fill={CARD} stroke={LINE} strokeWidth="1.5" />
              {CODE_LINES.map(([x, y, w, lit], i) => (
                <rect
                  key={y}
                  className={cn("mind-type", lit && "mind-tint")}
                  style={{ animationDelay: `${i * 0.3}s` }}
                  x={x}
                  y={y}
                  width={w}
                  height="4"
                  rx="2"
                  fill={lit ? ACCENT : MUTED}
                  fillOpacity={lit ? 1 : 0.5}
                />
              ))}
            </g>
            <g className="mind-float" style={{ animationDelay: "0.6s" }}>
              <rect x="236" y="122" width="36" height="22" rx="6" fill={CARD} stroke={LINE} strokeWidth="1.5" />
              <text x="243" y="138" fontSize="12" fontWeight="700" fill={MUTED} style={MONO}>
                &gt;_
              </text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
