import { aboutHeading, coreTools, profile } from "@/data/portfolio";
import Section from "./ui/Section";
import Reveal from "./ui/Reveal";
import TechIcon from "./ui/TechIcon";

export default function About() {
  return (
    <Section id="about" containerClassName="py-16 md:py-24">
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Copy */}
          <div className="w-full lg:w-[45%] flex flex-col justify-center shrink-0">
            <Reveal className="space-y-8" x={-20} y={0}>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-primary/50" />
                  <span className="font-mono text-xs md:text-sm text-primary uppercase tracking-widest font-medium">
                    01. / About
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.1]">
                  {aboutHeading.lineOne}{" "}
                  <br className="hidden md:block" />
                  {aboutHeading.lineTwo}
                </h2>
              </div>

              <div className="space-y-6 text-muted-foreground leading-relaxed text-sm md:text-base">
                <p>{profile.summary}</p>
                <p>{profile.summarySecondary}</p>
              </div>
            </Reveal>
          </div>

          {/* Toolkit */}
          <div className="w-full lg:flex-1 relative">
            <h3 className="sr-only">Tools and methods I work with</h3>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 relative z-10">
              {coreTools.map((tool, i) => (
                <li key={tool.name}>
                  <Reveal
                    y={15}
                    delay={i * 0.05}
                    duration={0.45}
                    className="h-full"
                  >
                    <div className="group brand-hover h-full flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border border-border/60 bg-card hover:bg-muted/30 transition-all duration-300 cursor-default shadow-sm hover:shadow-md">
                      <span className="text-muted-foreground group-hover:text-primary transition-colors duration-300">
                        <TechIcon name={tool.icon} className="w-7 h-7" />
                      </span>
                      <span className="text-xs font-medium text-center text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                        {tool.name}
                      </span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
