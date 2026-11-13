import { Fragment, type ElementType } from "react";
import { cn, cssVars } from "@/lib/cn";

type MaskedTextProps = {
  as?: ElementType;
  /** Each entry is one line. Lines rise from 110% inside an overflow mask. */
  lines: readonly string[];
  className?: string;
  id?: string;
  /** "view" reveals when scrolled into view; "load" plays on page load (hero). */
  trigger?: "view" | "load";
  /** Extra delay in milliseconds. */
  delay?: number;
};

/**
 * Masked line-by-line text reveal. Lines are authored explicitly so the
 * break points are designed, not left to the browser. Screen readers read
 * the sentence normally.
 */
export function MaskedText({
  as: Tag = "h2",
  lines,
  className,
  id,
  trigger = "view",
  delay = 0,
}: MaskedTextProps) {
  const onLoad = trigger === "load";
  return (
    <Tag
      id={id}
      className={className}
      data-reveal={onLoad ? undefined : "mask"}
      style={cssVars(onLoad ? { "--hero-start": `${40 + delay}ms` } : { "--reveal-delay": `${delay}ms` })}
      suppressHydrationWarning
    >
      {lines.map((line, index) => (
        <Fragment key={`${index}-${line}`}>
          <span className={cn("mask-line", onLoad && "hero-line")}>
            <span className={onLoad ? "hero-anim" : undefined} style={cssVars({ "--i": index })}>
              {line}
            </span>
          </span>
          {index < lines.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
