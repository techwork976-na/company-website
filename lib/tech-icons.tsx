import { Braces, Webhook } from "lucide-react";
import type { ReactNode } from "react";
import {
  siCss,
  siDocker,
  siExpress,
  siFigma,
  siFirebase,
  siFlutter,
  siGoogle,
  siGooglecloud,
  siHtml5,
  siKotlin,
  siLangchain,
  siLaravel,
  siMake,
  siMongodb,
  siMysql,
  siN8n,
  siNextdotjs,
  siNodedotjs,
  siPhp,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siShopify,
  siStorybook,
  siStripe,
  siSwift,
  siTailwindcss,
  siTensorflow,
  siTypescript,
  siVercel,
  siVuedotjs,
  siWhatsapp,
  siWoocommerce,
  siWordpress,
  siZapier,
  type SimpleIcon,
} from "simple-icons";

const INK = "#16123F";

const icons: Record<string, SimpleIcon> = {
  React: siReact,
  "React Native": siReact,
  "Next.js": siNextdotjs,
  "Vue.js": siVuedotjs,
  TypeScript: siTypescript,
  HTML: siHtml5,
  CSS: siCss,
  "Tailwind CSS": siTailwindcss,
  "Node.js": siNodedotjs,
  Python: siPython,
  PHP: siPhp,
  Laravel: siLaravel,
  "Express.js": siExpress,
  Flutter: siFlutter,
  Kotlin: siKotlin,
  Swift: siSwift,
  TensorFlow: siTensorflow,
  LangChain: siLangchain,
  n8n: siN8n,
  Make: siMake,
  Zapier: siZapier,
  PostgreSQL: siPostgresql,
  MySQL: siMysql,
  MongoDB: siMongodb,
  Redis: siRedis,
  Firebase: siFirebase,
  "Google Cloud": siGooglecloud,
  Docker: siDocker,
  Vercel: siVercel,
  Figma: siFigma,
  FigJam: siFigma,
  Shopify: siShopify,
  Stripe: siStripe,
  WordPress: siWordpress,
  WooCommerce: siWoocommerce,
  Storybook: siStorybook,
  "WhatsApp API": siWhatsapp,
  "Google Workspace": siGoogle,
};

/** Typographic marks for tools whose logos are not in simple-icons. */
const monograms: Record<string, { text: string; color: string }> = {
  OpenAI: { text: "AI", color: "#10A37F" },
  AWS: { text: "aws", color: "#FF9900" },
  Azure: { text: "Az", color: "#0078D4" },
  "Adobe Creative Cloud": { text: "Cc", color: "#DA1F26" },
  Twilio: { text: "Tw", color: "#F22F46" },
  Maze: { text: "Mz", color: "#16123F" },
};

const glyphs: Record<string, { node: ReactNode; color: string }> = {
  "REST APIs": { node: <Braces strokeWidth={2.25} className="size-[55%]" />, color: "#5B3DF5" },
  Webhooks: { node: <Webhook strokeWidth={2.25} className="size-[55%]" />, color: "#FF6B4A" },
};

/** The brand colour of a tool, darkened to ink when it is black. */
export function techColor(name: string) {
  const icon = icons[name];
  if (icon) return icon.hex === "000000" || icon.hex === "0A0A0A" ? INK : `#${icon.hex}`;
  return monograms[name]?.color ?? glyphs[name]?.color ?? INK;
}

/** Logo for a technology: the simple-icons path, a lucide glyph, or a monogram. */
export function TechIcon({ name }: { name: string }) {
  const icon = icons[name];
  const color = techColor(name);
  if (icon) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="size-[52%]" fill={color}>
        <path d={icon.path} />
      </svg>
    );
  }
  const glyph = glyphs[name];
  if (glyph)
    return (
      <span style={{ color }} className="flex size-full items-center justify-center">
        {glyph.node}
      </span>
    );
  const monogram = monograms[name];
  return (
    <span
      aria-hidden="true"
      className="font-display text-[0.8125em] leading-none font-extrabold tracking-[-0.04em]"
      style={{ color }}
    >
      {monogram?.text ?? name.slice(0, 2)}
    </span>
  );
}
