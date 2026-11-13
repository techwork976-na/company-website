"use client";

import * as m from "framer-motion/m";
import { useEffect, useRef, useState } from "react";
import type { ServiceCategory } from "@/content/site";
import { cn } from "@/lib/cn";
import { cssPixels, scrollToElement } from "@/lib/scroll";

type ServicesTabsProps = {
  categories: Pick<ServiceCategory, "id" | "index" | "shortTitle">[];
  label: string;
};

/** The section element for an id inside the visible page (hidden routes may share ids). */
function visibleSection(id: string) {
  return Array.from(document.querySelectorAll<HTMLElement>(`[id="${id}"]`)).find(
    (element) => element.getClientRects().length > 0,
  );
}

/**
 * Sticky in-page navigation for the three service categories. It sits
 * under the navbar, tracks the section in view with IntersectionObserver,
 * and a dark pill slides to the active tab.
 */
export function ServicesTabs({ categories, label }: ServicesTabsProps) {
  const [active, setActive] = useState(categories[0]?.id);
  const scrollerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const top = cssPixels("--nav-h") + cssPixels("--tabbar-h");
    const visibility = new Map<string, boolean>();
    const sections = categories
      .map((category) => visibleSection(category.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visibility.set(entry.target.id, entry.isIntersecting);
        const current = categories.find((category) => visibility.get(category.id));
        if (current) setActive(current.id);
      },
      { rootMargin: `-${Math.round(top)}px 0px -55% 0px` },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [categories]);

  useEffect(() => {
    // Keep the active tab visible in the horizontal scroller on small screens.
    const scroller = scrollerRef.current;
    const tab = scroller?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!scroller || !tab || scroller.scrollWidth <= scroller.clientWidth) return;
    scroller.scrollTo({ left: tab.offsetLeft - 16, behavior: "smooth" });
  }, [active]);

  return (
    <nav aria-label={label} className="tabbar sticky top-[var(--nav-h)] z-40 border-y border-line">
      <div className="container-wide">
        <ul ref={scrollerRef} className="tabbar-scroller -mx-1 flex h-[var(--tabbar-h)] items-center gap-1 overflow-x-auto px-1">
          {categories.map((category) => {
            const isActive = category.id === active;
            return (
              <li key={category.id} className="shrink-0 snap-start">
                <a
                  href={`#${category.id}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={(event) => {
                    const section = visibleSection(category.id);
                    if (!section) return;
                    event.preventDefault();
                    const goingDown = section.getBoundingClientRect().top > 0;
                    // Scrolling down hides the navbar, so only the tab bar remains above.
                    const offset = cssPixels("--tabbar-h") + (goingDown ? 0 : cssPixels("--nav-h")) + 24;
                    scrollToElement(section, offset);
                    section.focus({ preventScroll: true });
                    window.history.replaceState(window.history.state, "", `#${category.id}`);
                    setActive(category.id);
                  }}
                  className={cn(
                    "relative inline-flex h-11 items-center gap-2 rounded-full px-4 text-[0.9375rem] font-medium whitespace-nowrap transition-colors duration-[var(--dur-fast)] ease-brand",
                    isActive ? "text-surface" : "text-ink2 hover:text-ink",
                  )}
                >
                  {isActive ? (
                    <m.span
                      layoutId="services-tab"
                      aria-hidden="true"
                      className="absolute inset-x-0 inset-y-1 rounded-full bg-ink"
                    />
                  ) : null}
                  <span className={cn("numeral relative text-[0.875rem]", isActive ? "text-surface-soft" : "text-ink-soft")}>
                    {category.index}
                  </span>
                  <span className="relative">{category.shortTitle}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
