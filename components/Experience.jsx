import { Briefcase, MapPin } from "lucide-react";

import { experience } from "@/data/portfolio";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Badge from "./ui/Badge";

export default function Experience() {
  return (
    <Section id="experience" containerClassName="py-24">
      <div className="flex flex-col gap-12 relative z-10 w-full max-w-5xl mx-auto">
        <SectionHeading
          index="03"
          label="Experience"
          title="Where I've Worked"
          description="Design and frontend work, shipped on real interfaces."
          titleClassName="text-3xl md:text-4xl"
        />

        <ol className="relative">
          {experience.map((job, i) => (
            <li key={`${job.company}-${job.period}`} className="relative pl-8 sm:pl-12">
              {/* Timeline rail — hidden on the final entry so it ends cleanly. */}
              {i < experience.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute left-[5px] sm:left-[7px] top-4 bottom-0 w-px bg-border"
                />
              ) : null}

              <span
                aria-hidden="true"
                className="absolute left-0 top-2.5 flex items-center justify-center w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-2 border-primary/60 bg-background"
              />

              <Reveal y={15} delay={i * 0.08}>
                <article className="group relative rounded-2xl bg-card border border-border/80 p-6 md:p-8 transition-all duration-300 hover:shadow-md hover:border-border hover:-translate-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                    <div className="flex items-start gap-4">
                      <span className="hidden sm:flex w-12 h-12 rounded-xl bg-muted/40 text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors duration-300 items-center justify-center shrink-0">
                        <Briefcase className="w-5 h-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
                          {job.role}
                        </h3>
                        <p className="text-sm font-medium text-muted-foreground mt-1">
                          {job.company}
                        </p>
                        {job.location ? (
                          <p className="flex items-center gap-1.5 text-xs text-muted-foreground/70 mt-1.5">
                            <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                            {job.location}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <Badge
                      variant="category"
                      className="self-start shrink-0 whitespace-nowrap"
                    >
                      {job.period}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {job.description}
                  </p>

                  <ul className="space-y-3 mb-6">
                    {job.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-sm text-muted-foreground leading-relaxed"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 w-1 h-1 rounded-full bg-primary/60 shrink-0"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <ul className="flex flex-wrap gap-2 pt-5 border-t border-border/50">
                    {job.stack.map((tech) => (
                      <li key={tech}>
                        <Badge variant="tech">{tech}</Badge>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
