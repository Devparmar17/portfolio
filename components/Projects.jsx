"use client";

import { useCallback, useMemo, useState } from "react";

import { projectFilters, projects } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import ProjectCard from "./ui/ProjectCard";
import CaseStudyModal from "./ui/CaseStudyModal";

/** Maps a filter label onto the project `type` it selects. */
const FILTER_TYPE = {
  "Live Apps": "live",
  "Case Studies": "case-study",
};

export default function Projects() {
  const [filter, setFilter] = useState(projectFilters[0]);
  const [active, setActive] = useState(null);

  const visible = useMemo(() => {
    const type = FILTER_TYPE[filter];
    return type ? projects.filter((p) => p.type === type) : projects;
  }, [filter]);

  const closeDetail = useCallback(() => setActive(null), []);

  return (
    <Section id="projects" containerClassName="py-24">
      <div className="flex flex-col gap-12 relative z-10 w-full max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <SectionHeading
            index="04"
            label="Work"
            title="Selected Projects"
            description="Working products I've built, and the UX thinking behind them."
            titleClassName="text-4xl md:text-5xl"
          />

          <Reveal
            scale={0.95}
            y={0}
            delay={0.1}
            className="self-start md:self-auto"
          >
            <div
              role="tablist"
              aria-label="Filter projects by type"
              className="flex p-1 bg-muted/50 rounded-lg border border-border/50 shadow-sm relative z-20"
            >
              {projectFilters.map((option) => {
                const isActive = filter === option;
                return (
                  <button
                    key={option}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setFilter(option)}
                    className={cn(
                      "px-4 sm:px-5 py-2 rounded-md text-sm font-medium transition-all duration-300 relative whitespace-nowrap",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/80",
                    )}
                  >
                    {isActive ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-background shadow-sm rounded-md border border-border/50"
                      />
                    ) : null}
                    <span className="relative z-10">{option}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* Keying on the filter remounts the grid so cards animate back in. */}
        <div
          key={filter}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {visible.map((project, i) => (
            <Reveal
              key={project.slug}
              y={15}
              delay={i * 0.08}
              duration={0.5}
              amount={0.1}
              className="h-full"
            >
              <ProjectCard project={project} onOpenDetail={setActive} />
            </Reveal>
          ))}
        </div>
      </div>

      <CaseStudyModal project={active} onClose={closeDetail} />
    </Section>
  );
}
