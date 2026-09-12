"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

/**
 * Renders a same-sized placeholder until mounted — the resolved theme isn't
 * known during SSR, and swapping the icon after hydration would otherwise
 * shift the navbar.
 */
export default function ThemeToggle({ className }) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  const classes = cn(
    "inline-flex items-center justify-center h-9 w-9 rounded-md shrink-0",
    "text-muted-foreground transition-colors hover:text-foreground hover:bg-accent",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    className,
  );

  if (!mounted) {
    return (
      <div className={classes} aria-hidden="true">
        <div className="w-4 h-4" />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={classes}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? (
        <Sun className="w-4 h-4" aria-hidden="true" />
      ) : (
        <Moon className="w-4 h-4" aria-hidden="true" />
      )}
    </button>
  );
}
