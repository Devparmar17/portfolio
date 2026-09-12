import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium " +
  "transition-all duration-200 shrink-0 disabled:opacity-60 disabled:pointer-events-none " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const variants = {
  /* Filled pill — the primary call to action. */
  primary:
    "rounded-full bg-foreground text-background hover:bg-foreground/90 border-0 px-6 shadow-sm active:scale-95",
  /* Outlined pill — secondary actions sitting next to a primary. */
  outline:
    "rounded-full border border-border/80 bg-background text-muted-foreground " +
    "hover:text-foreground hover:bg-muted/50 px-6 shadow-sm active:scale-95",
  /* Square solid button — used in the navbar. */
  solid:
    "rounded-md bg-primary text-primary-foreground hover:bg-primary/90 px-4 shadow-sm active:scale-[0.98]",
  /* Bare button — theme toggle, menu trigger. */
  ghost:
    "rounded-md text-muted-foreground hover:text-foreground hover:bg-accent",
};

/** Height is separate from `variant` so the two never fight over the cascade. */
const sizes = {
  default: "h-10",
  sm: "h-9",
  lg: "h-11",
  none: "",
};

/**
 * Renders an <a> when `href` is supplied, otherwise a <button>.
 * External links get target/rel automatically via `external`.
 */
export default function Button({
  href,
  variant = "primary",
  size = "default",
  className,
  children,
  external = false,
  type = "button",
  ...props
}) {
  const classes = cn(
    base,
    variants[variant] ?? variants.primary,
    sizes[size] ?? sizes.default,
    className,
  );

  if (href) {
    const externalProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};
    return (
      <a href={href} className={classes} {...externalProps} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
