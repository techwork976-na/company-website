import type { ElementType, HTMLAttributes } from "react";
import { cssVars } from "@/lib/cn";

type StaggerProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  /** Delay between items in milliseconds (40 to 60 for lists and cards). */
  stagger?: number;
  /** Delay before the first item in milliseconds. */
  delay?: number;
};

/** A container whose StaggerItem children fade up one after another, once. */
export function Stagger({ as: Tag = "div", stagger = 60, delay = 0, style, ...rest }: StaggerProps) {
  return (
    <Tag
      data-stagger=""
      style={cssVars({ "--stagger": `${stagger}ms`, "--reveal-delay": `${delay}ms` }, style)}
      suppressHydrationWarning
      {...rest}
    />
  );
}

type StaggerItemProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  /** Position in the sequence, starting at 0. */
  index: number;
};

export function StaggerItem({ as: Tag = "div", index, style, ...rest }: StaggerItemProps) {
  return <Tag data-reveal-item="" style={cssVars({ "--i": index }, style)} {...rest} />;
}
