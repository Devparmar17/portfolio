import { ArrowUp } from "lucide-react";

import { footerTagline, profile } from "@/data/portfolio";
import Section from "./ui/Section";
import Reveal from "./ui/Reveal";
import SocialLinks from "./ui/SocialLinks";

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-background">
      <Section containerClassName="py-20 md:py-28 flex flex-col items-center">
        <Reveal className="w-full max-w-4xl mx-auto space-y-10">
          {/* Sign-off */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
            <div className="space-y-2">
              <p className="text-lg font-bold tracking-tight text-foreground">
                {profile.nameUpper}
              </p>
              <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                {footerTagline}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <SocialLinks size="sm" />

              <a
                href="#home"
                aria-label="Back to top"
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/80 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                Back to top
                <ArrowUp
                  className="w-4 h-4 transition-transform group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

          <div className="pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-mono text-xs text-muted-foreground/70 text-center sm:text-left">
              © 2026 {profile.nameUpper}. All rights reserved.
            </p>
            <p className="font-mono text-xs text-muted-foreground/50">
              Designed &amp; built in Next.js
            </p>
          </div>
        </Reveal>
      </Section>
    </footer>
  );
}
