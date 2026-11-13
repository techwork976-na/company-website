import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getProject } from "@/content/projects";
import { home, serviceCategories, site } from "@/content/site";
import { palette } from "./tokens";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// Read once when the module loads, so image routes can be prerendered at build time.
const [semiBold, regular] = await Promise.all([
  readFile(join(process.cwd(), "assets/fonts/Geist-SemiBold.woff")),
  readFile(join(process.cwd(), "assets/fonts/Geist-Regular.woff")),
]);

const fonts = [
  { name: "Geist", data: semiBold, style: "normal" as const, weight: 600 as const },
  { name: "Geist", data: regular, style: "normal" as const, weight: 400 as const },
];

/** The Betteflow mark drawn as a construction, as in the home page hero. */
function Mark() {
  return (
    <svg width="400" height="500" viewBox="0 0 400 500">
      <rect width="400" height="500" fill={palette.surface} />
      <g stroke={palette.ink} strokeOpacity="0.3" strokeWidth="1.5" fill="none">
        <line x1="0" y1="90" x2="400" y2="90" />
        <line x1="0" y1="230" x2="400" y2="230" />
        <line x1="0" y1="410" x2="400" y2="410" />
        <line x1="110" y1="0" x2="110" y2="500" />
        <line x1="180" y1="0" x2="180" y2="500" />
        <circle cx="180" cy="160" r="70" />
        <circle cx="180" cy="320" r="90" />
      </g>
      <rect x="110" y="90" width="70" height="320" fill={palette.ink} />
      <path d="M180 90a70 70 0 0 1 0 140z" fill={palette.muted} />
      <path d="M180 230a90 90 0 0 1 0 180z" fill={palette.ink} />
      <circle cx="180" cy="160" r="5" fill={palette.accent} />
    </svg>
  );
}

type OgOptions = {
  eyebrow: string;
  title: string;
  footer?: string;
};

export async function renderOgImage({ eyebrow, title, footer = "Software · AI automation · Websites" }: OgOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: palette.ink,
          color: palette.surface,
          fontFamily: "Geist",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 760,
            padding: "64px 0 60px 72px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <svg width="34" height="34" viewBox="0 0 24 24" fill={palette.surface}>
              <rect x="4" y="3" width="5" height="18" />
              <path d="M9 3a4.5 4.5 0 0 1 0 9z" />
              <path d="M9 11a5 5 0 0 1 0 10z" />
            </svg>
            <span style={{ fontWeight: 600, fontSize: 34, letterSpacing: -1.6 }}>{site.name}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 22,
                letterSpacing: 0.2,

                color: palette.muted,
              }}
            >
              {eyebrow}
            </span>
            <span
              style={{
                marginTop: 22,
                fontWeight: 600,
                fontSize: title.length > 48 ? 64 : 76,
                lineHeight: 1,
                letterSpacing: -3,
                maxWidth: 640,
              }}
            >
              {title}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <span style={{ width: 40, height: 2, background: palette.accent }} />
            <span style={{ fontSize: 24, color: palette.muted }}>{footer}</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1, paddingRight: 56 }}>
          <div style={{ display: "flex", borderRadius: 24, overflow: "hidden" }}>
            <Mark />
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts },
  );
}

export function renderSiteOgImage() {
  return renderOgImage({ eyebrow: home.hero.label, title: home.hero.headline.join(" ") });
}

export function renderProjectOgImage(slug: string) {
  const project = getProject(slug);
  const category = serviceCategories.find((item) => item.id === project?.category);
  return renderOgImage({
    eyebrow: category ? `${category.title}${project?.placeholder ? " · Sample" : ""}` : site.tagline,
    title: project?.name ?? site.name,
    footer: project?.summary,
  });
}
