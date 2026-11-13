"use client";

import { useEffect, useRef, useState } from "react";
import { home } from "@/content/site";
import { cn, cssVars } from "@/lib/cn";
import { TechIcon } from "@/lib/tech-icons";
import { MaskedText } from "@/components/motion/MaskedText";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { NMark } from "@/components/ui/Logo";

type Category = (typeof home.tech.categories)[number];

const dots = ["bg-coral", "bg-sun", "bg-violet", "bg-emerald", "bg-rose", "bg-sky", "bg-periwinkle", "bg-lime"];

const rings = [
  { ring: 1, radius: "21cqw", duration: "80s", direction: "normal", counter: "reverse" },
  { ring: 2, radius: "33cqw", duration: "110s", direction: "reverse", counter: "normal" },
  { ring: 3, radius: "45.5cqw", duration: "150s", direction: "normal", counter: "reverse" },
] as const;

/** Every tool once, on the ring of the first category that lists it. */
function toolsByRing(categories: readonly Category[]) {
  const seen = new Map<string, { name: string; ring: number; categories: string[] }>();
  for (const category of categories) {
    for (const tool of category.tools) {
      const entry = seen.get(tool);
      if (entry) entry.categories.push(category.id);
      else seen.set(tool, { name: tool, ring: category.ring, categories: [category.id] });
    }
  }
  const all = [...seen.values()];
  return rings.map((ring) => all.filter((tool) => tool.ring === ring.ring));
}

/**
 * The technology ecosystem: one large orbit with three concentric rings
 * turning at different speeds and directions. Hovering pauses it. The
 * category list beside it filters the orbit: the chosen category's tools
 * light up and the rest step back. The list is the accessible content;
 * the orbit is its visual companion.
 */
export function TechEcosystem() {
  const content = home.tech;
  const [hovered, setHovered] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const filter = hovered ?? pinned;
  const orbitRef = useRef<HTMLDivElement>(null);
  const grouped = toolsByRing(content.categories);
  const total = grouped.reduce((sum, ring) => sum + ring.length, 0);

  // Pause the rings while they are off screen.
  useEffect(() => {
    const orbit = orbitRef.current;
    if (!orbit) return;
    const observer = new IntersectionObserver(([entry]) => {
      orbit.toggleAttribute("data-offscreen", !entry?.isIntersecting);
    });
    observer.observe(orbit);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="technology"
      data-tone="paper"
      aria-labelledby="tech-title"
      className="section-y relative overflow-hidden"
    >
      <div className="container-wide">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <MaskedText id="tech-title" lines={content.title} className="mt-6 text-h2 text-fg" />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={120}>
            <p className="text-lead text-fg-soft">{content.description}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 items-center gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <Reveal
            as="ul"
            className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:col-span-5"
            onMouseLeave={() => setHovered(null)}
          >
            {content.categories.map((category, index) => {
              const on = filter === category.id;
              return (
                <li key={category.id} className="border-t border-line">
                  <button
                    type="button"
                    aria-pressed={pinned === category.id}
                    onMouseEnter={() => setHovered(category.id)}
                    onFocus={() => setHovered(category.id)}
                    onBlur={() => setHovered(null)}
                    onClick={() => setPinned((current) => (current === category.id ? null : category.id))}
                    className="group w-full py-4 text-left"
                  >
                    <span className="flex items-center gap-2.5">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "size-2.5 shrink-0 rounded-[3px] transition-transform duration-[var(--dur-base)] ease-brand",
                          dots[index],
                          on && "scale-150",
                        )}
                      />
                      <span
                        className={cn(
                          "font-display text-[1.125rem] font-bold tracking-[-0.02em] transition-colors duration-[var(--dur-base)]",
                          on ? "text-accent" : "text-fg",
                        )}
                      >
                        {category.label}
                      </span>
                    </span>
                    <span className="mt-1.5 block pl-5 text-small text-fg-soft">{category.tools.join(", ")}</span>
                  </button>
                </li>
              );
            })}
          </Reveal>

          <div className="lg:col-span-7">
            <div
              ref={orbitRef}
              aria-hidden="true"
              className="orbit mx-auto max-w-[42rem]"
              data-filter={filter ?? undefined}
            >
              {rings.map((ring, ringIndex) => {
                const tools = grouped[ringIndex]!;
                return (
                  <div
                    key={ring.ring}
                    className="orbit__ring"
                    style={cssVars({ "--r": ring.radius, "--dur": ring.duration, "--dir": ring.direction })}
                  >
                    {tools.map((tool, index) => (
                      <div
                        key={tool.name}
                        className="orbit__item"
                        data-on={filter && tool.categories.includes(filter) ? "" : undefined}
                        style={cssVars({
                          "--a": `${(360 / tools.length) * index + ringIndex * 17}deg`,
                          "--r": ring.radius,
                        })}
                      >
                        {/* Positioned at the ring's centre offset; the ring's own box is the reference. */}
                        <div
                          className="orbit__spin"
                          style={cssVars({ "--dur": ring.duration, "--counter": ring.counter })}
                        >
                          <span className="orbit__tile relative flex size-[clamp(2rem,8.6cqw,3.375rem)] items-center justify-center rounded-[28%] border border-line bg-white">
                            <TechIcon name={tool.name} />
                            <span className="orbit__label pointer-events-none absolute top-[calc(100%+0.375rem)] left-1/2 rounded-md bg-ink px-2 py-1 text-[0.6875rem] font-semibold whitespace-nowrap text-white">
                              {tool.name}
                            </span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}

              <div className="absolute top-1/2 left-1/2 flex size-[28cqw] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-indigo text-center text-paper">
                <NMark className="size-[8cqw]" />
                <span className="mt-[1.5cqw] font-display text-[4.6cqw] leading-none font-extrabold">{total}+</span>
                <span className="mt-[0.8cqw] text-[2.1cqw] font-semibold tracking-[0.12em] uppercase opacity-70">
                  {content.orbitLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
