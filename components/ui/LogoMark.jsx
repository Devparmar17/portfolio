import { cn } from "@/lib/utils";

/**
 * The DEV logo, taken directly from the uploaded artwork.
 *
 * `public/brand/dev-logo-mark.png` is used as a mask and painted with the
 * text colour (`.logo-mark` in globals.css), so the mark keeps its exact
 * shape and proportions while following the light/dark theme. Size it by
 * height — the width follows from the artwork's own aspect ratio.
 *
 * Decorative by default; pass `label` when the logo stands on its own.
 */
export default function LogoMark({ className, label }) {
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("logo-mark", className)}
    />
  );
}
