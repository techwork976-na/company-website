import {
  AppWindow,
  Blocks,
  Bot,
  CalendarCheck,
  Cloud,
  Database,
  Globe,
  Headset,
  LayoutGrid,
  LayoutTemplate,
  MessageCircle,
  Mic,
  MonitorSmartphone,
  RefreshCw,
  ShoppingBag,
  Store,
  Target,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIconName } from "@/content/site";

const icons: Record<ServiceIconName, LucideIcon> = {
  blocks: Blocks,
  "app-window": AppWindow,
  "monitor-smartphone": MonitorSmartphone,
  cloud: Cloud,
  database: Database,
  "layout-grid": LayoutGrid,
  bot: Bot,
  mic: Mic,
  "message-circle": MessageCircle,
  headset: Headset,
  target: Target,
  workflow: Workflow,
  globe: Globe,
  "shopping-bag": ShoppingBag,
  "layout-template": LayoutTemplate,
  store: Store,
  "calendar-check": CalendarCheck,
  "refresh-cw": RefreshCw,
};

export function ServiceIcon({ name, className }: { name: ServiceIconName; className?: string }) {
  const Icon = icons[name];
  return <Icon aria-hidden="true" strokeWidth={1.5} className={className} />;
}
