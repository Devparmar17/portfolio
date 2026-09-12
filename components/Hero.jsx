"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BadgeCheck, Download } from "lucide-react";

import { profile } from "@/data/portfolio";
import { scrollToSection } from "@/lib/utils";
import Button from "./ui/Button";
import Section from "./ui/Section";
import SocialLinks from "./ui/SocialLinks";

const EASE = [0.22, 1, 0.36, 1];

export default function Hero() {
  const reduceMotion = useReducedMotion();

  /** Entrance transform, flattened to a plain fade when motion is reduced. */
  const enter = (from, delay) => ({
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, ...from },
    animate: { opacity: 1, x: 0, y: 0, scale: 1 },
    transition: {
      duration: reduceMotion ? 0.25 : 0.6,
      delay: reduceMotion ? 0 : delay,
      ease: EASE,
    },
  });

  return (
    <Section
      id="home"
      containerClassName="py-12 md:py-24 flex flex-col justify-center"
    >
      <motion.div
        className="relative z-10 mx-auto w-full max-w-5xl"
        {...enter({ y: 20 }, 0)}
      >
        <div className="relative w-full flex flex-col md:flex-row rounded-3xl border border-border/80 bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
          {/* Portrait panel */}
          <div className="relative w-full md:w-[40%] py-12 md:py-16 flex items-center justify-center shrink-0 bg-muted/10 border-b md:border-b-0 md:border-r border-border/50">
            <motion.div className="relative z-10" {...enter({ scale: 0.9 }, 0.15)}>
              <div className="relative flex size-48 md:size-56 shrink-0 overflow-hidden rounded-full border border-border/50 bg-background shadow-xl ring-4 ring-background/50">
                {profile.avatar ? (
                  <Image
                    src={profile.avatar}
                    alt={`Portrait of ${profile.name}`}
                    fill
                    sizes="(max-width: 768px) 12rem, 14rem"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <span className="flex size-full items-center justify-center text-5xl font-semibold bg-muted text-muted-foreground select-none">
                    {profile.initials}
                  </span>
                )}
              </div>
            </motion.div>
          </div>

          {/* Detail panel */}
          <div className="flex flex-col w-full md:flex-1 relative z-0">
            <div className="relative flex flex-col justify-end px-6 md:px-10 py-6 md:py-8 border-b border-border/50">
              <motion.span
                className="font-mono text-xs md:text-sm text-muted-foreground tracking-widest font-medium uppercase"
                {...enter({ x: -10 }, 0.2)}
              >
                {profile.eyebrow}
              </motion.span>
            </div>

            <div className="relative flex items-center px-6 md:px-10 py-6 md:py-8 gap-3 border-b border-border/50">
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
                {...enter({ x: -10 }, 0.28)}
              >
                {profile.name}
              </motion.h1>
              <motion.span
                className="flex items-center mt-1"
                {...enter({ scale: 0.8 }, 0.4)}
              >
                <BadgeCheck
                  className="w-6 h-6 sm:w-7 sm:h-7 text-primary shrink-0"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </motion.span>
            </div>

            <div className="relative flex-1 flex flex-col justify-start px-6 md:px-10 py-6 md:py-8 gap-6 bg-muted/5">
              <motion.div className="flex flex-col gap-2" {...enter({}, 0.45)}>
                <p className="text-base md:text-lg text-foreground font-semibold">
                  {profile.headline}
                </p>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-md">
                  {profile.intro}
                </p>
              </motion.div>

              <motion.div
                className="flex flex-wrap items-center gap-3 pt-2 mt-auto"
                {...enter({ y: 8 }, 0.55)}
              >
                <Button
                  href="#projects"
                  variant="primary"
                  className="group"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("#projects");
                  }}
                >
                  View My Work
                  <ArrowRight
                    className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Button>

                <Button
                  href={profile.resume}
                  variant="outline"
                  className="group"
                  download
                >
                  <Download
                    className="w-4 h-4 transition-transform group-hover:translate-y-0.5"
                    aria-hidden="true"
                  />
                  Download Resume
                </Button>

                <SocialLinks className="ml-1" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
