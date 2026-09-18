"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, Search } from "lucide-react";

import { navLinks, profile } from "@/data/portfolio";
import { useActiveSection } from "@/lib/useActiveSection";
import { cn, scrollToSection } from "@/lib/utils";
import Button from "./ui/Button";
import LogoMark from "./ui/LogoMark";
import Section from "./ui/Section";
import CommandPalette from "./ui/CommandPalette";
import MobileNav from "./ui/MobileNav";
import ThemeToggle from "./ui/ThemeToggle";

/** Below this offset the header always stays put. */
const REVEAL_ABOVE = 96;

/** How long a click-driven scroll may run without retracting the header. */
const NAV_SCROLL_GRACE_MS = 900;

/** Stable reference — the scroll spy depends on this array identity. */
const SECTION_IDS = navLinks.map((link) => link.href.replace("#", ""));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  // Set when a nav link starts a scroll, so the header does not retract out
  // from under the control that was just clicked.
  const graceUntil = useRef(0);

  // Frosts the header once the page moves, and tracks direction so scrolling
  // down retracts it while scrolling up brings it back. Reads are batched into
  // a frame to keep the listener cheap.
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 8);

      // Rubber-band scrolling reports negative offsets; ignore those.
      if (y < 0) return;

      const delta = y - lastY;

      // Below the threshold lastY is left alone, so slow scrolls accumulate
      // instead of being swallowed a pixel at a time.
      if (Math.abs(delta) < 6) return;

      // Near the top there is nothing to get out of the way of, and a scroll
      // the visitor just asked for should not hide the control they used.
      if (Date.now() > graceUntil.current) {
        setHidden(y > REVEAL_ABOVE && delta > 0);
      }
      lastY = y;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const handleNavClick = (event, href) => {
    event.preventDefault();
    graceUntil.current = Date.now() + NAV_SCROLL_GRACE_MS;
    setHidden(false);
    scrollToSection(href);
  };

  return (
    <>
      {/*
        Fixed rather than sticky: the old wrapper was only as tall as the bar
        itself, so sticky had no travel and the header simply scrolled away.
        Translating this outer layer by its own height retracts the whole
        lockup, top padding included.
      */}
      <div
        // Keyboard users can reach the nav while it is retracted, so focus
        // landing inside it brings the bar back down.
        onFocusCapture={() => setHidden(false)}
        className={cn(
          "fixed top-0 inset-x-0 z-50 pt-3",
          "transition-[transform,background-color] duration-300 ease-out",
          hidden && !menuOpen && !paletteOpen
            ? "-translate-y-full"
            : "translate-y-0",
          // Covers the padding strip as well, so nothing scrolls through it.
          scrolled ? "bg-background/80 backdrop-blur-md" : "bg-transparent",
        )}
      >
        <header
          className={cn(
            "w-full border-b transition-colors duration-200",
            scrolled ? "border-border/60" : "border-transparent",
          )}
        >
          <Section containerClassName="h-14 flex items-center justify-between">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              aria-label={`${profile.name} — back to top`}
              className="flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <LogoMark className="logo-sheen h-7 md:h-8" />
              <span aria-hidden="true" className="h-4 w-px bg-border" />
              <span className="wordmark wordmark-follow font-semibold text-sm tracking-tight">
                {profile.name}
              </span>
            </a>

            <div className="flex items-center gap-2 md:gap-4">
              <nav aria-label="Primary" className="hidden lg:flex items-center gap-0.5">
                {navLinks.map((link) => {
                  const isActive = active === link.href.replace("#", "");
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "relative px-2.5 py-1.5 text-sm font-medium transition-colors rounded-md",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {isActive ? (
                        <span
                          className="absolute inset-0 bg-muted/60 rounded-md -z-10"
                          aria-hidden="true"
                        />
                      ) : null}
                      <span className="relative z-10">{link.label}</span>
                    </a>
                  );
                })}
              </nav>

              <div
                className="hidden lg:block w-px h-4 bg-border/50 mx-1"
                aria-hidden="true"
              />

              <button
                type="button"
                onClick={() => setPaletteOpen(true)}
                aria-label="Jump to a section"
                className="hidden xl:flex items-center gap-2 h-9 px-3 rounded-md bg-muted/40 hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors border border-border/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring w-[200px]"
              >
                <Search className="w-4 h-4 shrink-0 opacity-70" aria-hidden="true" />
                <span className="text-sm flex-1 text-left opacity-80">Search...</span>
              </button>

              <div className="flex items-center gap-1.5">
                <ThemeToggle />

                {/* Wrapped rather than given `hidden` directly, so the
                    responsive display rule can't collide with the button's
                    own `inline-flex`. */}
                <span className="hidden sm:block">
                  <Button
                    href="#contact"
                    variant="solid"
                    size="sm"
                    onClick={(e) => handleNavClick(e, "#contact")}
                  >
                    Hire Me
                  </Button>
                </span>

                <button
                  type="button"
                  onClick={() => setMenuOpen(true)}
                  aria-label="Open menu"
                  aria-expanded={menuOpen}
                  className="lg:hidden inline-flex items-center justify-center h-9 w-9 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Menu className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </Section>
        </header>
      </div>

      {/* Holds the space the now-fixed header no longer occupies. */}
      <div aria-hidden="true" className="h-[68px]" />

      <MobileNav open={menuOpen} onOpenChange={setMenuOpen} active={active} />
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </>
  );
}
