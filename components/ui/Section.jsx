import { cn } from "@/lib/utils";

/**
 * The layout unit the whole site is built from.
 *
 * Draws the "blueprint" frame that runs through the design: a hairline across
 * the top and bottom of the max-w-7xl column, a dot at each corner, and a tick
 * mark at the midpoint of each edge. Purely decorative and non-interactive.
 */
export default function Section({
  id,
  children,
  className,
  containerClassName,
}) {
  return (
    <section className={cn("w-full relative flex flex-col items-center", className)}>
      {/* Decorative frame */}
      <div
        aria-hidden="true"
        className="absolute inset-0 w-full max-w-7xl mx-auto pointer-events-none z-0"
      >
        <div className="absolute inset-0 border-y border-border/40" />

        {/* Corner dots — kept inside the column so they never widen the page
            on viewports narrower than the container. */}
        <span className="absolute top-0 left-0 w-[3px] h-[3px] rounded-full bg-muted-foreground/60" />
        <span className="absolute top-0 right-0 w-[3px] h-[3px] rounded-full bg-muted-foreground/60" />
        <span className="absolute bottom-0 left-0 w-[3px] h-[3px] rounded-full bg-muted-foreground/60" />
        <span className="absolute bottom-0 right-0 w-[3px] h-[3px] rounded-full bg-muted-foreground/60" />

        {/* Mid-edge ticks */}
        <span className="absolute left-1/2 -top-1 h-2 w-px -translate-x-1/2 bg-muted-foreground/30" />
        <span className="absolute left-1/2 -bottom-1 h-2 w-px -translate-x-1/2 bg-muted-foreground/30" />
      </div>

      <div
        id={id}
        className={cn(
          "max-w-7xl mx-auto w-full relative z-10 px-4 md:px-6 scroll-mt-20",
          containerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
