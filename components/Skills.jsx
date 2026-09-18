import { skillGroups } from "@/data/portfolio";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Badge from "./ui/Badge";
import TechIcon from "./ui/TechIcon";

export default function Skills() {
  return (
    <Section id="skills" containerClassName="py-16 md:py-20">
      <div className="flex flex-col gap-12 relative z-10 w-full max-w-5xl mx-auto">
        <SectionHeading
          index="02"
          label="Skills"
          title="What I Work With"
          description="A research-led design process, backed by an engineering foundation."
          titleClassName="text-3xl md:text-4xl"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillGroups.map((group, i) => (
            <Reveal
              key={group.title}
              y={15}
              delay={i * 0.08}
              duration={0.5}
              className="h-full"
            >
              <article className="group relative h-full flex flex-col p-6 md:p-8 rounded-2xl bg-card border border-border/80 transition-all duration-300 hover:shadow-md hover:border-border hover:-translate-y-1">
                <div className="mb-6 flex items-center gap-4">
                  <span className="brand-hover w-12 h-12 rounded-xl bg-muted/40 text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors duration-300 flex items-center justify-center shrink-0">
                    <TechIcon name={group.icon} className="w-6 h-6" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
                      {group.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {group.items.length} areas
                    </p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {group.description}
                </p>

                <ul className="flex flex-wrap gap-2 mt-auto pt-5 border-t border-border/50">
                  {group.items.map((item) => {
                    const itemIcon = group.itemIcons?.[item];
                    return (
                      <li key={item}>
                        <Badge
                          variant="tech"
                          className="brand-hover inline-flex items-center gap-1.5 transition-colors hover:border-border hover:text-foreground"
                        >
                          {itemIcon ? (
                            <TechIcon
                              name={itemIcon}
                              className="w-3.5 h-3.5 shrink-0"
                              strokeWidth={1.75}
                            />
                          ) : null}
                          {item}
                        </Badge>
                      </li>
                    );
                  })}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
