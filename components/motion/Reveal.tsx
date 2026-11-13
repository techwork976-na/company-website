import type { ElementType, HTMLAttributes } from "react";
import { cssVars } from "@/lib/cn";

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  /** "rise" fades up 24px, "fade" only fades. */
  variant?: "rise" | "fade";
  /** Extra delay in milliseconds. */
  delay?: number;
};

/**
 * Reveals its content once, when about 20% is in view. Renders on the
 * server; the shared RevealManager and CSS handle the motion.
 *
 * suppressHydrationWarning: the manager may mark an element as revealed
 * before React has hydrated that part of a streamed page. React keeps the
 * attribute, so this only silences the expected difference.
 */
export function Reveal({ as: Tag = "div", variant = "rise", delay = 0, style, ...rest }: RevealProps) {
  return (
    <Tag
      data-reveal={variant}
      style={cssVars({ "--reveal-delay": `${delay}ms` }, style)}
      suppressHydrationWarning
      {...rest}
    />
  );
}
