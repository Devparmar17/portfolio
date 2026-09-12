import { GraduationCap, MapPin } from "lucide-react";

import { education } from "@/data/portfolio";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Badge from "./ui/Badge";

export default function Education() {
  return (
    <Section id="education" containerClassName="py-24">
      <div className="flex flex-col gap-12 relative z-10 w-full max-w-5xl mx-auto">
        <SectionHeading
          index="05"
          label="Education"
          title="Academic Background"
          description="Design research on top of a computer engineering foundation."
          titleClassName="text-3xl md:text-4xl"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((item, i) => (
            <Reveal
              key={item.degree}
              y={15}
              delay={i * 0.08}
              duration={0.5}
              className="h-full"
            >
              <article className="group relative h-full flex flex-col p-6 md:p-8 rounded-2xl bg-card border border-border/80 transition-all duration-300 hover:shadow-md hover:border-border hover:-translate-y-1">
                <div className="mb-6 flex justify-between items-start gap-4">
                  <span className="w-12 h-12 rounded-xl bg-muted/40 text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors duration-300 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-6 h-6" aria-hidden="true" />
                  </span>

                  {item.current ? (
                    <Badge variant="accent">In Progress</Badge>
                  ) : (
                    <Badge variant="pill">Completed</Badge>
                  )}
                </div>

                <h3 className="text-lg font-semibold tracking-tight text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                  {item.degree}
                </h3>

                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {item.institution}
                </p>

                {item.location ? (
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground/70 mb-2">
                    <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                    {item.location}
                  </p>
                ) : null}

                <p className="text-xs text-muted-foreground/60 font-mono mb-5">
                  {item.period}
                </p>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {item.note}
                </p>

                <div className="mt-auto pt-5 border-t border-border/50 flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
                    Result
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {item.score}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
