/**
 * Every piece of editable text, contact detail and number on the Betteflow
 * website lives in this file. Change it here and it changes everywhere.
 *
 * Anything marked PLACEHOLDER must be replaced before launch.
 * See README.md, section "Before you launch".
 */

export type ServiceCategoryId = "software" | "ai" | "web";

/** Icon names map to Lucide icons in components/ui/service-icon.tsx. */
export type ServiceIconName =
  | "blocks"
  | "app-window"
  | "monitor-smartphone"
  | "cloud"
  | "database"
  | "layout-grid"
  | "bot"
  | "mic"
  | "message-circle"
  | "headset"
  | "target"
  | "workflow"
  | "globe"
  | "shopping-bag"
  | "layout-template"
  | "store"
  | "calendar-check"
  | "refresh-cw";

export type Service = {
  title: string;
  description: string;
  icon: ServiceIconName;
};

export type ServiceCategory = {
  id: ServiceCategoryId;
  index: string;
  title: string;
  /** Short name used in the sticky tab bar, filters and the contact dropdown. */
  shortTitle: string;
  /** Icon shown on the home page card and in the hero. */
  icon: ServiceIconName;
  /** One line on the home page card. */
  summary: string;
  /** Intro line on the services page. */
  intro: string;
  /** Four service names shown on the home page card. */
  highlights: [string, string, string, string];
  services: Service[];
};

export const site = {
  name: "Betteflow",
  /** PLACEHOLDER: your production domain. NEXT_PUBLIC_SITE_URL overrides it. */
  url: "https://betteflow.com",
  tagline: "Software, AI and web for business",
  title: "Betteflow | Software, AI automation and websites for business",
  description:
    "Betteflow is a software agency. We design and build custom software, AI automation and websites that save businesses time and help them grow.",
  locale: "en_US",

  contact: {
    /** PLACEHOLDER: the inbox shown on the site. */
    email: "hello@betteflow.com",
    /** PLACEHOLDER: WhatsApp number, digits only, including the country code. */
    whatsappNumber: "15550000000",
    /** PLACEHOLDER: the same number, formatted for people. */
    whatsappDisplay: "+1 555 000 0000",
    whatsappMessage: "Hi Betteflow, I would like to talk about a project.",
    /** PLACEHOLDER: your working hours and time zone. */
    hours: "Monday to Friday, 9:00 to 18:00 (GMT)",
    responseTime: "We reply within 24 hours on working days.",
  },

  nav: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Process", href: "/#process" },
    { label: "Contact", href: "/contact" },
  ],

  cta: { label: "Start a project", href: "/contact" },

  /** PLACEHOLDER: social profile URLs for search engines (JSON-LD). Leave empty if none. */
  sameAs: [] as string[],

  ui: {
    skipLink: "Skip to content",
    homeLabel: "Betteflow, home",
    mainNavLabel: "Main",
    mobileNavLabel: "Mobile",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    menuTitle: "Menu",
  },
} as const;

export const home = {
  hero: {
    label: "Software, AI and web for business",
    /** Each entry is one line of the headline (max 10 words in total). */
    headline: ["We build", "software that", "makes business", "flow better."],
    subtext:
      "We design and build custom software, AI automation and websites that save your team time and help your business grow.",
    primaryCta: { label: "Start a project", href: "/contact" },
    secondaryCta: { label: "View our work", href: "/work" },
    figure: { index: "Fig. 01", caption: "Software, AI and automation, working as one system" },
  },

  stats: {
    label: "Betteflow in numbers",
    /**
     * PLACEHOLDER: replace these numbers with your real figures, then set
     * `placeholder` to false to remove the "sample figures" note on the site.
     */
    placeholder: true,
    note: "Sample figures. Replace them in content/site.ts before launch.",
    items: [
      { value: 40, suffix: "+", label: "Projects delivered" },
      { value: 6, suffix: "", label: "Years of experience" },
      { value: 30, suffix: "+", label: "Happy clients" },
    ],
  },

  marquee: {
    label: "What we build",
    pauseLabel: "Pause the moving list",
    playLabel: "Play the moving list",
    items: [
      "Custom software",
      "Web applications",
      "AI agents",
      "Voice agents",
      "WhatsApp automation",
      "n8n workflows",
      "SaaS products",
      "CRM and ERP",
      "E-commerce",
      "Booking systems",
      "Business websites",
    ],
  },

  services: {
    label: "Services",
    index: "01",
    title: ["Three disciplines.", "One accountable team."],
    intro:
      "Most businesses need more than a website. We build the systems behind it, automate the busywork and connect everything into one flow.",
    link: { label: "All services", href: "/services" },
    cardLink: "Explore",
  },

  work: {
    label: "Selected work",
    index: "02",
    title: ["Built to be used,", "every working day."],
    link: { label: "See all work", href: "/work" },
    previewLabel: "Preview",
  },

  process: {
    label: "Process",
    index: "03",
    title: ["A clear path from", "idea to launch."],
    intro: "Four steps, one team, and working software in front of you every week.",
    steps: [
      {
        number: "01",
        title: "Discover",
        text: "We learn how your business runs and agree on what success looks like.",
      },
      {
        number: "02",
        title: "Design",
        text: "We map the system and design every screen before we write any code.",
      },
      {
        number: "03",
        title: "Build",
        text: "We build in short cycles and show you working software every week.",
      },
      {
        number: "04",
        title: "Launch",
        text: "We launch, train your team and stay on to support and improve it.",
      },
    ],
  },

  finalCta: {
    label: "Start a project",
    title: ["Let's build", "something", "that works."],
    text: "Tell us what you need. We reply within 24 hours on working days.",
    button: { label: "Contact us", href: "/contact" },
    emailLabel: "Or email",
  },
} as const;

export const servicesPage = {
  metaTitle: "Services",
  metaDescription:
    "Custom software, AI agents and automation, and websites. Eighteen services across three disciplines, each built around a clear business result.",
  label: "Services",
  title: ["Software, AI and web.", "Built around your business."],
  intro:
    "Eighteen services across three disciplines. Each one starts with a clear business goal and ends with software your team actually uses.",
  tabsLabel: "Service categories",
  quoteLabel: "Get a quote",
} as const;

export const serviceCategories: ServiceCategory[] = [
  {
    id: "software",
    index: "01",
    title: "Software Development",
    shortTitle: "Software",
    icon: "blocks",
    summary: "Custom systems that fit the way your business actually works.",
    intro: "Systems built around your workflow, not the other way around.",
    highlights: [
      "Custom business software",
      "Web applications",
      "Desktop and mobile apps",
      "SaaS products",
    ],
    services: [
      {
        title: "Custom Business Software",
        description: "Software designed around the way your team already works, so nothing gets lost.",
        icon: "blocks",
      },
      {
        title: "Web Applications",
        description: "Fast, secure applications your team and customers use from any browser.",
        icon: "app-window",
      },
      {
        title: "Desktop & Mobile Apps",
        description: "Reliable apps for Windows, macOS, iOS and Android, built from one plan.",
        icon: "monitor-smartphone",
      },
      {
        title: "SaaS Products",
        description: "Subscription products with accounts, billing and dashboards, ready to grow.",
        icon: "cloud",
      },
      {
        title: "Business Systems (CRM, ERP, POS)",
        description: "One connected system for customers, operations and sales.",
        icon: "database",
      },
      {
        title: "Management Systems",
        description:
          "Inventory, billing and accounting, employee and appointment management in one place.",
        icon: "layout-grid",
      },
    ],
  },
  {
    id: "ai",
    index: "02",
    title: "AI & Automation",
    shortTitle: "AI & Automation",
    icon: "bot",
    summary: "AI agents and workflows that take repetitive work off your team.",
    intro: "Let software handle the repetitive work, so your people can focus on customers.",
    highlights: [
      "AI agents and chatbots",
      "AI voice agents",
      "WhatsApp and email automation",
      "n8n workflows",
    ],
    services: [
      {
        title: "AI Agents & Chatbots",
        description: "Assistants that answer questions and complete tasks, day and night.",
        icon: "bot",
      },
      {
        title: "AI Voice Agents",
        description: "Voice agents that answer calls, qualify leads and book appointments.",
        icon: "mic",
      },
      {
        title: "WhatsApp & Email Automation",
        description: "Automatic replies, reminders and updates on the channels your customers use.",
        icon: "message-circle",
      },
      {
        title: "Customer Support Automation",
        description: "Resolve common questions instantly and route the rest to the right person.",
        icon: "headset",
      },
      {
        title: "Lead Generation & Follow-ups",
        description: "Capture every lead and follow up automatically until they reply.",
        icon: "target",
      },
      {
        title: "n8n Workflows & Appointment Booking Automation",
        description: "Connect your tools and automate bookings, confirmations and reminders.",
        icon: "workflow",
      },
    ],
  },
  {
    id: "web",
    index: "03",
    title: "Web & Digital Solutions",
    shortTitle: "Web",
    icon: "globe",
    summary: "Fast, clear websites that turn visitors into customers.",
    intro: "Websites that load fast, read clearly and turn visitors into customers.",
    highlights: [
      "Business websites",
      "E-commerce websites",
      "Landing pages",
      "Booking websites",
    ],
    services: [
      {
        title: "Business & Corporate Websites",
        description: "A credible, fast website that explains what you do in seconds.",
        icon: "globe",
      },
      {
        title: "E-commerce Websites",
        description: "Online stores with a smooth checkout, secure payments and stock sync.",
        icon: "shopping-bag",
      },
      {
        title: "Landing Pages & Portfolios",
        description: "Focused pages that move one audience towards one clear action.",
        icon: "layout-template",
      },
      {
        title: "Marketplaces & Web Portals",
        description: "Multi-vendor platforms and portals with accounts and permissions.",
        icon: "store",
      },
      {
        title: "Booking & Reservation Websites",
        description: "Live availability, booking and payment in one simple flow.",
        icon: "calendar-check",
      },
      {
        title: "Website Redesign & Maintenance",
        description: "Modernise an existing site and keep it fast, secure and up to date.",
        icon: "refresh-cw",
      },
    ],
  },
];

export const workPage = {
  metaTitle: "Work",
  metaDescription:
    "Software, AI automation and web projects by Betteflow, each built around one clear business result.",
  label: "Work",
  title: ["Selected work."],
  intro: "Software, AI and web projects, each built around one clear business result.",
  filterLabel: "Filter projects by category",
  allLabel: "All",
  emptyTitle: "No projects in this category yet.",
  emptyText: "Tell us about yours and it could be the first.",
  emptyCta: { label: "Start a project", href: "/contact" },
  sampleTag: "Sample",
  resultLabel: "Result",
  countLabel: (count: number, filter: string) =>
    `Showing ${count} ${count === 1 ? "project" : "projects"}${filter ? ` in ${filter}` : ""}`,
} as const;

export const projectPage = {
  backLabel: "All work",
  categoryLabel: "Category",
  scopeLabel: "Scope",
  yearLabel: "Year",
  problemLabel: "The problem",
  builtLabel: "What we built",
  resultLabel: "The result",
  nextLabel: "Next project",
  sampleNote:
    "This is a sample case study that shows the format. Replace it with a real project in content/projects.ts.",
} as const;

export const contactPage = {
  metaTitle: "Contact",
  metaDescription:
    "Tell us about your project. Betteflow replies within 24 hours on working days.",
  label: "Contact",
  title: ["Tell us about", "your project."],
  intro: "A few lines are enough. We will reply with questions, a rough plan and next steps.",
  detailsTitle: "Prefer to talk directly?",
  emailLabel: "Email",
  whatsappLabel: "WhatsApp",
  whatsappButton: "Message us on WhatsApp",
  hoursLabel: "Working hours",
  responseLabel: "Response time",
  form: {
    nameLabel: "Name",
    emailLabel: "Email",
    phoneLabel: "Phone",
    optional: "Optional",
    serviceLabel: "Service",
    servicePlaceholder: "Choose a service",
    messageLabel: "Message",
    messagePlaceholder: "What do you need, and what result are you after?",
    submit: "Send message",
    sending: "Sending",
    errorSummary: (count: number) =>
      `Please fix ${count} ${count === 1 ? "field" : "fields"} before sending.`,
    successTitle: "Thank you. Your message is on its way.",
    successText: "We have sent a confirmation to your inbox and will reply within 24 hours on working days.",
    successAgain: "Send another message",
    failureTitle: "Your message could not be sent.",
    failureText: "Nothing you typed has been lost. Please try again, or email us directly.",
    retry: "Try again",
    rateLimited: "You have sent several messages in a short time. Please wait a few minutes and try again.",
    notConfigured:
      "Email sending is not set up yet. Add RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL to .env.local.",
  },
} as const;

export const notFoundPage = {
  metaTitle: "Page not found",
  label: "Error 404",
  title: "This page does not exist.",
  text: "The link may be broken or the page may have moved.",
  home: { label: "Back to home", href: "/" },
  contact: { label: "Contact us", href: "/contact" },
} as const;

export const footer = {
  statement: "Software, AI and web for business.",
  navLabel: "Footer",
  emailLabel: "Email",
  whatsappLabel: "WhatsApp",
  backToTop: "Back to top",
  rights: "All rights reserved.",
} as const;
