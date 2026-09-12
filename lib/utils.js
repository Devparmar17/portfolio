/** Tiny classname joiner — keeps the dependency list short. */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/** True when the visitor has asked the OS to reduce motion. */
export function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Scrolls to an in-page section and syncs the URL hash without pushing a new
 * history entry (so Back still leaves the site rather than walking the nav).
 * The sticky-header offset comes from `scroll-padding-top` in globals.css.
 */
export function scrollToSection(href) {
  if (typeof document === "undefined") return;

  const el = document.getElementById(href.replace("#", ""));
  if (!el) return;

  el.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });

  window.history.replaceState(null, "", href);
}
