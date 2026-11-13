import type { ReactNode } from "react";

/**
 * Simple geometric marks for the demo client brands. Invented shapes, so no
 * real company's logo is imitated.
 */
const marks: Record<string, { color: string; ink: string; path: ReactNode }> = {
  Nexora: {
    color: "#5B3DF5",
    ink: "#FFFDF8",
    path: (
      <path
        d="M12 2.5l8.2 4.75v9.5L12 21.5l-8.2-4.75v-9.5z M9 8v8h1.8v-4.6L14.9 16H16.7V8h-1.8v4.6L10.8 8z"
        fillRule="evenodd"
      />
    ),
  },
  "Vertex Labs": {
    color: "#FF6B4A",
    ink: "#FFFDF8",
    path: <path d="M12 3l9.5 17h-19zM12 9.2l-4.6 8.2h9.2z" fillRule="evenodd" />,
  },
  "Orbit Solutions": {
    color: "#3DAEFF",
    ink: "#16123F",
    path: (
      <>
        <path
          d="M12 3.5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17zm0 3a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11z"
          fillRule="evenodd"
        />
        <circle cx="19" cy="6" r="2.4" />
      </>
    ),
  },
  "Elevate Digital": {
    color: "#11A37F",
    ink: "#FFFDF8",
    path: <path d="M12 3l8 8h-4.5L12 7.5 8.5 11H4zm0 7l8 8h-4.5L12 14.5 8.5 18H4z" />,
  },
  Cloudnest: {
    color: "#8B7BFF",
    ink: "#FFFDF8",
    path: <path d="M3 15a9 9 0 0 1 18 0h-3a6 6 0 0 0-12 0zm4 0a5 5 0 0 1 10 0h-3a2 2 0 0 0-4 0zM3 17h18v3H3z" />,
  },
  PixelCraft: {
    color: "#FF7EB3",
    ink: "#16123F",
    path: <path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm12 2h6v6h-6z" />,
  },
  "Flux Technologies": {
    color: "#FFC23D",
    ink: "#16123F",
    path: (
      <path d="M2.5 9.5c2.5-3.3 5-3.3 7.5 0s5 3.3 7.5 0c1.2-1.6 2.4-2.4 4-2.4v3c-.6 0-1.2.4-1.6 1-3.7 4.8-8 4.8-11.8 0-1.8-2.4-3.2-2.4-5 0zm0 6c2.5-3.3 5-3.3 7.5 0s5 3.3 7.5 0c1.2-1.6 2.4-2.4 4-2.4v3c-.6 0-1.2.4-1.6 1-3.7 4.8-8 4.8-11.8 0-1.8-2.4-3.2-2.4-5 0z" />
    ),
  },
  "Beyond Commerce": {
    color: "#D4F36A",
    ink: "#16123F",
    path: <path d="M3 3h3v18H3zm6 7.5h7.4L13 7.1l2.1-2.1 7 7-7 7-2.1-2.1 3.4-3.4H9z" />,
  },
};

export function brandColors(name: string) {
  const mark = marks[name];
  return { color: mark?.color ?? "#5B3DF5", ink: mark?.ink ?? "#FFFDF8" };
}

export function BrandMark({ name, className }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className} fill="currentColor">
      {marks[name]?.path}
    </svg>
  );
}

/* Typographic wordmarks for the full logos: a main word and an optional small-caps line. */
const wordmarks: Record<string, { word: string; sub?: string; size: number }> = {
  Nexora: { word: "Nexora", size: 24 },
  "Vertex Labs": { word: "Vertex", sub: "LABS", size: 24 },
  "Orbit Solutions": { word: "orbit", sub: "SOLUTIONS", size: 25 },
  "Elevate Digital": { word: "Elevate", sub: "DIGITAL", size: 22 },
  Cloudnest: { word: "cloudnest", size: 19 },
  PixelCraft: { word: "PixelCraft", size: 18 },
  "Flux Technologies": { word: "FLUX", sub: "TECHNOLOGIES", size: 26 },
  "Beyond Commerce": { word: "Beyond", sub: "COMMERCE", size: 23 },
};

/**
 * A complete demo logo: the geometric mark above a typographic wordmark,
 * drawn as one SVG (120 x 120 units) so it scales cleanly and stays centred.
 * Monochrome in currentColor, so it sits on any solid brand colour.
 */
export function BrandLogo({ name, className }: { name: string; className?: string }) {
  const wordmark = wordmarks[name] ?? { word: name, size: 18 };
  // Centre the stack vertically: mark (40) + gap + word + optional sub-line.
  const stack = 40 + 12 + wordmark.size * 0.78 + (wordmark.sub ? 16 : 0);
  const top = (120 - stack) / 2;
  const baseline = top + 40 + 12 + wordmark.size * 0.78;
  return (
    <svg viewBox="0 0 120 120" role="img" aria-label={name} className={className} fill="currentColor">
      <svg x="40" y={top} width="40" height="40" viewBox="0 0 24 24">
        {marks[name]?.path}
      </svg>
      <text
        x="60"
        y={baseline}
        textAnchor="middle"
        fontSize={wordmark.size}
        fontWeight={800}
        letterSpacing={-0.04 * wordmark.size}
        className="font-display"
      >
        {wordmark.word}
      </text>
      {wordmark.sub ? (
        <text
          x="60"
          y={baseline + 15}
          textAnchor="middle"
          fontSize={8.5}
          fontWeight={700}
          letterSpacing={2.4}
          className="font-sans"
        >
          {wordmark.sub}
        </text>
      ) : null}
    </svg>
  );
}
