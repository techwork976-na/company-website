# Betteflow website

Marketing website for Betteflow, a software agency that builds software, AI automation and websites for businesses.

Four pages: Home (`/`), Services (`/services`), Work (`/work` and `/work/[slug]`) and Contact (`/contact`), plus a custom 404.

**Stack:** Next.js 16 (App Router, Cache Components, Turbopack), React 19, TypeScript (strict), Tailwind CSS 4, Framer Motion (sliding pills and grid reflow), GSAP ScrollTrigger (process track), Lucide icons, clsx + tailwind-merge (class names), Resend (email), zod (validation).

---

## Getting started

Requires Node.js 22.12 or newer.

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

### Scripts

| Script              | What it does                                              |
| ------------------- | --------------------------------------------------------- |
| `npm run dev`       | Development server with hot reload                        |
| `npm run build`     | Production build                                          |
| `npm run start`     | Serves the production build                               |
| `npm run lint`      | ESLint (Next.js core web vitals and TypeScript rules)     |
| `npm run typecheck` | Generates route types and runs the TypeScript compiler    |
| `npm run check`     | Type check, lint and build in one go (use before deploys) |

### Environment variables

| Variable               | Required | Purpose                                                                                     |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`       | Yes      | Resend API key used to send the contact emails                                              |
| `CONTACT_TO_EMAIL`     | Yes      | Inbox that receives new enquiries                                                           |
| `CONTACT_FROM_EMAIL`   | Yes      | Sender for both emails, on a domain verified in Resend, e.g. `Betteflow <hello@betteflow.com>` |
| `NEXT_PUBLIC_SITE_URL` | Yes      | Public URL without trailing slash, used for canonical URLs, sitemap, robots and social images |

Without the three email variables the site still works: the form validates as normal, and on submit it shows a clear "email is not set up yet" message in development (a generic message with your email address in production). Nothing crashes.

---

## Before you launch

Everything below is placeholder content. All of it lives in `content/site.ts` and `content/projects.ts` unless noted.

1. **Domain:** set `NEXT_PUBLIC_SITE_URL` (and `site.url` in `content/site.ts` as a fallback).
2. **Email address:** `site.contact.email`.
3. **WhatsApp number:** `site.contact.whatsappNumber` (digits only, with country code) and `site.contact.whatsappDisplay`.
4. **Working hours:** `site.contact.hours`.
5. **Stats:** `home.stats.items`. Replace the numbers with real ones, then set `home.stats.placeholder` to `false` to remove the "Sample figures" note.
6. **Projects:** replace the three sample projects in `content/projects.ts` and set `placeholder: false` on each real one. Sample projects show a "Sample" tag, carry a note on their page and are kept out of search engines (`noindex`, not in the sitemap) until you do.
7. **Logo:** the mark is drawn in code. Replace `BMark` and `Logo` in `components/ui/Logo.tsx`, plus `app/icon.svg`, `app/favicon.ico`, `app/apple-icon.tsx` and `public/logo.png`.
8. **Open Graph image:** generated from the hero headline by `lib/og.tsx` (using the Geist font files in `assets/fonts/`). Edit it there, or replace `app/opengraph-image.tsx` and `app/twitter-image.tsx` with static `opengraph-image.png` / `twitter-image.png` files (1200 x 630).
9. **Social profiles (optional):** add URLs to `site.sameAs` for search engines.

---

## Editing content

All copy, labels, contact details and numbers are in **`content/site.ts`**. Components never hard-code text, so you can change wording without touching layout code.

- Home sections: `home.hero`, `home.stats`, `home.marquee`, `home.services`, `home.work`, `home.process`, `home.finalCta`
- Services and their cards: `serviceCategories` (each category has an `id` used in `/services#id` and `/contact?service=id`)
- Page copy: `servicesPage`, `workPage`, `projectPage`, `contactPage`, `notFoundPage`, `footer`
- Headlines are arrays: **each entry is one line** of the masked line reveal, so you control the line breaks.

Service icons are Lucide icons, referenced by name in `content/site.ts` and mapped in `components/ui/ServiceIcon.tsx`.

## Adding a project

1. Open `content/projects.ts` and copy an existing entry.
2. Give it a unique `slug` (used in the URL `/work/your-slug`), a `name`, a `category` (`software`, `ai` or `web`) and the text fields (`summary`, `result`, `scope`, `year`, `problem`, `built`, `outcome`).
3. Add an image: put it in `public/work/` and set `image: { src: "/work/your-image.jpg", alt: "...", width: 1600, height: 1200 }`. Without an image, pick a designed artwork with `visual: "ledger" | "signal" | "storefront"`.
4. Set `placeholder: false`.

The project gets its own page, Open Graph image, sitemap entry and a place in the Work grid and filters automatically. The first three projects appear on the home page.

---

## How it is built

```
app/                    routes, metadata files (sitemap, robots, icons, OG images), API route
  api/contact/route.ts  contact form endpoint (validation, spam protection, Resend)
components/
  layout/               header, mobile menu, footer, skip link, back to top
  motion/               Reveal, Stagger, MaskedText, CountUp, Marquee, PageTransition,
                        RevealManager, MotionProvider (Framer Motion settings)
  sections/             page sections (home, services, work, contact)
  ui/                   buttons, links, labels, tags, logo, icons, project artwork
content/                all editable text, numbers and project data
lib/                    tokens, class-name helper, easing, scroll helpers, SEO, email, validation, rate limit
assets/fonts/           font files used only to draw Open Graph images (SIL Open Font License)
```

### Design tokens

Colours, type scale, radii, shadows and easing are defined once in `app/globals.css` (`@theme`) and used as Tailwind classes (`bg-surface`, `text-ink`, `text-h2`, `rounded-card`, `shadow-card`, `ease-brand`...). `lib/tokens.ts` mirrors the palette and motion timings for generated images and JavaScript.

- **Palette:** white `bg`, ivory `surface`, warm beige `muted`, Jet Black `ink`, charcoal `ink2`, Champagne Gold `accent`. Lines and quiet text are derived from these at low opacity. Gold is kept for the main button, the dot in section labels and the process track.
- **Type:** Geist for everything, Geist Mono (`numeral` class) for index numbers and technical details. Sizes are fluid: `text-display`, `text-h1` to `text-h3`, `text-title`, `text-lead`, `text-body`, `text-label`.
- **Shape and depth:** `rounded-ui` (10px) for fields, `rounded-card` (16px), `rounded-panel` (24px), pill buttons. Elevation is one soft neutral shadow (`shadow-card`) that appears on hover.
- **Class names:** always build conditional classes with `cn()` from `lib/cn.ts`. It uses clsx and tailwind-merge, so a later class cleanly overrides an earlier one. If you add a new text size, radius or shadow token, add its name to the list in `lib/cn.ts` too.

### Motion

Motion is quick and quiet: **nothing runs longer than 0.4s**, with one easing everywhere (`cubic-bezier(0.22, 1, 0.36, 1)`). Timings are CSS variables in `:root` (`--dur-fast` 150ms for hover and press, `--dur-base` 220ms for UI state, `--dur-slow` 320ms, `--dur-reveal` 400ms) and mirrored in `lib/tokens.ts`. Scrolling is native.

- **Reveals** (`Reveal`, `Stagger`, `MaskedText`) render plain HTML with data attributes on the server. A single `IntersectionObserver` in `RevealManager` marks each element once, and CSS transitions do the motion. Content already on screen at load is never hidden, so first paint and LCP never wait for JavaScript; without JavaScript nothing is hidden at all.
- **Hero and page headers** are pure CSS animations; the whole entrance finishes in under a second.
- **Framer Motion** is used only where it is the best tool: the pill that slides between navbar links, service tabs and work filters (`layoutId`), and the work grid gliding into place when filtered (`layout` + `AnimatePresence`). `MotionProvider` loads its code lazily after the page is interactive and sets the shared defaults.
- **GSAP ScrollTrigger** drives one thing: the gold line that fills along the process track as you scroll. It is downloaded only when that section approaches the viewport.
- **Page transitions** use React's `<ViewTransition>` with the browser View Transitions API: a short fade and 8px rise, the navbar anchored, and the project image morphing from the Work grid into the project page. Browsers without support swap pages instantly.
- `prefers-reduced-motion` turns off the marquee, the process scrubbing, hero parallax, count-ups and all movement, leaving 160ms opacity fades.

### Contact form

`components/sections/contact/ContactForm.tsx` and `app/api/contact/route.ts` share one zod schema (`lib/contact-schema.ts`). Spam protection: a hidden honeypot field and a minimum time-to-submit (both answer bots with a fake success), a same-origin check, a body size limit and a per-IP rate limit (5 requests per 10 minutes). All input is escaped before it goes into an email and header values are stripped of line breaks. The agency gets the enquiry (reply-to set to the visitor), and the visitor gets a confirmation; if only the confirmation fails, the enquiry still counts as sent. Without JavaScript the form still posts and the API replies with a simple HTML page.

The rate limit is kept in memory, which protects one server instance. On a serverless platform each instance keeps its own count; for a strict global limit, swap `lib/rate-limit.ts` for a shared store such as Upstash Redis.

---

## Deploying to Vercel

1. Push this folder to a Git repository (GitHub, GitLab or Bitbucket).
2. In Vercel, choose **Add New > Project** and import the repository. The framework preset is detected as Next.js; keep the default build settings.
3. Add the four environment variables for Production (and Preview if you want the form to work there).
4. Deploy, then add your domain under **Settings > Domains** and update `NEXT_PUBLIC_SITE_URL` to match.
5. In Resend, verify your sending domain (DNS records) so `CONTACT_FROM_EMAIL` can send.

After deploying, submit `https://your-domain/sitemap.xml` in Google Search Console.
