import { cn, cssVars } from "@/lib/cn";
import { palette } from "@/lib/tokens";

/**
 * Isometric building blocks for the hero: a small "platform" of solid
 * modules in the brand colours. Drawn as flat-shaded SVG polygons with a
 * true isometric projection (no gloss, no gradients, no blur). Blocks
 * drop into place on load; two small modules drift gently.
 */

type Box = {
  x: number;
  y: number;
  z: number;
  w: number;
  d: number;
  h: number;
  color: string;
  float?: number;
  /** Decorations drawn on the top face, in local top-face units. */
  top?: "rows" | "grid" | "dot" | "bars";
};

const S = 30; // pixels per grid unit
const COS = Math.cos(Math.PI / 6);

function project(x: number, y: number, z: number): [number, number] {
  return [(x - y) * COS * S, (x + y) * 0.5 * S - z * S];
}

function poly(points: [number, number, number][]) {
  return points
    .map(([x, y, z]) => project(x, y, z))
    .map(([px, py]) => `${px.toFixed(1)},${py.toFixed(1)}`)
    .join(" ");
}

/** Mixes a hex colour towards deep indigo, for the shaded faces. */
function shade(hex: string, amount: number) {
  const parse = (value: string) => [1, 3, 5].map((i) => parseInt(value.slice(i, i + 2), 16));
  const [r, g, b] = parse(hex);
  const [tr, tg, tb] = parse(palette.indigoDeep);
  const mix = (a: number, t: number) => Math.round(a + (t - a) * amount);
  return `#${[mix(r!, tr!), mix(g!, tg!), mix(b!, tb!)].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

const boxes: Box[] = [
  // The platform everything stands on.
  { x: 0, y: 0, z: 0, w: 8.4, d: 8.4, h: 0.55, color: "#D8CFFF" },
  { x: 0.7, y: 0.7, z: 0.55, w: 2.4, d: 2.4, h: 5.2, color: palette.violet, top: "grid" },
  { x: 3.9, y: 0.8, z: 0.55, w: 3.6, d: 2.3, h: 2.3, color: palette.coral, top: "bars" },
  { x: 0.8, y: 4.1, z: 0.55, w: 2.6, d: 3.5, h: 1.3, color: palette.lime, top: "rows" },
  { x: 4.3, y: 4.2, z: 0.55, w: 3.1, d: 3.3, h: 3.3, color: palette.sky, top: "rows" },
  { x: 5.1, y: 1.4, z: 3.35, w: 1.3, d: 1.3, h: 1.3, color: palette.sun, float: 0, top: "dot" },
  { x: 1.5, y: 5.2, z: 2.35, w: 1.2, d: 1.2, h: 1.2, color: palette.rose, float: 1.6 },
  // A thin "screen" slab hovering above the tower.
  { x: 0.4, y: 0.4, z: 6.75, w: 3, d: 3, h: 0.22, color: palette.indigo, float: 0.8, top: "rows" },
];

function TopDetail({ box }: { box: Box }) {
  const z = box.z + box.h + 0.001;
  const { x, y, w, d } = box;
  const ink = shade(box.color, 0.55);
  if (box.top === "rows") {
    const light = box.color === palette.indigo ? palette.lime : ink;
    return (
      <g fill={light} opacity={box.color === palette.indigo ? 1 : 0.55}>
        {[0.22, 0.45, 0.68].map((t, i) => (
          <polygon
            key={t}
            points={poly([
              [x + w * 0.18, y + d * t, z],
              [x + w * (i === 0 ? 0.82 : 0.62), y + d * t, z],
              [x + w * (i === 0 ? 0.82 : 0.62), y + d * (t + 0.1), z],
              [x + w * 0.18, y + d * (t + 0.1), z],
            ])}
          />
        ))}
      </g>
    );
  }
  if (box.top === "grid") {
    const cells: [number, number][] = [
      [0.15, 0.15],
      [0.55, 0.15],
      [0.15, 0.55],
      [0.55, 0.55],
    ];
    return (
      <g>
        {cells.map(([u, v], i) => (
          <polygon
            key={`${u}-${v}`}
            fill={i === 1 ? palette.lime : palette.white}
            opacity={i === 1 ? 1 : 0.3}
            points={poly([
              [x + w * u, y + d * v, z],
              [x + w * (u + 0.3), y + d * v, z],
              [x + w * (u + 0.3), y + d * (v + 0.3), z],
              [x + w * u, y + d * (v + 0.3), z],
            ])}
          />
        ))}
      </g>
    );
  }
  if (box.top === "bars") {
    return (
      <g fill={palette.white} opacity={0.5}>
        {[0.25, 0.5, 0.75].map((t, i) => (
          <polygon
            key={t}
            points={poly([
              [x + w * (t - 0.07), y + d * 0.2, z],
              [x + w * (t + 0.07), y + d * 0.2, z],
              [x + w * (t + 0.07), y + d * (0.45 + i * 0.12), z],
              [x + w * (t - 0.07), y + d * (0.45 + i * 0.12), z],
            ])}
          />
        ))}
      </g>
    );
  }
  if (box.top === "dot") {
    const [cx, cy] = project(x + w / 2, y + d / 2, z);
    return <ellipse cx={cx} cy={cy} rx={w * S * 0.28} ry={w * S * 0.16} fill={palette.white} opacity={0.6} />;
  }
  return null;
}

function Block({ box, index }: { box: Box; index: number }) {
  const { x, y, z, w, d, h, color } = box;
  const faces = (
    <>
      <polygon
        fill={shade(color, 0.16)}
        points={poly([
          [x, y + d, z],
          [x + w, y + d, z],
          [x + w, y + d, z + h],
          [x, y + d, z + h],
        ])}
      />
      <polygon
        fill={shade(color, 0.32)}
        points={poly([
          [x + w, y, z],
          [x + w, y + d, z],
          [x + w, y + d, z + h],
          [x + w, y, z + h],
        ])}
      />
      <polygon
        fill={color}
        points={poly([
          [x, y, z + h],
          [x + w, y, z + h],
          [x + w, y + d, z + h],
          [x, y + d, z + h],
        ])}
      />
      <TopDetail box={box} />
    </>
  );

  return (
    <g className="iso-assemble" style={cssVars({ "--i": index })}>
      {box.float !== undefined ? (
        <g className="iso-float" style={cssVars({ "--float-delay": `${box.float}s` })}>
          {faces}
        </g>
      ) : (
        faces
      )}
    </g>
  );
}

// Painter's order: the platform first, then by the centre's depth (x + y + z),
// which keeps stacked and hovering modules in front of what they sit on.
const depth = (box: Box) => box.x + box.w / 2 + box.y + box.d / 2 + box.z + box.h / 2;
const [platform, ...modules] = boxes;
const ordered = [platform!, ...modules.sort((a, b) => depth(a) - depth(b))];
const shadowPoints = poly([
  [-0.6, 0.2, 0],
  [8.8, 0.2, 0],
  [8.8, 9.6, 0],
  [-0.6, 9.6, 0],
]);

// Fit the viewBox around every projected corner.
const corners = boxes.flatMap(({ x, y, z, w, d, h }) =>
  [
    [x, y, z],
    [x + w, y, z],
    [x, y + d, z],
    [x + w, y + d, z],
    [x, y, z + h],
    [x + w, y, z + h],
    [x, y + d, z + h],
    [x + w, y + d, z + h],
  ].map(([a, b, c]) => project(a!, b!, c!)),
);
const pad = 24;
const minX = Math.min(...corners.map(([px]) => px)) - pad;
const maxX = Math.max(...corners.map(([px]) => px)) + pad;
const minY = Math.min(...corners.map(([, py]) => py)) - pad - 12;
const maxY = Math.max(...corners.map(([, py]) => py)) + pad + 10;

export function IsoBlocks({ className, label }: { className?: string; label: string }) {
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={`${minX.toFixed(0)} ${minY.toFixed(0)} ${(maxX - minX).toFixed(0)} ${(maxY - minY).toFixed(0)}`}
      className={cn("h-auto w-full overflow-visible", className)}
    >
      {/* A flat, offset ground shadow in the canvas ink, not a blur. */}
      <polygon points={shadowPoints} fill={palette.ink} opacity={0.08} transform="translate(0 14)" />
      {ordered.map((box) => (
        <Block key={`${box.x}-${box.y}-${box.z}`} box={box} index={boxes.indexOf(box)} />
      ))}
    </svg>
  );
}
