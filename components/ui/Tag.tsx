import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type TagProps = {
  children: ReactNode;
  /** "outline" for categories, "sample" marks placeholder content. */
  variant?: "outline" | "sample";
  tone?: "light" | "dark";
  className?: string;
};

export function Tag({ children, variant = "outline", tone = "light", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded-full px-2.5 text-[0.875rem] leading-none font-medium whitespace-nowrap",
        variant === "sample"
          ? "bg-muted text-ink"
          : tone === "light"
            ? "border border-line-strong text-ink2"
            : "border border-line-inverse-strong text-surface",
        className,
      )}
    >
      {children}
    </span>
  );
}
