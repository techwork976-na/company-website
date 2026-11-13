/**
 * Design tokens for code that cannot read CSS variables: generated images
 * (Open Graph, icons), emails and JavaScript-driven motion. The CSS source
 * of truth is app/globals.css; keep the two in sync.
 */

export const palette = {
  /** Warm paper: the main light canvas. */
  paper: "#F4EFE6",
  paperDeep: "#EAE2D3",
  /** Soft violet tint: the second light canvas. */
  lilac: "#E7E1FF",
  /** Text on light canvases. */
  ink: "#16123F",
  /** Deep indigo: the dark canvas. */
  indigo: "#1B1650",
  indigoDeep: "#120E3D",
  violet: "#5B3DF5",
  coral: "#FF6B4A",
  lime: "#D4F36A",
  sun: "#FFC23D",
  sky: "#3DAEFF",
  rose: "#FF7EB3",
  emerald: "#11A37F",
  periwinkle: "#8B7BFF",
  white: "#FFFDF8",
} as const;

export type PaletteColor = keyof typeof palette;

/**
 * Motion: smooth and controlled. UI feedback is quick (150 to 320ms),
 * reveals take 0.6s, and the journey colour shift 0.7s.
 * Values in seconds for Framer Motion and GSAP; CSS uses --dur-*.
 */
export const motion = {
  /** cubic-bezier(0.22, 1, 0.36, 1) */
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  duration: {
    fast: 0.15,
    base: 0.24,
    slow: 0.36,
    reveal: 0.6,
  },
} as const;
