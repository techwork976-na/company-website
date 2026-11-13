import { clsx, type ClassValue } from "clsx";
import type { CSSProperties } from "react";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge needs to know the custom token names from globals.css,
 * otherwise it would treat `text-h2` as a colour and drop `text-ink`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["label", "body", "lead", "title", "h3", "h2", "h1", "display"],
      radius: ["ui", "card", "panel"],
      shadow: ["button", "card", "pop"],
      ease: ["brand"],
      container: ["wide"],
    },
  },
});

/** Joins class names and resolves conflicting Tailwind utilities (last one wins). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Typed helper for inline CSS custom properties, for example { "--i": 2 }. */
export function cssVars(vars: Record<`--${string}`, string | number>, style?: CSSProperties) {
  return { ...style, ...vars } as CSSProperties;
}
