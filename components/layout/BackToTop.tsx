"use client";

import { ArrowUp } from "lucide-react";
import { scrollToY } from "@/lib/scroll";

/** Returns to the top and moves keyboard focus back to the page start. */
export function BackToTop({ label }: { label: string }) {
  return (
    <a
      href="#top"
      onClick={(event) => {
        event.preventDefault();
        scrollToY(0);
        document.getElementById("main-content")?.focus({ preventScroll: true });
      }}
      className="group inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-medium text-surface"
    >
      <span className="link-slide link-slide-group">{label}</span>
      <ArrowUp
        aria-hidden="true"
        strokeWidth={1.75}
        className="size-4 transition-transform duration-[var(--dur-fast)] ease-brand group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5"
      />
    </a>
  );
}
