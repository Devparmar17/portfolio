import { cn } from "@/lib/utils";

const variants = {
  /* Technology / skill chips. */
  tech: "text-xs text-muted-foreground bg-muted/50 border border-border/40 px-2.5 py-1 rounded-md font-medium",
  /* Mono category label. */
  category:
    "font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-medium bg-muted px-2 py-1 rounded",
  /* Accented marker — "Featured", "Ongoing". */
  accent:
    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-primary/10 text-primary text-[10px] font-mono uppercase font-semibold",
  /* Pill used on cards, e.g. a CGPA or "Verified". */
  pill: "inline-flex items-center justify-center rounded-full text-[10px] font-mono uppercase tracking-widest bg-background/90 px-2 py-0.5 font-medium text-secondary-foreground border border-border/50",
};

export default function Badge({ variant = "tech", className, children }) {
  return (
    <span className={cn(variants[variant] ?? variants.tech, className)}>
      {children}
    </span>
  );
}
