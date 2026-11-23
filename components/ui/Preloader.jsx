"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * The intro, shot as one camera move.
 *
 *   1. A desktop computer, small on a dark stage, with code typing itself
 *      across its screen.
 *   2. The camera flies into that screen - the machine scales past the
 *      edges of the frame and we come out the other side, inside it.
 *   3. Inside: the code stops being code. Lines snap into UI blocks, a
 *      design grid rules itself over them, a palette arrives.
 *   4. UI/UX DESIGN.
 *   5. DEV, and then the page.
 *
 * The zoom is the whole idea, so it is built as a real move rather than a
 * cut: act one leaves by scaling up from the middle of the monitor's screen
 * while act two arrives already large and settles back. Those two halves
 * meet in the middle and read as one continuous push through the glass.
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

/** The rhythm every delay in this file is tuned against. */
const BASE_MS = [1500, 1000, 800, 700];

/** What the whole thing has to fit inside. */
const TARGET_MS = 4000;

const SPEED = TARGET_MS / BASE_MS.reduce((sum, ms) => sum + ms, 0);

/**
 * Scales a tuned value. Every delay and duration goes through this, so the
 * sequence keeps its proportions at any total length - change TARGET_MS and
 * nothing else needs touching.
 */
const t = (seconds) => seconds * SPEED;

/** Each act, and how long it holds. */
const ACTS = [
  { id: "machine", ms: Math.round(BASE_MS[0] * SPEED) },
  { id: "inside", ms: Math.round(BASE_MS[1] * SPEED) },
  { id: "design", ms: Math.round(BASE_MS[2] * SPEED) },
  { id: "name", ms: Math.round(BASE_MS[3] * SPEED) },
];

const TOTAL_MS = ACTS.reduce((sum, act) => sum + act.ms, 0);

/** Long enough for the curtain to clear; matches the clip in globals.css. */
const EXIT_MS = 620;

const EASE = [0.22, 1, 0.36, 1];
const EASE_IN_OUT = [0.76, 0, 0.24, 1];

/** What is on the screen before the camera goes through it. */
const CODE = [
  "function build() {",
  "  const logic = compile();",
  "  return ship(logic);",
  "}",
];

/* -------------------------------------------------------------------------- */
/* Shared pieces                                                               */
/* -------------------------------------------------------------------------- */

/** A line of type revealed left to right, the way a line is typed. */
function TypeLine({ children, delay = 0, className, duration = t(0.5) }) {
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
        transition={{ duration: t(0.62), delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** The ordinary cut: a touch of scale either side, no dissolve in place. */
const actFade = {
  initial: { opacity: 0, scale: 0.97 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: t(0.6), ease: EASE },
  },
  exit: {
    opacity: 0,
    scale: 1.04,
    transition: { duration: t(0.45), ease: EASE },
  },
};

/* -------------------------------------------------------------------------- */
/* Act 1 - the machine, and the push through its screen                        */
/* -------------------------------------------------------------------------- */

/**
 * Leaves by flying into the monitor. The origin sits on the screen rather
 * than the middle of the element, so the glass is what the camera aims at.
 */
const flyThrough = {
  initial: { opacity: 0, scale: 0.86 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: t(0.8), ease: EASE },
  },
  exit: {
    opacity: 0,
    scale: 9,
    transition: { duration: t(0.75), ease: EASE_IN_OUT },
  },
};

function ActMachine() {
  return (
    <motion.div className="intro-act intro-act-fly" {...flyThrough}>
      <div className="intro-pc">
        <div className="intro-pc-monitor">
          <div className="intro-pc-screen">
            <span className="intro-pc-bar">
              <i />
              <i />
              <i />
            </span>
            <code>
              {CODE.map((line, i) => (
                <TypeLine
                  key={line}
                  className="intro-code-line"
                  delay={t(0.3 + i * 0.17)}
                  duration={t(0.32)}
                >
                  {line}
                </TypeLine>
              ))}
              <motion.span
                className="intro-caret"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: t(0.6), repeat: Infinity }}
              />
            </code>
          </div>
        </div>
        <span className="intro-pc-neck" />
        <span className="intro-pc-base" />
        <span className="intro-pc-keyboard">
          {Array.from({ length: 14 }, (_, i) => (
            <i key={i} />
          ))}
        </span>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Act 2 - inside the screen: code becoming interface                          */
/* -------------------------------------------------------------------------- */

/** Arrives already large, as if the camera is still travelling. */
const arrive = {
  initial: { opacity: 0, scale: 1.7 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: t(0.85), ease: EASE },
  },
  exit: {
    opacity: 0,
    scale: 1.06,
    transition: { duration: t(0.4), ease: EASE },
  },
};

/** Where each code line ends up once it stops being code. */
const BLOCKS = [
  { x: 10, y: 8, w: 150, h: 18, r: 4, accent: null },
  { x: 10, y: 34, w: 104, h: 10, r: 3, accent: null },
  { x: 10, y: 54, w: 62, h: 20, r: 10, accent: "var(--intro-blue)" },
  { x: 178, y: 8, w: 92, h: 66, r: 6, accent: "var(--brand-figma)" },
  { x: 10, y: 86, w: 260, h: 30, r: 6, accent: null },
];

const PALETTE = [
  "var(--brand-figma)",
  "var(--intro-blue)",
  "var(--brand-visualstudio)",
  "var(--brand-javascript)",
];

function ActInside() {
  return (
    <motion.div className="intro-act" {...arrive}>
      <div className="intro-stage-art">
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
              transition={{
                duration: t(0.5),
                delay: t(0.05 + i * 0.035),
                ease: EASE,
              }}
            />
          ))}

          {BLOCKS.map((box, i) => (
            <motion.rect
              key={i}
              x={box.x}
              y={box.y}
              width={box.w}
              height={box.h}
              rx={box.r}
              fill={box.accent ?? "var(--intro-ink)"}
              initial={{ opacity: 0, scaleX: 0.15 }}
              animate={{ opacity: box.accent ? 0.9 : 0.18, scaleX: 1 }}
              style={{ originX: 0 }}
              transition={{
                duration: t(0.5),
                delay: t(0.14 + i * 0.08),
                ease: EASE,
              }}
            />
          ))}
        </svg>

        <div className="intro-palette">
          {PALETTE.map((colour, i) => (
            <motion.span
              key={colour}
              style={{ background: colour }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{
                duration: t(0.4),
                delay: t(0.45 + i * 0.07),
                ease: EASE,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Act 3 - UI/UX                                                               */
/* -------------------------------------------------------------------------- */

const SCREENS = [
  { lift: -16, delay: 0.06, tint: "var(--brand-figma)" },
  { lift: 10, delay: 0.14, tint: "var(--intro-blue)" },
  { lift: -8, delay: 0.22, tint: "var(--brand-visualstudio)" },
];

function ActDesign() {
  return (
    <motion.div className="intro-act" {...actFade}>
      <div className="intro-stage-art">
        <div className="intro-screens">
          {SCREENS.map((screen, i) => (
            <motion.div
              key={i}
              className="intro-screen"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: screen.lift }}
              transition={{
                duration: t(0.7),
                delay: t(screen.delay),
                ease: EASE,
              }}
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
                  duration: t(0.45),
                  delay: t(0.3 + i * 0.1),
                  ease: EASE,
                }}
              />
            ))}
          </svg>
        </div>
      </div>

      <div className="intro-copy">
        <RiseLine className="intro-title" delay={t(0.28)}>
          UI/UX DESIGN
        </RiseLine>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Act 4 - the hand-off                                                        */
/* -------------------------------------------------------------------------- */

const DEV = [..."DEV"];

function ActName() {
  return (
    <motion.div className="intro-act" {...actFade}>
      <h1 className="intro-dev">
        {DEV.map((char, i) => (
          <span key={i} className="intro-mask">
            <motion.span
              className="intro-dev-letter"
              initial={{ y: "108%" }}
              animate={{ y: "0%" }}
              transition={{ duration: t(0.6), delay: t(i * 0.07), ease: EASE }}
            >
              {char}
            </motion.span>
          </span>
        ))}
      </h1>

      <div className="intro-copy intro-copy-centre">
        <RiseLine className="intro-sub" delay={t(0.34)}>
          From code to creativity.
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
      const progress = Math.min(1, (now - start) / TOTAL_MS);
      if (countRef.current) {
        countRef.current.textContent = String(
          Math.round(progress * 100),
        ).padStart(3, "0");
      }
      if (progress < 1) frame = requestAnimationFrame(tick);
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
          {act === 0 ? <ActMachine key="machine" /> : null}
          {act === 1 ? <ActInside key="inside" /> : null}
          {act === 2 ? <ActDesign key="design" /> : null}
          {act === 3 ? <ActName key="name" /> : null}
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
