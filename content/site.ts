/**
 * Every piece of editable text on the NOVARY® website lives in content/.
 * This file holds the brand, navigation, home page sections, contact page
 * and footer. Services are in services.ts and projects in projects.ts.
 *
 * NOVARY® is a demo brand: the email, social links, reviews and client
 * names are placeholders. See README.md, "Before you launch".
 */

export const site = {
  name: "NOVARY",
  /** Shown after the name in the logo and footer. */
  mark: "®",
  url: "https://novary.demo",
  tagline: "Software, AI, automation, web and mobile",
  title: "NOVARY® | Digital solutions that move businesses forward",
  description:
    "NOVARY® builds custom software, AI agents, business automation, websites and mobile apps that turn complex ideas into meaningful digital experiences.",
  locale: "en_PK",
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],
  cta: { label: "Let's Talk", href: "/contact" },
  contact: {
    email: "hello@novary.demo",
    location: "Karachi, Pakistan",
    responseTime: "We reply within one business day.",
  },
  /** PLACEHOLDER: replace with your real profiles. */
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
  ],
  ui: {
    skipLink: "Skip to content",
    homeLabel: "NOVARY, home",
    mainNavLabel: "Main",
    mobileNavLabel: "Mobile",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    menuTitle: "Menu",
  },
} as const;

export const home = {
  hero: {
    eyebrow: "Your ideas. Our expertise.",
    /** Each entry is one line of the headline. */
    title: ["We Build Digital", "Solutions That Move", "Businesses Forward."],
    /** The words drawn in the accent colour. */
    highlight: "Move",
    description:
      "From intelligent automation to powerful software, websites and applications — we turn complex ideas into meaningful digital experiences.",
    primary: { label: "Start a Project", href: "/contact" },
    secondary: { label: "Explore Our Services", href: "#services" },
    support: "One partner. Every digital possibility.",
    visualLabel: "Building blocks of a digital product: software, AI, automation, web and mobile.",
  },
  clients: {
    eyebrow: "Trusted collaboration",
    title: ["Built for Businesses", "With Big Ideas."],
    description: "A growing network of businesses choosing smarter digital solutions.",
    listLabel: "Businesses we work with (demo brands)",
    brands: [
      "Nexora",
      "Vertex Labs",
      "Orbit Solutions",
      "Elevate Digital",
      "Cloudnest",
      "PixelCraft",
      "Flux Technologies",
      "Beyond Commerce",
    ],
  },
  about: {
    eyebrow: "A little about us",
    title: ["Not Just Another", "Tech Agency."],
    description:
      "We bring technology, creativity and problem-solving together to build solutions that actually make a difference. Whether it's a custom software platform, an intelligent AI agent, a business automation system or a complete digital product, we're here to make it happen.",
    support: ["Different challenges.", "One dedicated team.", "Endless possibilities."],
    cta: { label: "Get to Know Us", href: "/contact" },
  },
  services: {
    eyebrow: "Our expertise",
    title: ["Everything Digital.", "All Under One Roof."],
    description:
      "We don't believe in one-size-fits-all solutions. Every business has different needs, and we build around them.",
    cta: { label: "Explore All Services", href: "/services" },
    linkLabel: "See how we deliver",
    includesLabel: "Includes",
  },
  why: {
    eyebrow: "The difference",
    title: ["Good Ideas Deserve", "Better Execution."],
    description:
      "We focus on what matters: understanding your needs, building the right solution and making technology work for your business.",
    points: [
      { title: "Built Around You", text: "Every solution starts with your requirements, not a predefined template." },
      {
        title: "One Team, Multiple Capabilities",
        text: "Software, AI, automation, web and mobile — different expertise working together.",
      },
      {
        title: "Quality Over Shortcuts",
        text: "We care about clean execution, reliable functionality and thoughtful details.",
      },
      { title: "Clear Communication", text: "You stay informed, involved and confident throughout the process." },
      { title: "Designed to Grow", text: "We build with flexibility and your future business needs in mind." },
    ],
  },
  process: {
    eyebrow: "How we work",
    title: ["From First Conversation", "to Final Launch."],
    stepLabel: "Step",
    steps: [
      {
        number: "01",
        title: "Discover",
        text: "We listen, understand your business and identify what needs to be solved.",
      },
      { number: "02", title: "Plan", text: "We define the right approach, features, technology and project roadmap." },
      { number: "03", title: "Design", text: "We shape the experience, structure and interface around your users." },
      { number: "04", title: "Build", text: "Our team develops, integrates and brings the solution to life." },
      { number: "05", title: "Launch", text: "We test, refine and deploy your solution." },
      {
        number: "06",
        title: "Support & Grow",
        text: "We remain available for improvements, maintenance and future development.",
      },
    ],
  },
  projects: {
    eyebrow: "Selected work",
    title: ["Ideas We've Turned Into", "Digital Experiences."],
    description: "A glimpse into the kind of solutions we create.",
    projectLabel: "Project",
    featuresLabel: "Key features",
    stackLabel: "Technology",
    viewLabel: "View Project",
  },
  tech: {
    eyebrow: "Powered by the right tools",
    title: ["The Technology Behind", "Better Solutions."],
    description: "We bring together modern technologies and powerful platforms to build reliable digital products.",
    allLabel: "All technologies",
    orbitLabel: "Technology ecosystem",
    /** ring: 1 is the inner orbit, 3 the outer one. */
    categories: [
      { id: "ai", label: "AI & Machine Learning", ring: 1, tools: ["OpenAI", "Python", "TensorFlow", "LangChain"] },
      { id: "mobile", label: "Mobile", ring: 1, tools: ["Flutter", "React Native", "Kotlin", "Swift"] },
      { id: "backend", label: "Backend", ring: 2, tools: ["Node.js", "Python", "PHP", "Laravel", "Express.js"] },
      {
        id: "automation",
        label: "Automation & Integration",
        ring: 2,
        tools: ["n8n", "Make", "Zapier", "REST APIs", "Webhooks"],
      },
      { id: "design", label: "Design & Prototyping", ring: 2, tools: ["Figma", "Adobe Creative Cloud"] },
      {
        id: "frontend",
        label: "Frontend",
        ring: 3,
        tools: ["React", "Next.js", "Vue.js", "TypeScript", "HTML", "CSS", "Tailwind CSS"],
      },
      {
        id: "data",
        label: "Databases & Infrastructure",
        ring: 3,
        tools: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Firebase"],
      },
      {
        id: "cloud",
        label: "Cloud & Deployment",
        ring: 3,
        tools: ["AWS", "Google Cloud", "Azure", "Docker", "Vercel"],
      },
    ],
  },
  reviews: {
    eyebrow: "Words that matter",
    title: ["Don't Just Take", "Our Word For It."],
    description: "A few words about the experience of working with us.",
    ratingLabel: "Client rating",
    basedOn: (count: number) => `Based on ${count} client reviews`,
    disclaimer: "Demo reviews for illustration. Not verified reviews from any platform.",
    items: [
      {
        name: "Ahmed Raza",
        location: "Lahore, Pakistan",
        service: "Software Development",
        text: "Team ne hamari requirements bohat achi tarah samjhin. Final software exactly us workflow ke according bana jo humein chahiye tha.",
      },
      {
        name: "Sarah Malik",
        location: "Karachi, Pakistan",
        service: "Website Development",
        text: "Communication bohat smooth thi. Website ka design aur overall experience expectations se bhi better nikla.",
      },
      {
        name: "Usman Tariq",
        location: "Islamabad, Pakistan",
        service: "Business Automation",
        text: "Automation solution ne hamara kaafi manual work simplify kar diya. Overall experience was great.",
      },
      {
        name: "Hamza Sheikh",
        location: "Lahore, Pakistan",
        service: "Mobile App Development",
        text: "Professional team, clean execution aur timely updates. Definitely a good experience working with them.",
      },
      {
        name: "Ayesha Khan",
        location: "Karachi, Pakistan",
        service: "UI/UX & Product Design",
        text: "Honestly, mujhe process kaafi easy laga. Team ne har stage par guide kiya aur result bohat acha tha.",
      },
      {
        name: "Bilal Ahmed",
        location: "Faisalabad, Pakistan",
        service: "AI Voice Agent",
        text: "AI calling solution ka concept samajhne se lekar implementation tak team ne achi support provide ki.",
      },
    ],
  },
  finalCta: {
    eyebrow: "Your next big idea starts here",
    title: ["Have Something in Mind?", "Let's Build It."],
    description:
      "Whether you need a simple website, a powerful software platform or an intelligent automation system, we're ready to hear about it.",
    primary: { label: "Let's Discuss Your Project", href: "/contact" },
    secondary: { label: "Explore Our Services", href: "/services" },
    support: "Tell us what you're planning. We'll help you figure out the right way forward.",
  },
} as const;

export const servicesPage = {
  metaTitle: "Services",
  metaDescription:
    "Software development, AI agents, business automation, websites, mobile apps, e-commerce, UI/UX design and API integrations from NOVARY®.",
  eyebrow: "Our expertise",
  title: ["Everything Digital.", "All Under One Roof."],
  intro:
    "We don't believe in one-size-fits-all solutions. Every business has different needs, and we build around them. Choose a service to see exactly what we provide and how we deliver it.",
  indexLabel: "Services",
  countLabel: "8 services, one team",
  includesLabel: "Includes",
  openLabel: "Open",
  processTitle: "Every engagement follows the same clear path.",
  processLink: { label: "Start with a conversation", href: "/contact" },
} as const;

export const serviceDetail = {
  backLabel: "All services",
  ofLabel: "of",
  provideTitle: "What we provide",
  deliverTitle: "How we deliver",
  stackTitle: "Technologies we use",
  getTitle: "What you get",
  fitTitle: "A good fit if",
  timelineLabel: "Typical timeline",
  onThisPage: "On this page",
  ctaTitle: (service: string) => `Ready to talk about ${service.toLowerCase()}?`,
  ctaText: "Tell us what you're planning. We'll help you figure out the right way forward.",
  ctaLabel: "Discuss Your Project",
  previousLabel: "Previous",
  nextLabel: "Next",
} as const;

export const projectPage = {
  backLabel: "Selected work",
  demoNote: "This is a demo concept that shows the kind of solution we build.",
  overviewTitle: "Overview",
  challengeTitle: "The challenge",
  solutionTitle: "What we built",
  featuresTitle: "Key features",
  stackTitle: "Technology",
  categoryLabel: "Category",
  nextLabel: "Next project",
  ctaLabel: "Build something similar",
} as const;

export const contactPage = {
  metaTitle: "Contact",
  metaDescription: "Tell NOVARY® about your project. We reply within one business day.",
  eyebrow: "Let's talk",
  title: ["Tell Us What", "You're Planning."],
  intro: "Share a few details about your idea. We'll help you figure out the right way forward.",
  detailsTitle: "Get in touch",
  emailLabel: "Email",
  locationLabel: "Studio",
  responseLabel: "Response time",
  followLabel: "Follow us",
  nextTitle: "What happens next",
  nextSteps: [
    "We read your message and reply within one business day.",
    "A short call to understand your goals and requirements.",
    "A clear proposal with approach, timeline and cost.",
  ],
  form: {
    nameLabel: "Your name",
    emailLabel: "Email address",
    phoneLabel: "Phone",
    optional: "Optional",
    serviceLabel: "What do you need?",
    servicePlaceholder: "Choose a service",
    otherService: "Something else",
    messageLabel: "Tell us about your project",
    messagePlaceholder: "What are you planning, and what would success look like?",
    submit: "Send Message",
    sending: "Sending",
    successTitle: "Thank you. Your message is on its way.",
    successText: "We'll read it carefully and reply within one business day.",
    successAgain: "Send another message",
    failureTitle: "Your message could not be sent.",
    failureText: "Please try again in a moment, or email us directly.",
    notConfigured:
      "Email is not set up yet. Add RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL to .env.local (see README.md).",
    rateLimited: "You've sent a few messages already. Please wait a few minutes and try again.",
    retry: "Try again",
    errorSummary: (count: number) =>
      count === 1 ? "There is 1 problem with the form." : `There are ${count} problems with the form.`,
  },
} as const;

export const footer = {
  statement: "Technology should make things simpler. We build solutions that make it happen.",
  exploreTitle: "Explore",
  servicesTitle: "What We Do",
  /** Service slugs listed in the footer. */
  services: [
    "software-development",
    "ai-solutions",
    "business-automation",
    "website-development",
    "mobile-app-development",
  ],
  contactTitle: "Get In Touch",
  followTitle: "Follow Us",
  rights: "All rights reserved.",
  signoff: "Built with purpose. Designed for what's next.",
  backToTop: "Back to top",
} as const;

export const notFoundPage = {
  metaTitle: "Page not found",
  eyebrow: "Error 404",
  title: "This page took a different path.",
  text: "The page you're looking for doesn't exist or has moved.",
  home: { label: "Back to Home", href: "/" },
  contact: { label: "Contact Us", href: "/contact" },
} as const;
