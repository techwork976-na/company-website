"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SELECTOR = "main [data-tone]";

/**
 * The engine behind the "continuous journey". Sections only declare a tone
 * (data-tone="paper" | "lilac" | "indigo" | "violet"). This watches a line
 * across the middle of the viewport; whichever section crosses it sets the
 * tone of the whole page, and the registered colour properties in
 * globals.css cross-fade. The canvas never has hard section edges.
 *
 * Without JavaScript, each section paints its own tone instead.
 */
export function ToneManager() {
  const pathname = usePathname();

  useEffect(() => {
    const html = document.documentElement;
    let frame = 0;

    const apply = (tone: string | undefined) => {
      if (tone && html.dataset.tone !== tone) html.dataset.tone = tone;
    };

    const toneAtCenter = () => {
      const middle = window.innerHeight / 2;
      const sections = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
      const hit = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= middle && rect.bottom > middle;
      });
      return (hit ?? sections[0])?.dataset.tone;
    };

    // First paint of each page: jump straight to the right tone, no fade.
    html.setAttribute("data-journey-instant", "");
    apply(toneAtCenter());
    html.setAttribute("data-journey", "");
    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => html.removeAttribute("data-journey-instant"));
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) apply((entry.target as HTMLElement).dataset.tone);
        }
      },
      // A zero-height band across the middle of the viewport.
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    document.querySelectorAll(SELECTOR).forEach((section) => observer.observe(section));

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
