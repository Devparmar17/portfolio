import { Github, Linkedin, Mail } from "lucide-react";

import { socials } from "@/data/portfolio";
import { brandStyle } from "@/lib/brandColors";
import { cn } from "@/lib/utils";
import TechIcon from "./TechIcon";

const ICON_CLASS = "brand-icon w-4 h-4";

const iconFor = {
  github: (style) => (
    <Github className={ICON_CLASS} style={style} aria-hidden="true" />
  ),
  linkedin: (style) => (
    <Linkedin className={ICON_CLASS} style={style} aria-hidden="true" />
  ),
  email: (style) => (
    <Mail className={ICON_CLASS} style={style} aria-hidden="true" />
  ),
  behance: () => (
    <TechIcon name="behance" className="w-4 h-4" strokeWidth={2} />
  ),
};

/**
 * Social icon row. Entries in data/portfolio.js with an empty `url` are
 * skipped, so adding a GitHub or Behance link there makes it appear here,
 * in the hero, and in the footer at once.
 *
 * Each icon fades to its own brand colour on hover — see `.brand-icon`
 * in globals.css.
 */
export default function SocialLinks({ className, size = "default" }) {
  const active = socials.filter((s) => s.url);

  if (active.length === 0) return null;

  const button = size === "sm" ? "h-9 w-9" : "h-10 w-10";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {active.map((social) => (
        <a
          key={social.id}
          href={social.url}
          aria-label={social.label}
          {...(social.id === "email"
            ? {}
            : { target: "_blank", rel: "noopener noreferrer" })}
          className={cn(
            "group inline-flex items-center justify-center rounded-full border border-border/80",
            "bg-background text-muted-foreground shadow-sm transition-all duration-300",
            "hover:border-border hover:bg-muted/50 active:scale-95",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            button,
          )}
        >
          {iconFor[social.id]?.(brandStyle(social.id))}
        </a>
      ))}
    </div>
  );
}
