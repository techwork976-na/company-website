/**
 * Design tokens for code that cannot read CSS variables: generated images
 * (Open Graph, icons) and JavaScript-driven motion. The CSS source of truth
 * is app/globals.css; keep the two in sync.
 */

export const palette = {
  bg: "#ffffff",
  surface: "#f8f5ef",
  muted: "#e8dcc5",
  ink: "#111111",
  ink2: "#292929",
  accent: "#c5a46d",
} as const;

/**
 * Motion is quick and quiet: nothing on the site runs longer than 0.4s.
 * Values are in seconds for Framer Motion and GSAP; CSS uses the matching
 * --dur-* variables.
 */
export const motion = {
  /** cubic-bezier(0.22, 1, 0.36, 1) */
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  duration: {
    fast: 0.15,
    base: 0.22,
    slow: 0.32,
    reveal: 0.4,
    countUp: 0.4,
  },
} as const;
