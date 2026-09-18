import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { brandStyle } from "@/lib/brandColors";
import { cn } from "@/lib/utils";
import Badge from "./Badge";
import ProjectCover from "./ProjectCover";
import TechIcon from "./TechIcon";

/** Small pulsing dot that marks a project as a running application. */
function LiveDot({ className }) {
  return (
    <span className={cn("relative flex h-2 w-2 shrink-0", className)}>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--brand-live)] opacity-70" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--brand-live)]" />
    </span>
  );
}

/**
 * Card artwork. Uses the cover image when one exists, otherwise draws a
 * blueprint plate with the project glyph — so a project without artwork
 * still reads as deliberate.
 */
function ProjectMedia({ project }) {
  const isLive = project.type === "live";

  return (
    <div className="relative h-48 bg-muted/40 overflow-hidden border-b border-border/50 group-hover:bg-muted/60 transition-colors duration-300">
      {project.cover ? (
        /* A real screenshot, if one is ever supplied, wins over the artwork. */
        <Image
          src={project.cover}
          alt={`${project.title} — ${project.subtitle}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
        />
      ) : (
        <ProjectCover
          slug={project.slug}
          className="absolute inset-0 w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
        />
      )}

      <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
        <Badge
          variant="category"
          className="bg-background/90 backdrop-blur-sm shadow-sm"
        >
          {isLive ? "Demo App" : "Case Study"}
        </Badge>

        {isLive ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-background/90 backdrop-blur-sm text-[10px] font-mono uppercase font-semibold text-[var(--brand-live)] shadow-sm">
            <LiveDot />
            Live
          </span>
        ) : project.featured ? (
          <Badge variant="accent" className="backdrop-blur-sm">
            Featured
          </Badge>
        ) : project.status ? (
          <Badge variant="accent" className="backdrop-blur-sm">
            {project.status}
          </Badge>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Call-to-action rules, derived entirely from the data:
 *
 *   liveUrl        → "● Demo App ↗"        (primary, opens the running app)
 *   behanceUrl     → "View Case Study ↗"   (opens the Behance gallery)
 *   no behanceUrl  → "View Case Study ↗"   (opens the in-site detail view)
 *
 * The first button in that order is the primary one. No repository links.
 */
export default function ProjectCard({ project, onOpenDetail }) {
  const isLive = project.type === "live";
  const hasLive = isLive && Boolean(project.liveUrl);
  const hasBehance = Boolean(project.behanceUrl);
  // The case-study button is primary unless a running app outranks it.
  const caseStudyIsPrimary = !hasLive;

  const primaryClasses =
    "bg-foreground text-background hover:bg-foreground/90 shadow-sm font-semibold";
  const secondaryClasses =
    "border border-border/80 bg-background text-muted-foreground hover:text-foreground hover:bg-muted/50 shadow-sm";
  const ctaBase = cn(
    "inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full text-sm font-medium",
    "transition-all duration-200 active:scale-95",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  );

  return (
    <article className="group relative h-full flex flex-col overflow-hidden rounded-2xl bg-card border border-border/80 transition-all duration-300 hover:shadow-md hover:border-border hover:-translate-y-1">
      <ProjectMedia project={project} />

      <div className="p-6 md:p-8 flex flex-col grow relative z-10">
        <h3 className="text-xl font-semibold tracking-tight text-foreground mb-1 group-hover:text-primary transition-colors duration-200">
          {project.title}
        </h3>
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground/70 mb-4">
          {project.role}
        </p>

        {project.description ? (
          <p className="text-sm text-muted-foreground leading-relaxed mb-6 grow">
            {project.description}
          </p>
        ) : (
          <div className="grow" />
        )}

        {project.tech?.length ? (
          <ul className="flex flex-wrap gap-2 mb-6 mt-auto">
            {project.tech.slice(0, 5).map((tech) => (
              <li key={tech}>
                <Badge variant="tech">{tech}</Badge>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-border/50 mt-auto">
          {hasLive ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={brandStyle("live")}
              className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full bg-foreground text-background text-sm font-semibold shadow-sm transition-all duration-200 hover:bg-foreground/90 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <LiveDot />
              Demo App
              <ArrowUpRight className="brand-icon w-4 h-4" aria-hidden="true" />
              <span className="sr-only">— opens {project.title} in a new tab</span>
            </a>
          ) : null}

          {hasBehance ? (
            /* The case study lives on Behance — send people straight there. */
            <a
              href={project.behanceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                ctaBase,
                caseStudyIsPrimary ? primaryClasses : secondaryClasses,
              )}
            >
              <TechIcon name="behance" className="w-4 h-4" strokeWidth={2} />
              View Case Study
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">
                — {project.title}, opens Behance in a new tab
              </span>
            </a>
          ) : (
            <button
              type="button"
              onClick={() => onOpenDetail(project)}
              className={cn(
                ctaBase,
                caseStudyIsPrimary ? primaryClasses : secondaryClasses,
              )}
            >
              View Case Study
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">— {project.title}</span>
            </button>
          )}

        </div>
      </div>
    </article>
  );
}
