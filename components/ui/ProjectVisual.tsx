import Image from "next/image";
import type { JSX } from "react";
import type { Project, ProjectVisual as VisualName } from "@/content/projects";
import { cn } from "@/lib/cn";

/*
 * Interface previews drawn in code: crisp at any size, tiny to download and
 * built only from the palette tokens. Each is a 480 x 360 canvas.
 */

const hairline = { fill: "none", strokeWidth: 1, vectorEffect: "non-scaling-stroke" as const };

/** AI automation: trigger, agent and CRM connected, with the conversation below. */
function Automation() {
  const nodes = [40, 180, 320];
  return (
    <>
      <rect width="480" height="360" className="fill-surface" />
      <g {...hairline} className="stroke-line-strong">
        <line x1="160" y1="88" x2="180" y2="88" />
        <line x1="300" y1="88" x2="320" y2="88" />
        <line x1="240" y1="120" x2="240" y2="152" />
      </g>
      {nodes.map((x, i) => (
        <g key={x}>
          <rect x={x} y="56" width="120" height="64" rx="10" className={i === 1 ? "fill-ink" : "fill-bg"} />
          {i === 1 ? null : <rect x={x} y="56" width="120" height="64" rx="10" {...hairline} className="stroke-line-strong" />}
          <circle cx={x + 24} cy="88" r="10" className={i === 1 ? "fill-accent" : "fill-muted"} />
          <rect x={x + 44} y="78" width={i === 1 ? 52 : 46} height="6" rx="3" className={i === 1 ? "fill-surface" : "fill-ink"} />
          <rect x={x + 44} y="92" width={i === 1 ? 36 : 30} height="5" rx="2.5" className={i === 1 ? "fill-surface-soft" : "fill-line-strong"} />
        </g>
      ))}
      <g className="fill-ink">
        <circle cx="170" cy="88" r="3" />
        <circle cx="310" cy="88" r="3" />
        <circle cx="240" cy="136" r="3" />
      </g>
      <rect x="40" y="152" width="400" height="168" rx="12" className="fill-bg" />
      <rect x="40" y="152" width="400" height="168" rx="12" {...hairline} className="stroke-line-strong" />
      <rect x="58" y="172" width="168" height="30" rx="10" className="fill-muted" />
      <rect x="72" y="184" width="110" height="5" rx="2.5" className="fill-ink2" />
      <rect x="236" y="212" width="186" height="30" rx="10" className="fill-ink" />
      <rect x="250" y="224" width="132" height="5" rx="2.5" className="fill-surface" />
      <rect x="58" y="252" width="128" height="30" rx="10" className="fill-muted" />
      <rect x="72" y="264" width="78" height="5" rx="2.5" className="fill-ink2" />
      <rect x="58" y="298" width="250" height="4" rx="2" className="fill-line" />
      <rect x="58" y="298" width="172" height="4" rx="2" className="fill-accent" />
      <rect x="386" y="290" width="36" height="18" rx="9" className="fill-ink" />
      <path d="M398 299l4 4 8-8" {...hairline} strokeWidth="1.5" className="stroke-surface" />
    </>
  );
}

/** SaaS dashboard: navigation, three figures, a trend line and monthly bars. */
function Dashboard() {
  const bars = [18, 26, 22, 30, 28, 36, 32, 40, 38, 46, 42, 52];
  return (
    <>
      <rect width="480" height="360" className="fill-muted" />
      <rect x="36" y="40" width="408" height="280" rx="12" className="fill-bg" />
      <path d="M48 40h52v280H48a12 12 0 0 1-12-12V52a12 12 0 0 1 12-12z" className="fill-surface" />
      <rect x="52" y="60" width="32" height="8" rx="4" className="fill-ink" />
      {[92, 114, 136, 158].map((y, i) => (
        <rect key={y} x="52" y={y} width={i === 0 ? 36 : 28} height="5" rx="2.5" className={i === 0 ? "fill-ink" : "fill-line-strong"} />
      ))}
      {[116, 224, 332].map((x, i) => (
        <g key={x}>
          <rect x={x} y="58" width="96" height="56" rx="8" {...hairline} className="stroke-line-strong" />
          <rect x={x + 12} y="72" width="38" height="4" rx="2" className="fill-line-strong" />
          <rect x={x + 12} y="88" width={[56, 44, 50][i]} height="10" rx="3" className="fill-ink" />
        </g>
      ))}
      <g {...hairline} className="stroke-line">
        <line x1="116" y1="150" x2="428" y2="150" />
        <line x1="116" y1="182" x2="428" y2="182" />
        <line x1="116" y1="214" x2="428" y2="214" />
      </g>
      <polyline
        points="116,206 150,198 184,202 218,184 252,188 286,168 320,172 354,152 388,156 428,138"
        {...hairline}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        className="stroke-ink"
      />
      <line x1="354" y1="138" x2="354" y2="214" {...hairline} className="stroke-accent" />
      <circle cx="354" cy="152" r="5" className="fill-accent" />
      <circle cx="354" cy="152" r="2" className="fill-bg" />
      {bars.map((height, i) => (
        <rect key={i} x={116 + i * 26.4} y={300 - height} width="14" height={height} rx="3" className={i === 9 ? "fill-ink" : "fill-muted"} />
      ))}
    </>
  );
}

/** Retail POS: product grid on the left, the current order and Pay on the right. */
function Pos() {
  const tiles = [
    [52, 96],
    [136, 96],
    [220, 96],
    [52, 196],
    [136, 196],
    [220, 196],
  ];
  return (
    <>
      <rect width="480" height="360" className="fill-ink" />
      <rect x="36" y="40" width="408" height="280" rx="12" className="fill-surface" />
      <rect x="52" y="58" width="44" height="18" rx="9" className="fill-ink" />
      <rect x="104" y="58" width="52" height="18" rx="9" {...hairline} className="stroke-line-strong" />
      <rect x="164" y="58" width="40" height="18" rx="9" {...hairline} className="stroke-line-strong" />
      {tiles.map(([x, y], i) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width="72" height="84" rx="8" className="fill-bg" />
          <rect x={x + 8} y={y + 8} width="56" height="40" rx="5" className={i === 1 ? "fill-ink2" : "fill-muted"} />
          <rect x={x + 8} y={y + 58} width={[40, 34, 44, 30, 42, 36][i]} height="4" rx="2" className="fill-ink" />
          <rect x={x + 8} y={y + 68} width="22" height="4" rx="2" className="fill-line-strong" />
        </g>
      ))}
      <rect x="308" y="52" width="124" height="256" rx="10" className="fill-bg" />
      <rect x="320" y="68" width="48" height="6" rx="3" className="fill-ink" />
      {[96, 124, 152].map((y, i) => (
        <g key={y}>
          <rect x="320" y={y} width="16" height="16" rx="4" className="fill-muted" />
          <rect x="344" y={y + 2} width={[44, 36, 40][i]} height="4" rx="2" className="fill-ink2" />
          <rect x="344" y={y + 10} width="20" height="3" rx="1.5" className="fill-line-strong" />
          <rect x="400" y={y + 5} width="20" height="5" rx="2.5" className="fill-ink" />
        </g>
      ))}
      <line x1="320" y1="190" x2="420" y2="190" {...hairline} className="stroke-line-strong" />
      <rect x="320" y="204" width="30" height="5" rx="2.5" className="fill-line-strong" />
      <rect x="384" y="202" width="36" height="9" rx="3" className="fill-ink" />
      <rect x="320" y="262" width="100" height="32" rx="16" className="fill-accent" />
      <rect x="352" y="275" width="36" height="6" rx="3" className="fill-ink" />
    </>
  );
}

/** E-commerce: a storefront window with a headline and three products. */
function Storefront() {
  return (
    <>
      <rect width="480" height="360" className="fill-surface" />
      <rect x="60" y="48" width="360" height="264" rx="12" className="fill-bg" />
      <rect x="60" y="48" width="360" height="264" rx="12" {...hairline} className="stroke-line-strong" />
      <line x1="60" y1="76" x2="420" y2="76" {...hairline} className="stroke-line" />
      <g className="fill-muted">
        <circle cx="78" cy="62" r="3.5" />
        <circle cx="90" cy="62" r="3.5" />
        <circle cx="102" cy="62" r="3.5" />
        <rect x="84" y="170" width="96" height="92" rx="6" />
        <rect x="192" y="170" width="96" height="92" rx="6" />
        <rect x="300" y="170" width="96" height="92" rx="6" />
      </g>
      <g className="fill-ink">
        <rect x="84" y="98" width="200" height="11" rx="3" />
        <rect x="84" y="118" width="140" height="11" rx="3" />
        <rect x="84" y="142" width="76" height="16" rx="8" />
        <rect x="84" y="272" width="56" height="4" rx="2" />
        <rect x="192" y="272" width="44" height="4" rx="2" />
        <rect x="300" y="272" width="62" height="4" rx="2" />
      </g>
      <g className="fill-line-strong">
        <rect x="84" y="284" width="28" height="4" rx="2" />
        <rect x="192" y="284" width="28" height="4" rx="2" />
        <rect x="300" y="284" width="28" height="4" rx="2" />
      </g>
      <rect x="364" y="56" width="40" height="12" rx="6" className="fill-ink" />
    </>
  );
}

const previews: Record<VisualName, () => JSX.Element> = {
  automation: Automation,
  dashboard: Dashboard,
  pos: Pos,
  storefront: Storefront,
};

type ProjectVisualProps = {
  project: Project;
  className?: string;
  /** next/image sizes, used when the project has a real image. */
  sizes?: string;
  priority?: boolean;
};

/**
 * A project's preview. Real images use next/image; until then each project
 * shows a designed interface preview built only from palette tokens.
 */
export function ProjectVisual({ project, className, sizes = "100vw", priority }: ProjectVisualProps) {
  if (project.image) {
    return (
      <div className={cn("relative h-full w-full bg-surface", className)}>
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  const Preview = previews[project.visual];
  return (
    <svg
      viewBox="0 0 480 360"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className={cn("block h-full w-full", className)}
    >
      <Preview />
    </svg>
  );
}
