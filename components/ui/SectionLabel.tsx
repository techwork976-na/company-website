import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionLabelProps = {
  children: ReactNode;
  /** Small index number such as "01". */
  index?: string;
  tone?: "light" | "dark";
  as?: ElementType;
  className?: string;
};

/**
 * Small pill label that opens a section: a gold dot (the section's single
 * gold detail), an optional index number and a short name.
 */
export function SectionLabel({ children, index, tone = "light", as: Tag = "p", className }: SectionLabelProps) {
  return (
    <Tag
      className={cn(
        "eyebrow inline-flex h-8 items-center gap-2.5 rounded-full border px-3.5",
        tone === "light" ? "border-line bg-bg text-ink2" : "border-line-inverse text-surface",
        className,
      )}
    >
      <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent" />
      {index ? (
        <span className={cn("numeral", tone === "light" ? "text-ink-soft" : "text-surface-soft")}>{index}</span>
      ) : null}
      <span>{children}</span>
    </Tag>
  );
}
