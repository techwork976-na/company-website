import type { ServiceCategoryId } from "./site";

/**
 * Projects shown on the home page, the work page and /work/[slug].
 *
 * To add a project: copy one entry, give it a unique `slug`, fill in the
 * text, and either add an `image` (put the file in /public/work/) or pick a
 * designed `visual` preview. Set `placeholder: false` for real work.
 * The first three projects appear on the home page.
 */

export type ProjectVisual = "automation" | "dashboard" | "pos" | "storefront";

export type Project = {
  slug: string;
  name: string;
  /** Short label for what it is, for example "AI automation platform". */
  kind: string;
  category: ServiceCategoryId;
  /** One line for cards on the work page. */
  summary: string;
  /** One line result for the home page list. */
  result: string;
  scope: string[];
  year: string;
  problem: string;
  built: string;
  outcome: string;
  /** Designed interface preview used when there is no image. */
  visual: ProjectVisual;
  /** Optional real image, for example { src: "/work/relay.jpg", ... }. */
  image?: { src: string; alt: string; width: number; height: number };
  /** True while this is demo content. Shows a "Sample" tag on the site. */
  placeholder: boolean;
};

export const projects: Project[] = [
  {
    slug: "relay",
    name: "Relay",
    kind: "AI automation platform",
    category: "ai",
    summary: "An AI platform that answers every enquiry, qualifies the lead and books the viewing for a property agency.",
    result: "Every enquiry answered in seconds, with follow-ups that never get forgotten.",
    scope: ["AI agents", "WhatsApp and email automation", "CRM integration", "n8n workflows"],
    year: "2026",
    problem:
      "Enquiries arrived by WhatsApp, email and web forms at all hours. Agents replied when they could, follow-ups depended on memory, and good leads went cold overnight.",
    built:
      "One inbox where an AI agent replies on every channel, asks the qualifying questions, books viewings into the team calendar and writes each conversation into the CRM. Agents step in with one tap when a lead is ready.",
    outcome:
      "Leads get a useful answer straight away, day or night. The team starts each morning with booked viewings and a clean pipeline instead of an unread inbox.",
    visual: "automation",
    placeholder: true,
  },
  {
    slug: "ledgerline",
    name: "Ledgerline",
    kind: "SaaS dashboard",
    category: "software",
    summary: "A subscription analytics dashboard that gives a finance team one live view of revenue, churn and cash.",
    result: "One live view of revenue replaced a week of spreadsheet reporting.",
    scope: ["SaaS product", "Web application", "Billing integration", "Role-based access"],
    year: "2026",
    problem:
      "Revenue numbers lived in billing exports, bank statements and three spreadsheets. Month-end reporting took a week, and nobody fully trusted the result.",
    built:
      "A multi-tenant web app that syncs with the billing provider, reconciles payments automatically and shows revenue, churn and cash on one dashboard, with drill-down to every invoice and per-role permissions.",
    outcome:
      "Finance closes the month from a single screen. Founders and investors read the same live numbers, and reporting is an export instead of a project.",
    visual: "dashboard",
    placeholder: true,
  },
  {
    slug: "tillpoint",
    name: "Tillpoint",
    kind: "Retail POS web app",
    category: "software",
    summary: "A browser-based point of sale with live stock across every branch of a growing retail chain.",
    result: "Faster checkout at the till and one stock count across every branch.",
    scope: ["POS system", "Inventory management", "Offline mode", "Sales reporting"],
    year: "2026",
    problem:
      "Each branch ran its own till software and counted stock by hand. Head office saw sales a day late and could not tell which branch held what.",
    built:
      "A point of sale that runs in any browser, keeps selling when the internet drops and syncs sales and stock to head office the moment it reconnects. Staff learn it in one shift.",
    outcome:
      "Queues move faster, stock is correct in every branch, and the owner sees the day's sales from a phone before closing time.",
    visual: "pos",
    placeholder: true,
  },
  {
    slug: "atelier-store",
    name: "Atelier Store",
    kind: "E-commerce website",
    category: "web",
    summary: "A fast e-commerce website for an independent furniture studio.",
    result: "A store that loads fast and checks out in a few steps.",
    scope: ["E-commerce website", "Payments and stock sync", "Content management"],
    year: "2026",
    problem:
      "The old store was slow on mobile and hard to update. Customers dropped off long before checkout.",
    built:
      "A new storefront with a fast product catalogue, a short checkout, stock sync and a simple editor for new collections.",
    outcome:
      "Pages load quickly on any phone, and the team publishes new products without calling a developer.",
    visual: "storefront",
    placeholder: true,
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
