/**
 * Featured projects. Titles, one-line summaries and categories come from
 * the brand content document; the longer copy is demo content.
 *
 * Every project is a demo concept, so its page carries a note and is kept
 * out of search engines (see app/projects/[slug]/page.tsx).
 * The visual is drawn in code: components/mockups/.
 */

export type ProjectVisual = "whatsapp" | "voice" | "dashboard" | "ecommerce" | "mobile" | "workflow";

/** The colour of the panel behind the mockup. */
export type ProjectStage = "emerald" | "coral" | "violet" | "rose" | "sun" | "lime";

export type Project = {
  slug: string;
  index: string;
  title: string;
  category: string;
  summary: string;
  overview: string;
  challenge: string;
  solution: string;
  features: string[];
  stack: string[];
  visual: ProjectVisual;
  stage: ProjectStage;
  /** The service this project belongs to, for the contact link. */
  service: string;
};

export const projects: Project[] = [
  {
    slug: "whatsapp-business-automation",
    index: "01",
    title: "WhatsApp Business Automation",
    category: "Automation / Business Communication",
    summary:
      "A smart messaging platform designed to organize conversations, automate replies and simplify customer communication.",
    overview:
      "A shared WhatsApp inbox for a growing retail team. Every conversation is labelled, routed and answered quickly, with order updates and common questions handled automatically.",
    challenge:
      "Hundreds of daily messages arrived on one phone. Questions about prices, delivery and order status went unanswered for hours, and nobody knew who had replied to whom.",
    solution:
      "We built a team inbox on the WhatsApp Business API with automatic replies, quick-reply templates, smart labels and order lookups connected to the store's system.",
    features: [
      "Shared team inbox with assignments",
      "Automated replies and quick templates",
      "Order status lookups from the store",
      "Labels, broadcasts and reply-time analytics",
    ],
    stack: ["WhatsApp API", "Node.js", "React", "PostgreSQL", "Redis"],
    visual: "whatsapp",
    stage: "emerald",
    service: "business-automation",
  },
  {
    slug: "ai-voice-calling-agent",
    index: "02",
    title: "AI Voice Calling Agent",
    category: "Artificial Intelligence / Voice Automation",
    summary:
      "An intelligent voice-based system built to handle incoming calls, answer questions and support customer interactions.",
    overview:
      "A voice agent that answers calls in natural language, understands what the caller needs, answers common questions, books appointments and passes complex calls to a person.",
    challenge:
      "A busy clinic missed calls at peak times and after hours, and front-desk staff spent most of the day answering the same questions.",
    solution:
      "We designed a voice agent with speech recognition, a knowledge base built from the clinic's information, calendar booking and a smooth handover to staff, with every call summarised.",
    features: [
      "Natural voice conversations, around the clock",
      "Appointment booking into the calendar",
      "Live transcript and call summary",
      "Smart handover to a human agent",
    ],
    stack: ["OpenAI", "Python", "LangChain", "Twilio", "PostgreSQL"],
    visual: "voice",
    stage: "coral",
    service: "ai-solutions",
  },
  {
    slug: "business-management-dashboard",
    index: "03",
    title: "Business Management Dashboard",
    category: "Custom Software / SaaS",
    summary:
      "A centralized software platform for managing operations, tracking activities and accessing business insights.",
    overview:
      "One platform for sales, inventory, teams and finances, with live dashboards that show managers what is happening across every branch at a glance.",
    challenge:
      "Data lived in spreadsheets, accounting software and chat groups. Monthly reports took days to put together and were out of date when they arrived.",
    solution:
      "We built a central platform with role-based access, live KPIs, branch-level reports and automated daily summaries, connected to the tools the team already used.",
    features: [
      "Live KPIs and revenue tracking",
      "Branch, team and product reports",
      "Role-based access for every department",
      "Automated daily summaries by email",
    ],
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
    visual: "dashboard",
    stage: "violet",
    service: "software-development",
  },
  {
    slug: "ecommerce-experience",
    index: "04",
    title: "E-commerce Experience",
    category: "Web Development / E-commerce",
    summary: "A modern online shopping platform with streamlined product discovery and a smooth checkout experience.",
    overview:
      "A mobile-first store for a lifestyle brand with fast search, clear product pages, saved carts and a checkout that takes under a minute.",
    challenge:
      "The brand sold mostly through social media. Orders were taken by hand, stock was tracked on paper and customers dropped off before paying.",
    solution:
      "We designed and built a store with curated collections, instant search, local payment options and cash on delivery, connected to inventory and couriers.",
    features: [
      "Instant search and smart filters",
      "One-page checkout with local payments",
      "Inventory and courier integration",
      "Abandoned-cart reminders",
    ],
    stack: ["Next.js", "Shopify", "Tailwind CSS", "Stripe", "Vercel"],
    visual: "ecommerce",
    stage: "rose",
    service: "ecommerce-solutions",
  },
  {
    slug: "mobile-business-application",
    index: "05",
    title: "Mobile Business Application",
    category: "Mobile App Development",
    summary: "A mobile-first application designed to make essential business features accessible on the go.",
    overview:
      "An Android and iOS app that puts sales, tasks, approvals and team updates in the pocket of every manager and field employee.",
    challenge:
      "Field staff had to call the office for stock levels, approvals and customer details, slowing down every visit.",
    solution:
      "We built a cross-platform app with offline support, instant approvals, live sales figures and push notifications, connected to the company's existing system.",
    features: [
      "Live sales and targets on the go",
      "One-tap approvals and tasks",
      "Works offline, syncs when back online",
      "Push notifications for what matters",
    ],
    stack: ["Flutter", "Firebase", "Node.js", "PostgreSQL"],
    visual: "mobile",
    stage: "sun",
    service: "mobile-app-development",
  },
  {
    slug: "intelligent-workflow-automation",
    index: "06",
    title: "Intelligent Workflow Automation",
    category: "AI / Workflow Automation",
    summary: "A connected workflow system that automates repetitive processes and keeps business tools in sync.",
    overview:
      "A set of connected workflows that capture leads, classify them with AI, update the CRM, notify the team and send follow-ups, without anyone copying data by hand.",
    challenge:
      "Leads came from forms, WhatsApp and email. Each one was copied into the CRM by hand, and follow-ups depended on someone remembering.",
    solution:
      "We mapped the process and automated it end to end with n8n and AI classification, with alerts for exceptions and a simple run log for the team.",
    features: [
      "Leads captured from every channel",
      "AI classification and routing",
      "CRM, sheets and chat kept in sync",
      "Alerts and a clear run history",
    ],
    stack: ["n8n", "OpenAI", "Webhooks", "REST APIs", "Google Cloud"],
    visual: "workflow",
    stage: "lime",
    service: "business-automation",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length]!;
}
