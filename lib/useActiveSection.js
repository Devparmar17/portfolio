"use client";

import { useEffect, useState } from "react";

/**
 * Scroll spy for the navbar. Returns the id of the section currently under
 * the header. `ids` should be a stable array (defined at module scope).
 */
export function useActiveSection(ids, offset = 140) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;

      // Once the page is scrolled to the bottom, the last section wins even
      // if it never reaches the offset line.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;

      if (atBottom) {
        setActive(ids[ids.length - 1]);
        return;
      }

      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) current = id;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids, offset]);

  return active;
}
