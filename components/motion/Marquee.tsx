"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type MarqueeProps = {
  items: readonly string[];
  label: string;
  pauseLabel: string;
  playLabel: string;
  className?: string;
};

function MarqueeCopy({ items, hidden, label }: { items: readonly string[]; hidden?: boolean; label?: string }) {
  return (
    <ul
      className="marquee__copy flex shrink-0 items-center"
      aria-hidden={hidden ? "true" : undefined}
      aria-label={hidden ? undefined : label}
    >
      {items.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          <span className="px-5 sm:px-7">{item}</span>
          <span aria-hidden="true" className="size-1 rounded-full bg-line-strong" />
        </li>
      ))}
    </ul>
  );
}

/**
 * One slow, text-only marquee running edge to edge. It pauses on hover, on
 * focus, when off screen (browsers also pause it in hidden tabs), and a
 * visible button lets anyone stop it. Static when reduced motion is on.
 */
export function Marquee({ items, label, pauseLabel, playLabel, className }: MarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      element.toggleAttribute("data-offscreen", !entry?.isIntersecting);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("marquee relative", className)} data-paused={paused ? "" : undefined}>
      <div className="marquee__track py-4">
        <MarqueeCopy items={items} label={label} />
        <MarqueeCopy items={items} hidden />
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center">
        <div className="container-wide flex justify-end">
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            aria-pressed={paused}
            aria-label={paused ? playLabel : pauseLabel}
            className="pointer-events-auto flex size-11 shrink-0 items-center justify-center rounded-full border border-line-strong bg-bg text-ink shadow-button transition-colors duration-[var(--dur-fast)] ease-brand hover:border-ink motion-reduce:hidden"
          >
            {paused ? (
              <Play aria-hidden="true" className="size-4" strokeWidth={1.75} />
            ) : (
              <Pause aria-hidden="true" className="size-4" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
