import { cn } from "@/lib/cn";
import { site } from "@/content/site";

/**
 * The Betteflow mark: a geometric B built from a stem and two half discs.
 * The same geometry is used, at large scale, in the home page hero.
 */
export function BMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className} fill="currentColor">
      <rect x="4" y="3" width="5" height="18" />
      <path d="M9 3a4.5 4.5 0 0 1 0 9z" />
      <path d="M9 11a5 5 0 0 1 0 10z" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <BMark className="size-5 shrink-0" />
      <span className="text-[1.25rem] leading-none font-semibold tracking-[-0.045em]">{site.name}</span>
    </span>
  );
}
