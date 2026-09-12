"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

import { contact, navLinks, profile } from "@/data/portfolio";
import { cn, scrollToSection } from "@/lib/utils";
import SocialLinks from "./SocialLinks";

const EASE = [0.22, 1, 0.36, 1];

/** Slide-in menu for narrow screens. Closes on Escape, backdrop, or selection. */
export default function MobileNav({ open, onOpenChange, active }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") onOpenChange(false);
    };

    document.addEventListener("keydown", onKeyDown);
    const id = window.setTimeout(() => panelRef.current?.focus(), 20);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(id);
    };
  }, [open, onOpenChange]);

  const go = (href) => {
    onOpenChange(false);
    window.setTimeout(() => scrollToSection(href), 60);
  };

  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[60] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="absolute right-0 top-0 h-full w-[86%] max-w-sm bg-card border-l border-border/80 shadow-xl flex flex-col outline-none"
            initial={reduceMotion ? { opacity: 0 } : { x: "100%" }}
            animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: reduceMotion ? 0.15 : 0.3, ease: EASE }}
          >
            <div className="flex items-center justify-between h-14 px-5 border-b border-border/60 shrink-0">
              <span className="font-semibold text-sm tracking-tight text-foreground">
                {profile.name}
              </span>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                aria-label="Close menu"
                className="inline-flex items-center justify-center h-10 w-10 -mr-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const id = link.href.replace("#", "");
                  const isActive = active === id;

                  return (
                    <motion.li
                      key={link.href}
                      initial={reduceMotion ? false : { opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: reduceMotion ? 0 : 0.05 + i * 0.04,
                        ease: EASE,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => go(link.href)}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          // 48px tall — comfortable touch target.
                          "w-full flex items-center justify-between gap-3 min-h-12 px-4 rounded-lg text-base font-medium transition-colors",
                          isActive
                            ? "bg-muted text-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                        )}
                      >
                        <span>{link.label}</span>
                        <span className="font-mono text-[10px] uppercase tracking-widest opacity-50">
                          0{i + 1}
                        </span>
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <div className="shrink-0 border-t border-border/60 p-5 space-y-4">
              <button
                type="button"
                onClick={() => go("#contact")}
                className="w-full inline-flex items-center justify-center gap-2 min-h-12 rounded-full bg-foreground text-background text-sm font-medium shadow-sm transition-transform active:scale-95"
              >
                Hire Me
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <a
                href={`mailto:${contact.email}`}
                className="block text-center text-xs text-muted-foreground hover:text-foreground transition-colors break-all"
              >
                {contact.email}
              </a>

              <SocialLinks className="justify-center" size="sm" />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
