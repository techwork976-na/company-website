/**
 * The eight NOVARY® services. The one-line summaries come from the brand
 * content document; the detail-view copy (offerings, delivery, stack,
 * deliverables) is demo content written to match it.
 *
 * Each service gets its own page at /services/[slug] and appears on the
 * home page, the services index, the contact form and the footer.
 */

export type ServiceIconName =
  | "code"
  | "bot"
  | "workflow"
  | "globe"
  | "smartphone"
  | "shopping-bag"
  | "pen-tool"
  | "plug";

/** Accent colours from the palette (see lib/tokens.ts). */
export type ServiceColor = "violet" | "coral" | "lime" | "sky" | "sun" | "rose" | "emerald" | "periwinkle";

export type Service = {
  slug: string;
  index: string;
  title: string;
  /** Short name for the footer, dropdowns and small labels. */
  shortTitle: string;
  icon: ServiceIconName;
  color: ServiceColor;
  /** One line, from the brand content. */
  summary: string;
  /** Opening paragraph of the detail view. */
  intro: string;
  /** "What we provide". */
  offerings: { title: string; text: string }[];
  /** "How we deliver". */
  delivery: { title: string; text: string }[];
  /** Technologies used most often for this service. */
  stack: string[];
  /** "What you get". */
  deliverables: string[];
  /** "A good fit if". */
  idealFor: string[];
  /** Typical timeline, shown as a fact. */
  timeline: string;
};

export const services: Service[] = [
  {
    slug: "software-development",
    index: "01",
    title: "Software Development",
    shortTitle: "Software Development",
    icon: "code",
    color: "violet",
    summary: "Custom software designed around your business operations, workflows and long-term goals.",
    intro:
      "Off-the-shelf tools make you work their way. We build software that works your way: platforms, portals and internal systems shaped around how your business actually runs today, and where it is heading next.",
    offerings: [
      {
        title: "Custom business platforms",
        text: "End-to-end systems for operations, sales, inventory or service delivery, built around your real workflow.",
      },
      {
        title: "SaaS products",
        text: "Multi-tenant products with accounts, subscriptions, roles and the admin tools to run them.",
      },
      {
        title: "Internal tools and dashboards",
        text: "Replace spreadsheets and manual reports with focused tools your team will actually use.",
      },
      {
        title: "Client and partner portals",
        text: "Secure portals where customers, vendors or partners can log in, track and self-serve.",
      },
      {
        title: "Legacy modernisation",
        text: "Rebuild slow or outdated systems step by step, without losing data or stopping the business.",
      },
      {
        title: "Cloud architecture",
        text: "Scalable, secure infrastructure with backups, monitoring and environments set up properly.",
      },
    ],
    delivery: [
      {
        title: "Map the workflow",
        text: "We sit with the people who will use the software and document how work really moves.",
      },
      {
        title: "Define the first release",
        text: "We agree on a focused first version, a clear roadmap and what success looks like.",
      },
      {
        title: "Build in short cycles",
        text: "Working software every two weeks, reviewed with you, so nothing drifts from what you need.",
      },
      {
        title: "Launch and hand over",
        text: "Data migration, team onboarding, documentation and a calm, monitored go-live.",
      },
    ],
    stack: ["Next.js", "React", "TypeScript", "Node.js", "Laravel", "Python", "PostgreSQL", "AWS"],
    deliverables: [
      "Production-ready web application",
      "Role-based access and admin panel",
      "Technical documentation and source code",
      "Deployment pipeline and hosting setup",
      "Post-launch support window",
    ],
    idealFor: [
      "Your team runs the business on spreadsheets and chat threads",
      "Off-the-shelf software no longer fits how you work",
      "You are launching a new digital product or SaaS",
      "An existing system is slow, fragile or hard to change",
    ],
    timeline: "8 to 16 weeks for a first release",
  },
  {
    slug: "ai-solutions",
    index: "02",
    title: "AI Solutions & Intelligent Agents",
    shortTitle: "AI Solutions",
    icon: "bot",
    color: "coral",
    summary:
      "AI-powered assistants, voice agents, chatbots and intelligent systems that make everyday operations smarter.",
    intro:
      "AI is only useful when it does real work. We design assistants and agents that answer customers, qualify leads, take calls and support your team, connected to your own data and tools, with people in control.",
    offerings: [
      {
        title: "AI voice calling agents",
        text: "Agents that answer and make calls, handle common questions, book appointments and hand over to a person when needed.",
      },
      {
        title: "Chatbots and assistants",
        text: "Website, WhatsApp and in-app assistants trained on your products, policies and FAQs.",
      },
      {
        title: "Knowledge assistants",
        text: "Search and answer across your documents, manuals and internal knowledge in plain language.",
      },
      {
        title: "Lead qualification agents",
        text: "Agents that respond instantly, ask the right questions and route qualified leads to sales.",
      },
      {
        title: "Document and data processing",
        text: "Extract, classify and summarise invoices, forms, emails and reports automatically.",
      },
      {
        title: "Custom AI features",
        text: "Recommendations, smart search, summaries and generation built into your existing product.",
      },
    ],
    delivery: [
      {
        title: "Find the right use case",
        text: "We identify where AI saves the most time or adds the most value, and where it should not be used.",
      },
      {
        title: "Prototype with your data",
        text: "A working prototype on real examples, so you can judge quality before investing further.",
      },
      {
        title: "Integrate and guard",
        text: "We connect the agent to your tools and add guardrails, human handover and logging.",
      },
      {
        title: "Measure and improve",
        text: "We track accuracy and outcomes, then keep tuning prompts, data and flows.",
      },
    ],
    stack: ["OpenAI", "LangChain", "Python", "TensorFlow", "Node.js", "Twilio", "PostgreSQL", "Redis"],
    deliverables: [
      "Deployed AI agent or assistant",
      "Knowledge base connected to your data",
      "Conversation logs and analytics dashboard",
      "Human handover and safety rules",
      "Ongoing tuning plan",
    ],
    idealFor: [
      "Your team answers the same questions every day",
      "Calls or messages go unanswered after hours",
      "Leads wait too long for a first reply",
      "Staff spend hours reading and sorting documents",
    ],
    timeline: "4 to 10 weeks from prototype to launch",
  },
  {
    slug: "business-automation",
    index: "03",
    title: "Business Automation",
    shortTitle: "Automation",
    icon: "workflow",
    color: "lime",
    summary: "Connect your tools, eliminate repetitive tasks and create seamless automated workflows.",
    intro:
      "Copying data between apps, chasing approvals and sending the same updates by hand quietly costs hours every week. We map those tasks and automate them, so your tools talk to each other and your team focuses on real work.",
    offerings: [
      {
        title: "Workflow automation",
        text: "Multi-step workflows that move data, trigger actions and notify the right people automatically.",
      },
      {
        title: "WhatsApp and messaging automation",
        text: "Automated replies, order updates, reminders and broadcast flows on WhatsApp Business.",
      },
      {
        title: "CRM and sales automation",
        text: "Capture leads from every channel, assign them, follow up and keep your pipeline clean.",
      },
      {
        title: "Reporting automation",
        text: "Daily and weekly reports compiled and delivered without anyone opening a spreadsheet.",
      },
      {
        title: "Approval and HR flows",
        text: "Leave requests, purchase approvals and onboarding checklists that run on their own.",
      },
      {
        title: "AI-assisted automation",
        text: "Flows that read, classify and decide using AI, for tasks rules alone cannot handle.",
      },
    ],
    delivery: [
      {
        title: "Audit the manual work",
        text: "We list repetitive tasks, measure the time they take and rank them by impact.",
      },
      {
        title: "Design the flows",
        text: "Each automation is mapped visually with triggers, conditions, owners and exceptions.",
      },
      { title: "Build and test", text: "We build on the right platform and test with real data and edge cases." },
      {
        title: "Monitor and hand over",
        text: "Alerts for failures, a simple run log and training so your team can adjust flows.",
      },
    ],
    stack: ["n8n", "Make", "Zapier", "REST APIs", "Webhooks", "Node.js", "Google Workspace", "WhatsApp API"],
    deliverables: [
      "Documented automation map",
      "Live, tested workflows",
      "Error alerts and run history",
      "Time-saved estimate per workflow",
      "Team walkthrough and handover",
    ],
    idealFor: [
      "People copy and paste between the same apps every day",
      "Follow-ups and updates depend on someone remembering",
      "Reports take hours to put together",
      "Your tools do not share data with each other",
    ],
    timeline: "2 to 6 weeks, depending on the number of flows",
  },
  {
    slug: "website-development",
    index: "04",
    title: "Website Development",
    shortTitle: "Web Development",
    icon: "globe",
    color: "sky",
    summary: "Modern, responsive and high-performance websites that turn visitors into customers.",
    intro:
      "Your website is often the first conversation with a customer. We design and build fast, clear and search-ready websites that explain what you do in seconds and make it easy to take the next step.",
    offerings: [
      {
        title: "Company and brand websites",
        text: "Clear, confident websites that present your business and earn trust quickly.",
      },
      { title: "Landing pages", text: "Focused pages for campaigns and launches, built to convert and easy to test." },
      { title: "Content-managed sites", text: "Edit pages, blogs and case studies yourself through a simple CMS." },
      { title: "Web applications", text: "Booking systems, calculators, member areas and other interactive features." },
      {
        title: "Performance and SEO",
        text: "Fast loading, technical SEO, structured data and Core Web Vitals done right.",
      },
      {
        title: "Redesigns and migrations",
        text: "Move from an old site or platform without losing rankings or content.",
      },
    ],
    delivery: [
      { title: "Clarify the message", text: "We define audience, goals and page structure before any design starts." },
      {
        title: "Design the experience",
        text: "Responsive designs for mobile and desktop, reviewed with you screen by screen.",
      },
      {
        title: "Develop and optimise",
        text: "Clean, accessible code with performance and SEO built in from the start.",
      },
      { title: "Launch and measure", text: "Analytics, search console, redirects and a launch checklist covered." },
    ],
    stack: ["Next.js", "React", "Vue.js", "Tailwind CSS", "TypeScript", "WordPress", "Vercel", "Figma"],
    deliverables: [
      "Responsive, accessible website",
      "CMS for editing content",
      "Technical SEO and analytics setup",
      "Performance-optimised hosting",
      "Training session for your team",
    ],
    idealFor: [
      "Your current site looks outdated or loads slowly",
      "Visitors arrive but do not get in touch",
      "You are launching a new brand, product or campaign",
      "You cannot update your own website easily",
    ],
    timeline: "3 to 8 weeks",
  },
  {
    slug: "mobile-app-development",
    index: "05",
    title: "Mobile App Development",
    shortTitle: "Mobile Applications",
    icon: "smartphone",
    color: "sun",
    summary: "Intuitive Android and iOS applications designed to deliver meaningful user experiences.",
    intro:
      "A good app earns a place on someone's home screen. We build Android and iOS apps that are simple to use, reliable on real networks and connected to the systems behind your business.",
    offerings: [
      {
        title: "Cross-platform apps",
        text: "One codebase for Android and iOS with Flutter or React Native, without compromising feel.",
      },
      {
        title: "Native apps",
        text: "Kotlin and Swift for apps that need deep device features or maximum performance.",
      },
      {
        title: "Business and field apps",
        text: "Apps for sales teams, deliveries, inspections and staff working on the move.",
      },
      { title: "Customer apps", text: "Ordering, booking, loyalty and account apps that keep customers coming back." },
      {
        title: "App backends and APIs",
        text: "Secure APIs, notifications, payments and admin panels to power the app.",
      },
      {
        title: "Store launch and updates",
        text: "Play Store and App Store submission, releases and ongoing updates handled.",
      },
    ],
    delivery: [
      { title: "Define the core journeys", text: "We focus the first version on the few actions users need most." },
      { title: "Prototype and test", text: "Clickable prototypes tested with real users before development starts." },
      { title: "Build and integrate", text: "Development in sprints with test builds on your phone every week." },
      {
        title: "Publish and grow",
        text: "Store listings, crash monitoring, analytics and a plan for the next release.",
      },
    ],
    stack: ["Flutter", "React Native", "Kotlin", "Swift", "Firebase", "Node.js", "PostgreSQL"],
    deliverables: [
      "Android and iOS apps",
      "Admin panel and API",
      "Push notifications and analytics",
      "Store listings and submission",
      "Release and maintenance plan",
    ],
    idealFor: [
      "Customers keep asking for an app",
      "Your team needs tools that work in the field",
      "You want to turn a process into a product",
      "Your current app has poor reviews or crashes",
    ],
    timeline: "10 to 18 weeks for a first release",
  },
  {
    slug: "ecommerce-solutions",
    index: "06",
    title: "E-commerce Solutions",
    shortTitle: "E-commerce",
    icon: "shopping-bag",
    color: "rose",
    summary: "Scalable online stores and custom shopping experiences built to support growing businesses.",
    intro:
      "Selling online is more than a product page. We build stores with smooth discovery, quick checkout, local payment options and the back-office tools to manage orders, stock and delivery without the chaos.",
    offerings: [
      { title: "Online stores", text: "Fast, mobile-first stores on Shopify, WooCommerce or a custom stack." },
      {
        title: "Custom shopping experiences",
        text: "Product builders, bundles, subscriptions and features templates cannot offer.",
      },
      {
        title: "Payments and delivery",
        text: "Local and international payment gateways, cash on delivery and courier integrations.",
      },
      {
        title: "Order and inventory management",
        text: "Sync stock, orders and fulfilment across channels and warehouses.",
      },
      {
        title: "Marketplace platforms",
        text: "Multi-vendor marketplaces with seller dashboards, commissions and payouts.",
      },
      {
        title: "Conversion optimisation",
        text: "Better search, filters, product pages and checkout to grow average order value.",
      },
    ],
    delivery: [
      {
        title: "Plan the catalogue",
        text: "Products, categories, variants and the customer journey from search to delivery.",
      },
      { title: "Design the store", text: "A store design that fits your brand and makes buying simple on a phone." },
      { title: "Build and integrate", text: "Payments, couriers, inventory and marketing tools connected and tested." },
      { title: "Launch and optimise", text: "Go live, watch the data and keep improving conversion." },
    ],
    stack: ["Shopify", "Next.js", "WooCommerce", "Laravel", "Stripe", "MySQL", "Redis"],
    deliverables: [
      "Live online store",
      "Payment and courier integrations",
      "Order and inventory dashboard",
      "Analytics and conversion tracking",
      "Store management training",
    ],
    idealFor: [
      "You sell through social media and want a real store",
      "Your current store is slow or hard to manage",
      "Orders, stock and delivery live in different places",
      "You need features your platform cannot provide",
    ],
    timeline: "4 to 12 weeks",
  },
  {
    slug: "ui-ux-design",
    index: "07",
    title: "UI/UX & Product Design",
    shortTitle: "UI/UX Design",
    icon: "pen-tool",
    color: "emerald",
    summary: "Thoughtful interfaces, interactive prototypes and user-focused digital experiences.",
    intro:
      "Good design is how a product feels to use. We research, structure and design interfaces that are clear on the first visit and pleasant on the hundredth, then hand developers everything they need to build them precisely.",
    offerings: [
      { title: "UX research", text: "Interviews, journey mapping and usability tests to understand what users need." },
      {
        title: "Information architecture",
        text: "Structure, navigation and flows that make complex products feel simple.",
      },
      {
        title: "UI design",
        text: "Modern, accessible interfaces for web and mobile with a consistent visual language.",
      },
      {
        title: "Interactive prototypes",
        text: "Clickable prototypes to test ideas and pitch to stakeholders before building.",
      },
      {
        title: "Design systems",
        text: "Reusable components, tokens and guidelines that keep products consistent as they grow.",
      },
      { title: "UX audits", text: "A clear review of an existing product, with prioritised fixes." },
    ],
    delivery: [
      { title: "Understand users", text: "We learn who uses the product, what they need and where they struggle." },
      { title: "Structure and wireframe", text: "Flows and wireframes agreed before visual design begins." },
      {
        title: "Design and prototype",
        text: "High-fidelity screens and prototypes, refined in review rounds with you.",
      },
      { title: "Hand off and support", text: "Developer-ready files, specs and support during the build." },
    ],
    stack: ["Figma", "Adobe Creative Cloud", "FigJam", "Maze", "Storybook"],
    deliverables: [
      "User flows and wireframes",
      "High-fidelity UI designs",
      "Interactive prototype",
      "Design system and components",
      "Developer handoff files",
    ],
    idealFor: [
      "You are planning a new product and want to get it right",
      "Users find your current product confusing",
      "Your product looks inconsistent across screens",
      "You need a prototype to pitch or test an idea",
    ],
    timeline: "3 to 8 weeks",
  },
  {
    slug: "api-integrations",
    index: "08",
    title: "API & System Integrations",
    shortTitle: "API Integrations",
    icon: "plug",
    color: "periwinkle",
    summary: "Connect platforms, services and business tools into one seamless ecosystem.",
    intro:
      "Most businesses run on a dozen tools that do not talk to each other. We connect them through clean, secure integrations, so data flows once, stays accurate and is available wherever your team needs it.",
    offerings: [
      { title: "Third-party integrations", text: "Connect CRMs, ERPs, accounting, payment and messaging platforms." },
      { title: "Custom API development", text: "Secure, documented REST APIs for your products, partners and apps." },
      {
        title: "Payment gateway integration",
        text: "Local and international payment providers connected safely and reliably.",
      },
      { title: "Data synchronisation", text: "Keep customers, orders and stock in sync across systems in real time." },
      {
        title: "Webhooks and event systems",
        text: "Event-driven integrations that react the moment something changes.",
      },
      {
        title: "Integration maintenance",
        text: "Monitoring, version upgrades and fixes when third-party APIs change.",
      },
    ],
    delivery: [
      {
        title: "Map the systems",
        text: "We document every system, the data it holds and how information should flow.",
      },
      { title: "Design the contracts", text: "Endpoints, data formats, security and error handling agreed up front." },
      { title: "Build and test", text: "Integrations built with retries, logging and tests against real scenarios." },
      {
        title: "Monitor and maintain",
        text: "Health checks and alerts, so issues are caught before they affect the business.",
      },
    ],
    stack: ["REST APIs", "Webhooks", "Node.js", "Express.js", "Python", "Docker", "Redis", "Google Cloud"],
    deliverables: [
      "Live, monitored integrations",
      "API documentation",
      "Error handling and retry logic",
      "Integration health dashboard",
      "Maintenance and support plan",
    ],
    idealFor: [
      "Staff enter the same data in more than one system",
      "Your tools show different numbers for the same thing",
      "Partners need secure access to your data",
      "You are adding a payment, courier or messaging provider",
    ],
    timeline: "2 to 8 weeks",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getAdjacentServices(slug: string) {
  const index = services.findIndex((service) => service.slug === slug);
  return {
    previous: services[(index - 1 + services.length) % services.length]!,
    next: services[(index + 1) % services.length]!,
  };
}

export const serviceSlugs = services.map((service) => service.slug);
