"use client";

import { useEffect, useState } from "react";
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

/** Stable reference — the scroll spy depends on this array identity. */
const SECTION_IDS = navLinks.map((link) => link.href.replace("#", ""));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  // Swap the header from transparent to frosted once the page moves.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (event, href) => {
    event.preventDefault();
    scrollToSection(href);
  };

  return (
    <div className="pt-3">
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-colors duration-200",
          scrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border/60"
            : "bg-transparent border-b border-transparent",
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

      <MobileNav open={menuOpen} onOpenChange={setMenuOpen} active={active} />
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </div>
  );
}
