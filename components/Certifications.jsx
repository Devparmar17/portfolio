import { ExternalLink } from "lucide-react";

import { certifications } from "@/data/portfolio";
import { brandStyle } from "@/lib/brandColors";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Badge from "./ui/Badge";
import TechIcon from "./ui/TechIcon";

/** Issuers whose official mark is available; anything else uses its wordmark. */
const LOGOS = {
  google: "googleLogo",
  coursera: "courseraLogo",
};

export default function Certifications() {
  return (
    <Section containerClassName="py-24">
      <div className="flex flex-col gap-12 relative z-10 w-full max-w-5xl mx-auto">
        <SectionHeading
          index="06"
          label="Accolades"
          title="Certifications"
          description="Formal training in UX design, AI fundamentals, and programming."
          titleClassName="text-3xl md:text-4xl"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <Reveal
              key={cert.title}
              y={15}
              delay={i * 0.07}
              duration={0.5}
              className="h-full"
            >
              <article className="group brand-hover relative h-full flex flex-col p-6 md:p-8 rounded-2xl bg-card border border-border/80 transition-all duration-300 hover:shadow-md hover:border-border hover:-translate-y-1">
                <div className="mb-6 flex justify-between items-start gap-3">
                  <span
                    className="w-12 h-12 rounded-xl bg-muted/40 group-hover:bg-primary/10 transition-colors duration-300 flex items-center justify-center shrink-0"
                    style={{
                      color: `var(--brand-${cert.brand}, var(--muted-foreground))`,
                    }}
                  >
                    {LOGOS[cert.brand] ? (
                      <TechIcon
                        name={LOGOS[cert.brand]}
                        brand={null}
                        className="w-6 h-6"
                      />
                    ) : (
                      // IBM asked to be removed from the icon set, so its
                      // wordmark stands in rather than a hand-drawn imitation.
                      <span className="font-mono text-sm font-bold tracking-tight">
                        {cert.monogram}
                      </span>
                    )}
                  </span>
                  <Badge variant="pill">Certified</Badge>
                </div>

                <h3 className="text-lg font-semibold tracking-tight text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                  {cert.title}
                </h3>

                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {cert.issuer}
                </p>

                {cert.date ? (
                  <p className="text-xs text-muted-foreground/60 font-mono">
                    Issued {cert.date}
                  </p>
                ) : null}

                <div className="mt-auto pt-5 border-t border-border/50 flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
                    Credential
                  </span>

                  {cert.url ? (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono tracking-tight text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                    >
                      Verify
                      <ExternalLink
                        className="brand-icon w-3.5 h-3.5"
                        style={brandStyle("external")}
                        aria-hidden="true"
                      />
                      <span className="sr-only">{cert.title}</span>
                    </a>
                  ) : (
                    <span className="text-xs font-mono tracking-tight text-muted-foreground/50">
                      —
                    </span>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
