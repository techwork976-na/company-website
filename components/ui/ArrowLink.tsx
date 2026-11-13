import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Direction = "right" | "left" | "up-right";

type ArrowLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  children: ReactNode;
  className?: string;
  /** "right" moves forward, "left" goes back, "up-right" opens something. */
  direction?: Direction;
};

const icons = { right: ArrowRight, left: ArrowLeft, "up-right": ArrowUpRight };

const nudge: Record<Direction, string> = {
  right: "group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5",
  left: "group-hover:-translate-x-0.5 group-focus-visible:-translate-x-0.5",
  "up-right":
    "group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5",
};

/** Text link with a sliding gold underline and an arrow that nudges on hover. */
export function ArrowLink({ children, className, direction = "right", ...rest }: ArrowLinkProps) {
  const Icon = icons[direction];
  const icon = (
    <Icon
      aria-hidden="true"
      strokeWidth={1.75}
      className={cn(
        "size-4 shrink-0 transition-transform duration-[var(--dur-fast)] ease-brand",
        nudge[direction],
      )}
    />
  );
  return (
    <Link
      className={cn("group inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-medium", className)}
      {...rest}
    >
      {direction === "left" ? icon : null}
      <span className="link-slide link-slide-group">{children}</span>
      {direction === "left" ? null : icon}
    </Link>
  );
}
