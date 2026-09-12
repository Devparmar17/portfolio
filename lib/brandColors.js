/**
 * Maps an icon key to its brand colour variable (declared in globals.css).
 *
 * Anything not listed here falls back to the site's `--primary`, which is the
 * neutral hover the rest of the design already uses — so UX skills like
 * "Wireframing" keep behaving exactly as before.
 */
export const BRAND_COLORS = {
  // Social
  linkedin: "var(--brand-linkedin)",
  behance: "var(--brand-behance)",
  instagram: "var(--brand-instagram)",
  dribbble: "var(--brand-dribbble)",
  github: "var(--brand-github)",
  email: "var(--brand-email)",
  mail: "var(--brand-email)",
  external: "var(--brand-external)",
  live: "var(--brand-live)",

  // Design + frontend
  figma: "var(--brand-figma)",
  html: "var(--brand-html)",
  css: "var(--brand-css)",
  javascript: "var(--brand-javascript)",
  python: "var(--brand-python)",
  cpp: "var(--brand-cpp)",
  vscode: "var(--brand-vscode)",
  visualstudio: "var(--brand-visualstudio)",
  git: "var(--brand-git)",

  // Built with
  react: "var(--brand-react)",
  nextjs: "var(--brand-nextjs)",
  tailwind: "var(--brand-tailwind)",
  framer: "var(--brand-framer)",
  lucide: "var(--brand-lucide)",
  vercel: "var(--brand-vercel)",

  // AI tools
  claude: "var(--brand-claude)",
  gemini: "var(--brand-gemini)",

  // Issuers
  google: "var(--brand-google)",
  ibm: "var(--brand-ibm)",
  coursera: "var(--brand-coursera)",
};

/**
 * Inline style that arms `.brand-icon`. Returns undefined for unknown keys so
 * the CSS fallback (`--primary`) applies.
 */
export function brandStyle(key) {
  const color = BRAND_COLORS[key];
  return color ? { "--brand": color } : undefined;
}
