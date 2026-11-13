import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * The NOVARY® mark: an N built from two violet blocks and a lime diagonal,
 * on a rounded square. Flat colour, so it works at any size.
 */
export function NMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false" className={className}>
      <rect width="32" height="32" rx="9" fill="#5B3DF5" />
      <rect x="8" y="8" width="4.5" height="16" rx="1.2" fill="#FFFDF8" />
      <rect x="19.5" y="8" width="4.5" height="16" rx="1.2" fill="#FFFDF8" />
      <path d="M8 8h4.5L24 24h-4.5z" fill="#D4F36A" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <NMark className="size-8 shrink-0" />
      <span className="font-display text-[1.375rem] leading-none font-extrabold tracking-[-0.04em]">
        {site.name}
        <sup className="ml-0.5 align-super text-[0.55em] font-semibold">{site.mark}</sup>
      </span>
    </span>
  );
}
