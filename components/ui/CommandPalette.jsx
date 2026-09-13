"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CornerDownLeft, Search } from "lucide-react";

import { navLinks } from "@/data/portfolio";
import { cn, scrollToSection } from "@/lib/utils";

/**
 * The jump-to-section dialog behind the navbar search box. Small on purpose: it navigates the page and
 * nothing else, so there is no index to build or search library to ship.
 */
export default function CommandPalette({ open, onOpenChange }) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return navLinks;
    return navLinks.filter((link) => link.label.toLowerCase().includes(q));
  }, [query]);

  // Reset and focus each time the dialog opens; lock the page behind it.
  useEffect(() => {
    if (!open) return;

    setQuery("");
    setCursor(0);

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const id = window.setTimeout(() => inputRef.current?.focus(), 20);

    return () => {
      window.clearTimeout(id);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  const select = (href) => {
    onOpenChange(false);
    // Let the dialog unmount before scrolling, so focus lands cleanly.
    window.setTimeout(() => scrollToSection(href), 60);
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setCursor((c) => (results.length ? (c + 1) % results.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setCursor((c) =>
        results.length ? (c - 1 + results.length) % results.length : 0,
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      const target = results[cursor];
      if (target) select(target.href);
    } else if (event.key === "Escape") {
      event.preventDefault();
      onOpenChange(false);
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[15vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Jump to section"
            className="relative w-full max-w-lg rounded-2xl border border-border/80 bg-popover shadow-xl overflow-hidden"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 px-4 h-12 border-b border-border/60">
              <Search
                className="w-4 h-4 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCursor(0);
                }}
                placeholder="Jump to a section..."
                aria-label="Jump to a section"
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
              <kbd className="hidden sm:inline-flex h-5 items-center rounded border border-border/60 bg-background/50 px-1.5 font-sans text-[10px] font-medium text-muted-foreground">
                ESC
              </kbd>
            </div>

            <ul className="max-h-72 overflow-y-auto p-2" role="listbox">
              {results.length === 0 ? (
                <li className="px-3 py-6 text-center text-sm text-muted-foreground">
                  No sections match “{query}”.
                </li>
              ) : (
                results.map((link, i) => (
                  <li key={link.href}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={i === cursor}
                      onMouseEnter={() => setCursor(i)}
                      onClick={() => select(link.href)}
                      className={cn(
                        "w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-colors",
                        i === cursor
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <span className="font-medium">{link.label}</span>
                      <span className="font-mono text-[10px] uppercase tracking-widest opacity-60">
                        {link.href}
                      </span>
                    </button>
                  </li>
                ))
              )}
            </ul>

            <div className="flex items-center gap-2 px-4 h-10 border-t border-border/60 text-[11px] text-muted-foreground">
              <CornerDownLeft className="w-3 h-3" aria-hidden="true" />
              <span>to jump</span>
              <span className="opacity-40">·</span>
              <span>↑ ↓ to navigate</span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
