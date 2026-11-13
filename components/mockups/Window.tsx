import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Minimal app window chrome shared by the desktop mockups. */
export function Window({
  title,
  children,
  className,
  dark = false,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[14px] shadow-mock",
        dark ? "bg-indigo-deep text-white" : "bg-white text-ink",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-9 items-center gap-3 border-b px-3.5",
          dark ? "border-white/10 bg-indigo" : "border-ink/8 bg-[#F7F4EE]",
        )}
      >
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-coral" />
          <span className="size-2.5 rounded-full bg-sun" />
          <span className="size-2.5 rounded-full bg-emerald" />
        </span>
        <span className={cn("truncate text-[11px] font-semibold", dark ? "text-white/70" : "text-ink/60")}>
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

/** Small initial badge used as an avatar in mockups (no photos). */
export function Initial({ name, className }: { name: string; className?: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
  return (
    <span
      aria-hidden="true"
      className={cn("flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold", className)}
    >
      {initials}
    </span>
  );
}
