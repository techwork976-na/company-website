"use client";

import { AnimatePresence } from "framer-motion";
import * as m from "framer-motion/m";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Project } from "@/content/projects";
import type { ServiceCategoryId } from "@/content/site";
import { workPage } from "@/content/site";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";

type Filter = "all" | ServiceCategoryId;

type WorkGridProps = {
  projects: Project[];
  filters: { id: ServiceCategoryId; label: string }[];
  /** Server-rendered cards, one per project, in the same order. */
  cards: ReactNode[];
};

/**
 * Filter control and the project grid. A dark pill slides to the chosen
 * filter; cards fade out, and the remaining ones glide to their new places
 * (Framer Motion layout animation, 0.25s). The grid keeps the height of the
 * full list, so the page below never jumps.
 */
export function WorkGrid({ projects, filters, cards }: WorkGridProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [minHeight, setMinHeight] = useState<number>();
  const listRef = useRef<HTMLUListElement>(null);

  const visible = projects
    .map((project, index) => ({ project, card: cards[index] }))
    .filter(({ project }) => filter === "all" || project.category === filter);

  const activeLabel = filters.find((item) => item.id === filter)?.label ?? "";

  useEffect(() => {
    const list = listRef.current;
    if (!list || filter !== "all") return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setMinHeight(entry.target.getBoundingClientRect().height);
    });
    observer.observe(list);
    return () => observer.disconnect();
  }, [filter]);

  const options: { id: Filter; label: string }[] = [{ id: "all", label: workPage.allLabel }, ...filters];

  return (
    <div className="container-wide pb-[var(--section-y)]">
      <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="group"
          aria-label={workPage.filterLabel}
          className="tabbar-scroller max-w-full self-start overflow-x-auto rounded-full border border-line bg-surface p-1"
        >
          <div className="flex w-max gap-1">
            {options.map((option) => {
              const pressed = option.id === filter;
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={pressed}
                  onClick={() => setFilter(option.id)}
                  className={cn(
                    "relative inline-flex h-11 items-center rounded-full px-4 text-[0.9375rem] font-medium whitespace-nowrap transition-colors duration-[var(--dur-fast)] ease-brand",
                    pressed ? "text-surface" : "text-ink2 hover:text-ink",
                  )}
                >
                  {pressed ? (
                    <m.span layoutId="work-filter" aria-hidden="true" className="absolute inset-0 rounded-full bg-ink" />
                  ) : null}
                  <span className="relative">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        <p role="status" className="text-[0.875rem] text-ink-soft">
          {workPage.countLabel(visible.length, filter === "all" ? "" : activeLabel)}
        </p>
      </div>

      <div style={{ minHeight }}>
        {visible.length > 0 ? (
          <ul ref={listRef} className="relative mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-10">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map(({ project, card }) => (
                <m.li
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                >
                  {card}
                </m.li>
              ))}
            </AnimatePresence>
          </ul>
        ) : (
          <div className="swap-in mt-8 rounded-card border border-line bg-surface px-6 py-16 text-center lg:mt-10">
            <p className="text-title font-semibold text-ink">{workPage.emptyTitle}</p>
            <p className="mt-2 text-ink2">{workPage.emptyText}</p>
            <ButtonLink href={workPage.emptyCta.href} className="mt-8">
              {workPage.emptyCta.label}
            </ButtonLink>
          </div>
        )}
      </div>
    </div>
  );
}
