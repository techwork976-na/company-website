"use client";

import { useLayoutEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { easeBrand } from "@/lib/easing";
import { motion } from "@/lib/tokens";
import { REDUCED_MOTION } from "@/lib/use-media-query";

type CountUpProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

const DURATION_MS = motion.duration.countUp * 1000;

/**
 * Counts up once when first visible (0.4s, brand easing). The final value
 * is server-rendered, reserved for layout and read by screen readers, so
 * nothing jumps and nothing is lost without JavaScript. Numbers that are
 * already on screen when the page boots keep their final value.
 */
export function CountUp({ value, prefix = "", suffix = "", className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const finalText = `${prefix}${value}${suffix}`;

  // Layout effect: the reset to 0 happens before paint, so it is never seen.
  useLayoutEffect(() => {
    const element = ref.current;
    const textNode = element?.firstChild;
    if (!element || !textNode || element.dataset.counted) return;
    if (window.matchMedia(REDUCED_MOTION).matches) return;
    const rect = element.getBoundingClientRect();
    if (rect.width > 0 && rect.top < window.innerHeight && rect.bottom > 0) {
      element.dataset.counted = "true";
      return;
    }

    const write = (text: string) => {
      textNode.nodeValue = text;
    };

    let frame = 0;
    write(`${prefix}0${suffix}`);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / DURATION_MS);
          write(`${prefix}${Math.round(value * easeBrand(progress))}${suffix}`);
          if (progress < 1) {
            frame = requestAnimationFrame(tick);
          } else {
            element.dataset.counted = "true";
          }
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      if (!element.dataset.counted) write(`${prefix}${value}${suffix}`);
    };
  }, [value, prefix, suffix]);

  return (
    <span className={cn("inline-grid tabular-nums", className)}>
      <span className="sr-only">{finalText}</span>
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {finalText}
      </span>
      <span aria-hidden="true" ref={ref} className="col-start-1 row-start-1">
        {finalText}
      </span>
    </span>
  );
}
