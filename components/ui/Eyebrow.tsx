import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

/** Small uppercase label that opens a section, led by a square in the tone's accent colour. */
export function Eyebrow({ children, as: Tag = "p", className }: EyebrowProps) {
  return (
    <Tag className={cn("eyebrow inline-flex items-center gap-3 text-fg", className)}>
      <span aria-hidden="true" className="size-2 shrink-0 rounded-[2px] bg-accent" />
      <span>{children}</span>
    </Tag>
  );
}
