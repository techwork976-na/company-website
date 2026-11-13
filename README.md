# NOVARY® website

Marketing website for **NOVARY®**, a demo tech agency brand that builds software, AI agents, business automation, websites and mobile apps.

Three main pages in the navigation: **Home** (`/`), **Services** (`/services`, with a detail page per service at `/services/[slug]`) and **Contact** (`/contact`). Featured projects open their own pages at `/projects/[slug]`, and there is a custom 404.

**Stack:** Next.js 16 (App Router, Cache Components, Turbopack), React 19, TypeScript (strict), Tailwind CSS 4, Framer Motion, GSAP ScrollTrigger, Lucide icons, simple-icons (technology logos), clsx + tailwind-merge, Resend (email), zod (validation).

---

## Getting started

Requires Node.js 22.12 or newer.

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

| Script              | What it does                                              |
| ------------------- | --------------------------------------------------------- |
| `npm run dev`       | Development server with hot reload                        |
| `npm run build`     | Production build                                          |
| `npm run start`     | Serves the production build                               |
| `npm run lint`      | ESLint (Next.js core web vitals and TypeScript rules)     |
| `npm run typecheck` | Generates route types and runs the TypeScript compiler    |
| `npm run check`     | Type check, lint and build in one go (use before deploys) |

### Environment variables

| Variable               | Required | Purpose                                                                    |
| ---------------------- | -------- | -------------------------------------------------------------------------- |
| `RESEND_API_KEY`       | Yes      | Resend API key used to send the contact emails                             |
| `CONTACT_TO_EMAIL`     | Yes      | Inbox that receives new enquiries                                          |
| `CONTACT_FROM_EMAIL`   | Yes      | Sender for both emails, on a domain verified in Resend                     |
| `NEXT_PUBLIC_SITE_URL` | Yes      | Public URL without trailing slash (canonical URLs, sitemap, social images) |

Without the email variables the form still validates; on submit it explains that email is not set up yet (development) or shows a generic message with the email address (production).

---

## Before you launch

NOVARY® is a demo brand. Replace these placeholders, all in `content/` unless noted:

1. **Domain:** `NEXT_PUBLIC_SITE_URL` (and `site.url` in `content/site.ts`).
2. **Email and location:** `site.contact`.
3. **Social profiles:** `site.socials` currently point to the platforms' home pages.
4. **Client brands:** `home.clients.brands` are invented names; their marks are drawn in `components/ui/BrandMark.tsx`.
5. **Reviews:** `home.reviews.items` are demo reviews, labelled as such on the page. Replace them with real ones (and only ever show genuine reviews).
6. **Projects:** `content/projects.ts` holds six demo concepts. Their pages are `noindex` and stay out of the sitemap.
7. **Mockup figures:** numbers inside the coded mockups (`components/mockups/`) are illustrative.
8. **Logo:** the N mark is in `components/ui/Logo.tsx`, `app/icon.svg`, `app/apple-icon.tsx`, `app/favicon.ico` and `public/logo.png`.

---

## Editing content

All copy lives in **`content/`**; components never hard-code text.

- `content/site.ts`: brand, navigation, every home section (`home.hero`, `home.clients`, `home.about`, `home.services`, `home.why`, `home.process`, `home.projects`, `home.tech`, `home.reviews`, `home.finalCta`), services page copy, contact page, footer and 404.
- `content/services.ts`: the eight services, including the detail-view copy (offerings, delivery steps, stack, deliverables, fit, timeline). The `slug` is used in `/services/[slug]` and `/contact?service=[slug]`.
- `content/projects.ts`: the six featured projects; `visual` picks the coded mockup and `stage` the panel colour.
- Headlines are arrays: **each entry is one line** of the heading, so the line breaks are designed.
- Technology logos come from `simple-icons` and are mapped in `lib/tech-icons.tsx`; tools without a logo there get a typographic monogram.

---

## How it is built

```
app/                     routes, metadata (sitemap, robots, icons, OG images), contact API
  services/[slug]/       service detail view
  projects/[slug]/       project page
components/
  layout/                header, mobile menu, footer, skip link, back to top
  mockups/               coded product visuals (WhatsApp inbox, voice agent, dashboard,
                         storefront, mobile app, workflow canvas)
  motion/                RevealManager, Reveal, Stagger, MaskedText,
                         PageTransition, MotionProvider
  sections/              page sections (home, contact)
  ui/                    Button, ArrowLink, Eyebrow, Logo, BrandMark
content/                 all editable text and data
lib/                     tokens, class helper, lazy GSAP hook, service/project styles,
                         tech icons, SEO, email, validation, rate limit
```

### Colour

The page canvas is always warm paper (`#F4EFE6`). Text and line colours come from CSS variables exposed as Tailwind colours (`bg-canvas`, `text-fg`, `text-fg-soft`, `border-line`, `bg-accent`, `text-on-accent`, `bg-raise`). Elements with their own surface (the mobile menu, the contact details card and the footer) set `data-tone-fixed="indigo" | "deep"`, which redefines those variables inside them. Project panels and mockups carry their own colours.

### Design tokens

Defined once in `app/globals.css` (`@theme`) and mirrored in `lib/tokens.ts` for generated images and emails.

- **Palette:** paper `#F4EFE6` (the canvas), ink `#16123F`, indigo `#1B1650`, violet `#5B3DF5`, coral `#FF6B4A`, lime `#D4F36A`, plus sun, sky, rose, emerald and periwinkle as service and project accents. Flat colour only: no gradients, glass, blur or gloss.
- **Type:** Bricolage Grotesque for display, Geist for text, Geist Mono for numbers. Fluid sizes: `text-display`, `text-h1`–`text-h3`, `text-title`, `text-lead`, `text-body`, `text-small`, `text-label`.
- **Class names:** build conditional classes with `cn()` from `lib/cn.ts`; register new text, radius or shadow tokens there too.

### Motion

Smooth and controlled, one easing everywhere (`cubic-bezier(0.22, 1, 0.36, 1)`).

- **Reveals** (`Reveal`, `Stagger`, `MaskedText`) render on the server with data attributes; a single `IntersectionObserver` in `RevealManager` reveals each once with CSS transitions. Content already on screen is never hidden.
- **Hero:** pure CSS entrance; the isometric blocks (`IsoBlocks.tsx`, flat-shaded SVG with a true isometric projection) drop into place and two modules drift gently.
- **Client dial:** a huge wheel of brand marks, only its top arc visible. GSAP ScrollTrigger pins the section when it reaches the middle of the screen and scrolling turns the dial one full rotation (1.5 viewport heights of scroll, `TURN_LENGTH` in `ClientShowcase.tsx`) before the page carries on.
- **Framer Motion:** the navbar pill and the services index indicator (`layoutId`), and the services colour panel crossfade (`AnimatePresence`). Loaded lazily by `MotionProvider`.
- **GSAP ScrollTrigger** (loaded on demand via `lib/use-lazy-gsap.ts`): the pinned client dial, the About lines drifting sideways, the process track filling and its step counter, and the project panels easing back as the next one stacks over them.
- **Technology orbit:** three CSS rings at different speeds and directions, tiles counter-rotating to stay upright; the category list filters the orbit.
- **Page transitions:** React `<ViewTransition>`; service titles morph from the index into the detail page.
- `prefers-reduced-motion` turns off every continuous animation and scroll effect, leaving short fades.

### Contact form

`components/sections/contact/ContactForm.tsx` and `app/api/contact/route.ts` share one zod schema (`lib/contact-schema.ts`). Spam protection: honeypot, minimum time-to-submit, same-origin check, body size limit and a per-IP rate limit (5 requests per 10 minutes, in memory). Input is escaped before it goes into an email. Without JavaScript the form still posts and the API replies with a simple HTML page.

---

## Deploying to Vercel

1. Import the repository in Vercel (framework preset: Next.js).
2. Add the four environment variables.
3. Deploy, add your domain and update `NEXT_PUBLIC_SITE_URL`.
4. Verify your sending domain in Resend.
