"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { profile } from "@/data/portfolio";

/**
 * The intro: from Computer Engineering to UI/UX Design, in four acts.
 *
 *   1. The engineering era - a terminal types, circuits draw, a processor
 *      is sketched in wireframe, and COMPUTER ENGINEERING lands.
 *   2. The transformation - those code lines collapse into wireframe
 *      blocks, a design grid rules itself over them, and a palette appears.
 *   3. The design era - screens float in with parallax, connected by a user
 *      flow, and UI/UX DESIGN lands.
 *   4. The signature - the name, the two lines, and 100%.
 *
 * It plays once per session and can be skipped at any point, by the button,
 * by a key, or by clicking anywhere. Reduced motion skips it outright.
 *
 * The panel is charcoal regardless of the site's theme. That is deliberate:
 * this is a title sequence, and a title sequence that changes colour with a
 * setting is a component, not a film.
 *
 * The page is already rendered underneath - this is an overlay, not a gate -
 * so crawlers, screen readers and anyone without JavaScript get the content
 * regardless. The decorative layers are hidden from assistive technology;
 * the skip control is a real, focusable button and is not.
 */

/** Each act, and how long it holds. Total sits inside the 5-7s brief. */
const ACTS = [
  { id: "engineering", ms: 2000 },
  { id: "transform", ms: 1500 },
  { id: "design", ms: 1700 },
  { id: "signature", ms: 1500 },
];

const TOTAL_MS = ACTS.reduce((sum, act) => sum + act.ms, 0);

/** Long enough for the curtain to clear. */
const EXIT_MS = 900;

const EASE = [0.22, 1, 0.36, 1];
const EASE_IN_OUT = [0.76, 0, 0.24, 1];

/** The code that types itself in the first act. */
const CODE = [
  "class Engineer {",
  "  build(logic) {",
  "    return system(logic);",
  "  }",
  "}",
];

/* -------------------------------------------------------------------------- */
/* Shared pieces                                                               */
/* -------------------------------------------------------------------------- */

/** A line of type revealed left to right, the way a line is typed. */
function TypeLine({ children, delay = 0, className, duration = 0.5 }) {
  return (
    <motion.span
      className={className}
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      animate={{ clipPath: "inset(0 0% 0 0)" }}
      transition={{ duration, delay, ease: EASE_IN_OUT }}
    >
      {children}
    </motion.span>
  );
}

/** A line that rises into its own mask. */
function RiseLine({ children, delay = 0, className }) {
  return (
    <span className="intro-mask">
      <motion.span
        className={className}
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        exit={{ y: "-110%" }}
        transition={{ duration: 0.62, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/*
 * Acts arrive and leave like camera moves: a touch of scale and defocus
 * either side of the cut, so one act gives way to the next instead of two
 * of them cross-fading in place.
 */
const actFade = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
  exit: { opacity: 0, scale: 1.04, transition: { duration: 0.45, ease: EASE } },
};

/* -------------------------------------------------------------------------- */
/* Act 1 - the engineering era                                                 */
/* -------------------------------------------------------------------------- */

function ActEngineering() {
  return (
    <motion.div className="intro-act" {...actFade}>
      <div className="intro-stage-art" aria-hidden="true">
        {/* Circuit lines finding their way across the plate. */}
        <svg className="intro-circuit" viewBox="0 0 600 320" fill="none">
          {[
            "M0 60h120l28 28h96",
            "M600 96H470l-26 26H330",
            "M0 250h86l30-30h120",
            "M600 224H486l-24-24H352",
          ].map((d, i) => (
            <motion.path
              key={d}
              d={d}
              stroke="var(--intro-blue)"
              strokeWidth="1"
              strokeOpacity="0.5"
              pathLength={1}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, delay: 0.1 + i * 0.09, ease: EASE }}
            />
          ))}
          {[
            [148, 88],
            [444, 122],
            [116, 220],
            [462, 200],
          ].map(([cx, cy], i) => (
            <motion.circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r="3"
              fill="var(--intro-blue)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.7 + i * 0.08, ease: EASE }}
            />
          ))}
        </svg>

        {/* The processor, in wireframe. */}
        <motion.svg
          className="intro-chip"
          viewBox="0 0 160 160"
          fill="none"
          initial={{ opacity: 0, rotateX: 28, scale: 0.92 }}
          animate={{ opacity: 1, rotateX: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.25, ease: EASE }}
        >
          <rect
            x="34"
            y="34"
            width="92"
            height="92"
            rx="8"
            stroke="var(--intro-ink)"
            strokeOpacity="0.35"
          />
          <rect
            x="58"
            y="58"
            width="44"
            height="44"
            rx="4"
            stroke="var(--intro-blue)"
            strokeOpacity="0.85"
          />
          {Array.from({ length: 4 }, (_, i) => 50 + i * 20).map((p) => (
            <g key={p} stroke="var(--intro-ink)" strokeOpacity="0.28">
              <path d={`M${p} 34V16`} />
              <path d={`M${p} 126v18`} />
              <path d={`M34 ${p}H16`} />
              <path d={`M126 ${p}h18`} />
            </g>
          ))}
        </motion.svg>

        {/* Binary, drifting. */}
        <div className="intro-binary">
          {Array.from({ length: 7 }, (_, col) => (
            <motion.span
              key={col}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: [0, 0.5, 0.18], y: 0 }}
              transition={{
                duration: 1.6,
                delay: col * 0.11,
                ease: "linear",
              }}
            >
              {/* Fixed, not random, so the server and client agree. */}
              {
                ["01001", "10110", "00101", "11010", "01110", "10011", "00110"][
                  col
                ]
              }
            </motion.span>
          ))}
        </div>

        {/* The terminal. */}
        <motion.div
          className="intro-terminal"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
        >
          <span className="intro-terminal-bar">
            <i />
            <i />
            <i />
          </span>
          <code>
            {CODE.map((line, i) => (
              <TypeLine
                key={line}
                className="intro-code-line"
                delay={0.45 + i * 0.16}
                duration={0.34}
              >
                {line}
              </TypeLine>
            ))}
          </code>
        </motion.div>
      </div>

      <div className="intro-copy">
        <RiseLine className="intro-kicker" delay={0.05}>
          It all started with code.
        </RiseLine>
        <RiseLine className="intro-title" delay={1.15}>
          COMPUTER ENGINEERING
        </RiseLine>
        <RiseLine className="intro-sub" delay={1.32}>
          Understanding how technology works.
        </RiseLine>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Act 2 - the transformation                                                  */
/* -------------------------------------------------------------------------- */

/** Where each code line ends up once it stops being code. */
const MORPH = [
  { x: 10, y: 8, w: 150, h: 18, r: 4 },
  { x: 10, y: 34, w: 104, h: 10, r: 3 },
  { x: 10, y: 54, w: 62, h: 20, r: 10 },
  { x: 178, y: 8, w: 92, h: 66, r: 6 },
  { x: 10, y: 86, w: 260, h: 30, r: 6 },
];

const PALETTE = [
  "var(--brand-figma)",
  "var(--intro-blue)",
  "var(--brand-visualstudio)",
  "var(--brand-javascript)",
];

function ActTransform() {
  return (
    <motion.div className="intro-act" {...actFade}>
      <div className="intro-stage-art" aria-hidden="true">
        <svg className="intro-morph" viewBox="0 0 280 126" fill="none">
          {/* The grid rules itself over the top. */}
          {Array.from({ length: 7 }, (_, i) => (
            <motion.path
              key={`v${i}`}
              d={`M${10 + i * 43} 0v126`}
              stroke="var(--intro-ink)"
              strokeOpacity="0.1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.04, ease: EASE }}
            />
          ))}

          {MORPH.map((box, i) => (
            <motion.rect
              key={i}
              x={box.x}
              y={box.y}
              width={box.w}
              height={box.h}
              rx={box.r}
              fill={i === 2 ? "var(--intro-blue)" : "var(--intro-ink)"}
              initial={{ opacity: 0, scaleX: 0.2 }}
              animate={{ opacity: i === 2 ? 0.9 : 0.16, scaleX: 1 }}
              style={{ originX: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.22 + i * 0.09,
                ease: EASE,
              }}
            />
          ))}
        </svg>

        {/* The palette arriving. */}
        <div className="intro-palette">
          {PALETTE.map((colour, i) => (
            <motion.span
              key={colour}
              style={{ background: colour }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.7 + i * 0.07, ease: EASE }}
            />
          ))}
        </div>
      </div>

      <div className="intro-copy">
        <RiseLine className="intro-kicker" delay={0.05}>
          Then I discovered the art of design.
        </RiseLine>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Act 3 - the design era                                                      */
/* -------------------------------------------------------------------------- */

const SCREENS = [
  { lift: -16, delay: 0.1, tint: "var(--brand-figma)" },
  { lift: 10, delay: 0.2, tint: "var(--intro-blue)" },
  { lift: -8, delay: 0.3, tint: "var(--brand-visualstudio)" },
];

function ActDesign() {
  return (
    <motion.div className="intro-act" {...actFade}>
      <div className="intro-stage-art" aria-hidden="true">
        <div className="intro-screens">
          {SCREENS.map((screen, i) => (
            <motion.div
              key={i}
              className="intro-screen"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: screen.lift }}
              transition={{ duration: 0.8, delay: screen.delay, ease: EASE }}
            >
              <span
                className="intro-screen-hero"
                style={{ background: screen.tint }}
              />
              <span className="intro-screen-line" />
              <span className="intro-screen-line short" />
              <span className="intro-screen-row">
                <i />
                <i />
              </span>
            </motion.div>
          ))}

          {/* The flow between them. */}
          <svg className="intro-flow" viewBox="0 0 320 120" fill="none">
            {["M66 60h58", "M196 60h58"].map((d, i) => (
              <motion.path
                key={d}
                d={d}
                stroke="var(--intro-blue)"
                strokeWidth="1.5"
                strokeDasharray="4 5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.55 + i * 0.12,
                  ease: EASE,
                }}
              />
            ))}
          </svg>
        </div>
      </div>

      <div className="intro-copy">
        <RiseLine className="intro-title" delay={0.5}>
          UI/UX DESIGN
        </RiseLine>
        <RiseLine className="intro-sub" delay={0.66}>
          Turning ideas into meaningful experiences.
        </RiseLine>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Act 4 - the signature                                                       */
/* -------------------------------------------------------------------------- */

function ActSignature({ letters }) {
  return (
    <motion.div className="intro-act intro-act-signature" {...actFade}>
      <h1 className="intro-signature">
        {letters.map((char, i) => (
          <span key={i} className="intro-mask">
            <motion.span
              className="intro-signature-letter"
              initial={{ y: "108%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.7, delay: i * 0.04, ease: EASE }}
            >
              {char === " " ? " " : char}
            </motion.span>
          </span>
        ))}
      </h1>

      <div className="intro-copy intro-copy-centre">
        <RiseLine className="intro-sub" delay={0.52}>
          From code to creativity.
        </RiseLine>
        <RiseLine className="intro-sub intro-sub-dim" delay={0.62}>
          Designing digital experiences.
        </RiseLine>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */

export default function Preloader() {
  const rootRef = useRef(null);
  const countRef = useRef(null);
  const [act, setAct] = useState(-1);

  const letters = [...profile.nameUpper];

  useEffect(() => {
    const root = document.documentElement;
    // Set by the inline script in the layout: first visit of a session only.
    if (root.dataset.intro !== "1") return;

    const el = rootRef.current;
    if (!el) return;

    let frame = 0;
    const timers = [];
    let done = false;

    /** Takes the overlay away and gives the page back. */
    const clear = () => {
      root.removeAttribute("data-intro");
      if (el) el.style.display = "none";
    };

    const finish = () => {
      if (done) return;
      done = true;

      cancelAnimationFrame(frame);
      timers.forEach(window.clearTimeout);
      window.removeEventListener("pointerdown", finish);
      window.removeEventListener("keydown", finish);

      try {
        sessionStorage.setItem("intro-seen", "1");
      } catch {
        // Private mode or blocked storage - the intro simply runs again.
      }

      // However it ends, including a skip, it ends complete.
      if (countRef.current) countRef.current.textContent = "100";
      el.dataset.done = "true";
      timers.push(window.setTimeout(clear, EXIT_MS));
    };

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      done = true;
      try {
        sessionStorage.setItem("intro-seen", "1");
      } catch {
        /* nothing to remember, nothing to do */
      }
      clear();
      return;
    }

    // Step through the acts.
    setAct(0);
    let elapsed = 0;
    ACTS.forEach((entry, i) => {
      elapsed += entry.ms;
      if (i < ACTS.length - 1) {
        timers.push(window.setTimeout(() => setAct(i + 1), elapsed));
      } else {
        timers.push(window.setTimeout(finish, elapsed));
      }
    });

    // One readout across the whole sequence.
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / TOTAL_MS);
      if (countRef.current) {
        countRef.current.textContent = String(Math.round(t * 100)).padStart(
          3,
          "0",
        );
      }
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    /*
     * Parallax, written as two variables rather than React state: the stage
     * moves on a CSS transition, so pointer movement never costs a render.
     */
    const onPointerMove = (event) => {
      const px = (event.clientX / window.innerWidth) * 2 - 1;
      const py = (event.clientY / window.innerHeight) * 2 - 1;
      el.style.setProperty("--px", px.toFixed(3));
      el.style.setProperty("--py", py.toFixed(3));
    };

    window.addEventListener("pointerdown", finish);
    window.addEventListener("keydown", finish);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      timers.forEach(window.clearTimeout);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", finish);
      window.removeEventListener("keydown", finish);
      clear();
    };
  }, []);

  return (
    <div ref={rootRef} className="preloader">
      {/* Grain, so the flat panel reads as a surface rather than a fill. */}
      <span className="intro-grain" aria-hidden="true" />

      {/* A real control, so it is reachable by keyboard as well as by click. */}
      <button
        type="button"
        className="intro-skip"
        onClick={() => {
          // The window listener does the work; this gives it a target.
        }}
      >
        Skip intro
      </button>

      <div className="intro-scene" aria-hidden="true">
        <AnimatePresence mode="wait">
          {act === 0 ? <ActEngineering key="engineering" /> : null}
          {act === 1 ? <ActTransform key="transform" /> : null}
          {act === 2 ? <ActDesign key="design" /> : null}
          {act === 3 ? (
            <ActSignature key="signature" letters={letters} />
          ) : null}
        </AnimatePresence>
      </div>

      <div className="intro-readout" aria-hidden="true">
        <span className="intro-progress">
          <span className="intro-progress-fill" />
        </span>
        <span ref={countRef} className="intro-count">
          000
        </span>
      </div>
    </div>
  );
}
