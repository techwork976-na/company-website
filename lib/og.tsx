import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { home, site } from "@/content/site";
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

/** A few flat isometric blocks, echoing the hero illustration. */
function Blocks() {
  return (
    <svg width="380" height="380" viewBox="0 0 380 380">
      <polygon points="190,70 330,150 190,230 50,150" fill="#D8CFFF" />
      <polygon points="50,150 190,230 190,250 50,170" fill="#B5A9F0" />
      <polygon points="190,230 330,150 330,170 190,250" fill="#968AD6" />
      <polygon points="120,40 170,68 170,180 120,152" fill="#3F27C7" />
      <polygon points="170,68 220,40 220,152 170,180" fill="#2E1D9A" />
      <polygon points="120,40 170,12 220,40 170,68" fill={palette.violet} />
      <polygon points="210,140 260,168 260,214 210,186" fill="#D9573C" />
      <polygon points="260,168 310,140 310,186 260,214" fill="#B54632" />
      <polygon points="210,140 260,112 310,140 260,168" fill={palette.coral} />
      <polygon points="90,170 140,198 140,226 90,198" fill="#B0CC55" />
      <polygon points="140,198 190,170 190,198 140,226" fill="#93AB46" />
      <polygon points="90,170 140,142 190,170 140,198" fill={palette.lime} />
      <polygon points="236,64 260,78 260,102 236,88" fill="#D9A231" />
      <polygon points="260,78 284,64 284,88 260,102" fill="#B58629" />
      <polygon points="236,64 260,50 284,64 260,78" fill={palette.sun} />
    </svg>
  );
}

type OgOptions = { eyebrow: string; title: string; footer?: string };

export async function renderOgImage({ eyebrow, title, footer = site.tagline }: OgOptions) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: palette.indigo,
        color: palette.paper,
        fontFamily: "Geist",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: 780,
          padding: "64px 0 60px 72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="44" height="44" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="9" fill={palette.violet} />
            <rect x="8" y="8" width="4.5" height="16" rx="1.2" fill={palette.white} />
            <rect x="19.5" y="8" width="4.5" height="16" rx="1.2" fill={palette.white} />
            <path d="M8 8h4.5L24 24h-4.5z" fill={palette.lime} />
          </svg>
          <span style={{ fontWeight: 600, fontSize: 36, letterSpacing: -1.5 }}>
            {site.name}
            {site.mark}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 22, letterSpacing: 3, color: palette.lime, textTransform: "uppercase" }}>
            {eyebrow}
          </span>
          <span
            style={{
              marginTop: 22,
              fontWeight: 600,
              fontSize: title.length > 48 ? 64 : 76,
              lineHeight: 1,
              letterSpacing: -3,
              maxWidth: 680,
            }}
          >
            {title}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <span style={{ width: 40, height: 4, background: palette.coral }} />
          <span style={{ fontSize: 24, color: "#C9C3E8" }}>{footer}</span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1, paddingRight: 40 }}>
        <Blocks />
      </div>
    </div>,
    { ...ogSize, fonts },
  );
}

export function renderSiteOgImage() {
  return renderOgImage({ eyebrow: home.hero.eyebrow, title: home.hero.title.join(" ") });
}
