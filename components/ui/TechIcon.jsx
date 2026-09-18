import { brandStyle } from "@/lib/brandColors";
import { cn } from "@/lib/utils";

/**
 * Hand-built glyph set drawn in one consistent style: 24px box, 1.5 stroke,
 * round caps, no fill. Keeping them here (rather than pulling a brand-icon
 * package) means every tile in the site shares the same optical weight.
 *
 * Add a new entry to `glyphs` and reference it by key from data/portfolio.js.
 */

const glyphs = {
  /* ------------------------------ design ------------------------------- */
  figma: (
    <>
      <path d="M12 3H9.5a3 3 0 0 0 0 6H12V3Z" />
      <path d="M12 9H9.5a3 3 0 0 0 0 6H12V9Z" />
      <path d="M12 15H9.5a3 3 0 1 0 2.5 3v-3Z" />
      <path d="M12 3h2.5a3 3 0 0 1 0 6H12V3Z" />
      <circle cx="14.5" cy="12" r="3" />
    </>
  ),
  research: (
    <>
      <circle cx="10" cy="10" r="6.2" />
      <path d="m20.5 20.5-5.8-5.8" />
      <circle cx="10" cy="8.4" r="1.7" />
      <path d="M6.9 14a3.5 3.5 0 0 1 6.2 0" />
    </>
  ),
  wireframe: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 8h18" />
      <path d="M9 21V8" />
      <path d="M12.5 12h5.5" />
      <path d="M12.5 16h5.5" />
    </>
  ),
  prototype: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <path d="M10 6.5h3.5a4 4 0 0 1 4 4V14" />
      <path d="m15.5 12.2 2 2 2-2" />
    </>
  ),

  /* ----------------------------- frontend ------------------------------ */
  html: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="m9 9.5-2.5 2.5L9 14.5" />
      <path d="m15 9.5 2.5 2.5L15 14.5" />
      <path d="m12.8 8.5-1.6 7" />
    </>
  ),
  css: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M15.5 9H9.8a1.6 1.6 0 0 0 0 3.2h4.4a1.6 1.6 0 0 1 0 3.2H8.5" />
    </>
  ),
  javascript: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M11 9v5.2a1.6 1.6 0 0 1-3.2 0" />
      <path d="M17 10.1c-1.5-1-3.4-.6-3.4.9 0 1.6 3.1 1.2 3.1 2.8 0 1.4-2 1.9-3.5.8" />
    </>
  ),

  /* ---------------------------- programming ---------------------------- */
  python: (
    <>
      <path d="M9 4.5h3.5A3.5 3.5 0 0 1 16 8v2.5a2 2 0 0 1-2 2H10a2 2 0 0 0-2 2V17" />
      <path d="M15 19.5h-3.5A3.5 3.5 0 0 1 8 16v-2.5" />
      <circle cx="10.6" cy="7.6" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="13.4" cy="16.4" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  cpp: (
    <>
      <path d="M11 8.6a4.4 4.4 0 1 0 0 6.8" />
      <path d="M16 10v3.4M14.3 11.7h3.4" />
      <path d="M20.5 10v3.4M18.8 11.7h3.4" />
    </>
  ),

  /* ------------------------------- tools ------------------------------- */
  vscode: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 8.5h18" />
      <path d="m9.5 12-2 2.2 2 2.2" />
      <path d="m13.5 12 2 2.2-2 2.2" />
    </>
  ),
  visualstudio: (
    <path d="M8.5 9.5c-2 0-3.5 1.1-3.5 2.5s1.5 2.5 3.5 2.5c3 0 4-5 7-5 2 0 3.5 1.1 3.5 2.5s-1.5 2.5-3.5 2.5c-3 0-4-5-7-5Z" />
  ),
  git: (
    <>
      <circle cx="6.5" cy="6" r="2.5" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="17.5" cy="10" r="2.5" />
      <path d="M6.5 8.5v7" />
      <path d="M17.5 12.5c0 3.2-2.6 3-5.5 3.5" />
    </>
  ),

  /* ------------------------------ projects ----------------------------- */
  home: (
    <>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="M9.5 20v-5h5v5" />
    </>
  ),
  bus: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M3 10h18" />
      <path d="M7 16v2M17 16v2" />
      <circle cx="7.5" cy="13" r="1" />
      <circle cx="16.5" cy="13" r="1" />
    </>
  ),
  map: (
    <>
      <path d="m9 4.5-5 2v13l5-2 6 2 5-2v-13l-5 2z" />
      <path d="M9 4.5v13" />
      <path d="M15 6.5v13" />
    </>
  ),
  coffee: (
    <>
      <path d="M4 8h12v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8Z" />
      <path d="M16 9.5h1.6a2.5 2.5 0 0 1 0 5H16" />
      <path d="M7 3.5v1.8M10.5 3v2.3M14 3.5v1.8" />
      <path d="M3 21h14" />
    </>
  ),
  play: (
    <>
      <rect x="2" y="4" width="20" height="13" rx="2" />
      <path d="m10.2 8.4 4.8 2.6-4.8 2.6z" />
      <path d="M8 21h8" />
    </>
  ),
  shoe: (
    <>
      <path d="M2.5 16.5v-5h3.2l2.8-2.8 2 2 4.2 1.5c2.6.9 5.3 1.3 5.3 3.1v1.2z" />
      <path d="M2.5 16.5h19v1.2a1.8 1.8 0 0 1-1.8 1.8H4.3a1.8 1.8 0 0 1-1.8-1.8z" />
      <path d="m8.8 11 1.6 1.6M10.9 9.3l1.6 1.6" />
    </>
  ),

  /* ----------------------------- built with ---------------------------- */
  react: (
    <>
      <circle cx="12" cy="12" r="2.5" />
      <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(30 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(90 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(150 12 12)" />
    </>
  ),
  nextjs: (
    <>
      <path d="M9 15V9l6 6V9" />
      <circle cx="12" cy="12" r="10" />
    </>
  ),
  tailwind: (
    <>
      <path d="M10 7C10 4 14 4 15 6C16 8 20 8 20 5" />
      <path d="M4 13C4 10 8 10 9 12C10 14 14 14 14 11" />
    </>
  ),
  framer: <path d="M5 4h14l-7 7m0 0h7v7l-7 7v-7H5V4z" />,
  vercel: <path d="M12 3l9 16H3z" />,
  lucide: (
    <>
      <path d="M12 19c-4 0-7-2.6-7-6.1C5 10 7 7.9 9.5 7.9c1.6 0 2.5 1 2.5 2.4" />
      <path d="M12 19c4 0 7-2.6 7-6.1C19 10 17 7.9 14.5 7.9c-1.6 0-2.5 1-2.5 2.4" />
    </>
  ),

  /* ------------------------------ ai tools ----------------------------- */
  /* Claude's radiating burst, reduced to eight tapered rays. */
  claude: (
    <>
      <path d="M12 2.5v6M12 15.5v6M2.5 12h6M15.5 12h6" />
      <path d="m5.3 5.3 4.2 4.2M14.5 14.5l4.2 4.2M18.7 5.3l-4.2 4.2M9.5 14.5l-4.2 4.2" />
    </>
  ),
  /* Gemini's four-pointed spark. */
  gemini: (
    <path d="M12 2c0 5.5 4.5 10 10 10-5.5 0-10 4.5-10 10 0-5.5-4.5-10-10-10 5.5 0 10-4.5 10-10Z" />
  ),

  /* ------------------------------- social ------------------------------ */
  behance: (
    <>
      <path d="M3 7.2h4.4a2.2 2.2 0 0 1 0 4.4H3z" />
      <path d="M3 11.6h4.9a2.3 2.3 0 0 1 0 4.6H3z" />
      <path d="M14 13.6h6.5c0-2.2-1.4-3.7-3.2-3.7s-3.3 1.6-3.3 3.7 1.4 3.6 3.3 3.6c1.3 0 2.3-.5 2.9-1.5" />
      <path d="M15.5 7.4h4" />
    </>
  ),

  /* ----------------------------- ux methods ---------------------------- */
  flow: (
    <>
      <rect x="2.5" y="3.5" width="7" height="5" rx="1.2" />
      <rect x="14.5" y="3.5" width="7" height="5" rx="1.2" />
      <rect x="8.5" y="15.5" width="7" height="5" rx="1.2" />
      <path d="M9.5 6h5" />
      <path d="M18 8.5v2.5a2 2 0 0 1-2 2h-4v2.5" />
      <path d="m10.3 13.2 1.7 2.3 1.7-2.3" />
    </>
  ),
  usability: (
    <>
      <rect x="3" y="3.5" width="18" height="12.5" rx="2" />
      <path d="M8.5 20.5h7M12 16v4.5" />
      <path d="m9 10 2 2 4-4.5" />
    </>
  ),

  /* ---------------------------- brand marks ---------------------------- */
  /*
   * Official marks, inlined from simple-icons (CC0) so the certification
   * cards show the real logo without carrying the whole icon set. IBM has no
   * mark in that set, so its cards fall back to the "IBM" wordmark.
   */
  googleLogo: (
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
  ),
  courseraLogo: (
    <path d="M11.374 23.977c-4.183-.21-8.006-2.626-9.959-6.347-2.097-3.858-1.871-8.864.732-12.454C4.748 1.338 9.497-.698 14.281.23c4.583.857 8.351 4.494 9.358 8.911 1.122 4.344-.423 9.173-3.925 12.04-2.289 1.953-5.295 2.956-8.34 2.797zm7.705-8.05a588.737 588.737 0 0 0-3.171-1.887c-.903 1.483-2.885 2.248-4.57 1.665-2.024-.639-3.394-2.987-2.488-5.134.801-2.009 2.79-2.707 4.357-2.464a4.19 4.19 0 0 1 2.623 1.669c1.077-.631 2.128-1.218 3.173-1.855-2.03-3.118-6.151-4.294-9.656-2.754-3.13 1.423-4.89 4.68-4.388 7.919.54 3.598 3.73 6.486 7.716 6.404a7.664 7.664 0 0 0 6.404-3.563z" />
  ),

  /* ------------------------------ fallback ----------------------------- */
  fallback: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4l2.5 2.5" />
    </>
  ),
};

/** Glyphs drawn as solid shapes rather than strokes. */
const FILLED = new Set(["framer", "vercel", "googleLogo", "courseraLogo"]);

export default function TechIcon({
  name,
  className = "w-7 h-7",
  strokeWidth = 1.5,
  /** Override the brand-colour key; pass `null` to opt out of brand hover. */
  brand,
}) {
  const glyph = glyphs[name] ?? glyphs.fallback;
  const isFilled = FILLED.has(name);
  const brandKey = brand === undefined ? name : brand;

  return (
    <svg
      viewBox="0 0 24 24"
      className={cn(brandKey ? "brand-icon" : null, className)}
      style={brandKey ? brandStyle(brandKey) : undefined}
      aria-hidden="true"
      focusable="false"
      fill={isFilled ? "currentColor" : "none"}
      stroke={isFilled ? "none" : "currentColor"}
      strokeWidth={isFilled ? undefined : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {glyph}
    </svg>
  );
}
