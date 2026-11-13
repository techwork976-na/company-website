import { Bot, CodeXml, Globe, PenTool, Plug, ShoppingBag, Smartphone, Workflow, type LucideIcon } from "lucide-react";
import type { ServiceColor, ServiceIconName } from "@/content/services";

export const serviceIcons: Record<ServiceIconName, LucideIcon> = {
  code: CodeXml,
  bot: Bot,
  workflow: Workflow,
  globe: Globe,
  smartphone: Smartphone,
  "shopping-bag": ShoppingBag,
  "pen-tool": PenTool,
  plug: Plug,
};

/** Background and text classes for each service colour (text meets 4.5:1). */
export const serviceColors: Record<ServiceColor, { bg: string; fg: string; text: string; hex: string }> = {
  violet: { bg: "bg-violet", fg: "text-white", text: "text-violet", hex: "#5B3DF5" },
  coral: { bg: "bg-coral", fg: "text-ink", text: "text-coral", hex: "#FF6B4A" },
  lime: { bg: "bg-lime", fg: "text-ink", text: "text-lime", hex: "#D4F36A" },
  sky: { bg: "bg-sky", fg: "text-ink", text: "text-sky", hex: "#3DAEFF" },
  sun: { bg: "bg-sun", fg: "text-ink", text: "text-sun", hex: "#FFC23D" },
  rose: { bg: "bg-rose", fg: "text-ink", text: "text-rose", hex: "#FF7EB3" },
  emerald: { bg: "bg-emerald", fg: "text-white", text: "text-emerald", hex: "#11A37F" },
  periwinkle: { bg: "bg-periwinkle", fg: "text-ink", text: "text-periwinkle", hex: "#8B7BFF" },
};
