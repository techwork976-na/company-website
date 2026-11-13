"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/content/projects";
import { home, workPage } from "@/content/site";
import { cn } from "@/lib/cn";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { Tag } from "@/components/ui/Tag";

/**
 * Project cards with a preview panel. Each card carries a soft spotlight
 * that follows the pointer (React Bits SpotlightCard). On large screens
 * the panel stays beside the list and cross-fades to whichever project is
 * hovered or focused; on smaller screens each card shows its own preview.
 */
export function WorkList({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const current = projects[active] ?? projects[0];

  return (
    <div className="grid grid-cols-1 gap-x-8 lg:grid-cols-12">
      <ul className="space-y-3 lg:col-span-7">
        {projects.map((project, index) => (
          <li key={project.slug}>
            <SpotlightCard
              theme="dark"
              intensity={0.12}
              spotlightSize={320}
              className={cn(
                "group transition-[background-color] duration-[var(--dur-base)] ease-brand",
                index === active && "lg:bg-ink2",
              )}
            >
              <Link
                href={`/work/${project.slug}`}
                prefetch
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className="relative z-[2] block rounded-card p-5 sm:p-6"
              >
                <div className="mb-5 aspect-[16/10] overflow-hidden rounded-ui lg:hidden">
                  <ProjectVisual project={project} sizes="(min-width: 768px) 90vw, 100vw" />
                </div>
                <div className="flex items-start gap-4 lg:gap-6">
                  <span className="numeral pt-1 text-[0.875rem] text-surface-soft lg:pt-2">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="block text-[0.875rem] font-medium text-surface-soft">{project.kind}</span>
                    <span className="mt-1 block text-h3 font-semibold text-surface">{project.name}</span>
                    <span className="mt-2 block text-surface-soft">{project.result}</span>
                    <span className="mt-4 flex flex-wrap items-center gap-2">
                      {project.scope.slice(0, 2).map((item) => (
                        <Tag key={item} tone="dark">
                          {item}
                        </Tag>
                      ))}
                      {project.placeholder ? <Tag variant="sample">{workPage.sampleTag}</Tag> : null}
                    </span>
                  </div>
                  <span
                    aria-hidden="true"
                    className="hidden size-11 shrink-0 items-center justify-center rounded-full border border-line-inverse-strong text-surface transition-colors duration-[var(--dur-fast)] ease-brand group-hover:border-surface group-hover:bg-surface group-hover:text-ink sm:flex"
                  >
                    <ArrowUpRight strokeWidth={1.75} className="size-5" />
                  </span>
                </div>
              </Link>
            </SpotlightCard>
          </li>
        ))}
      </ul>

      <div aria-hidden="true" className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-[calc(var(--nav-h)+1.5rem)]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-line-inverse bg-ink2">
            {projects.map((project, index) => (
              <div
                key={project.slug}
                className={cn(
                  "absolute inset-0 transition-opacity duration-[var(--dur-base)] ease-brand",
                  index === active ? "opacity-100" : "opacity-0",
                )}
              >
                <ProjectVisual project={project} sizes="(min-width: 1024px) 36vw, 0px" />
              </div>
            ))}
          </div>
          <p className="mt-3 flex items-center justify-between text-[0.875rem] text-surface-soft">
            <span>
              {home.work.previewLabel}: <span className="text-surface">{current?.name}</span>
            </span>
            <span className="numeral">
              {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
