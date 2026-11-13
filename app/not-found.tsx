import type { Metadata } from "next";
import { notFoundPage } from "@/content/site";
import { cssVars } from "@/lib/cn";
import { MaskedText } from "@/components/motion/MaskedText";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: notFoundPage.metaTitle,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-wide grid min-h-[calc(100svh-var(--nav-h))] grid-cols-1 content-center gap-y-10 py-16 lg:grid-cols-12 lg:gap-x-10">
        <p
          aria-hidden="true"
          className="hero-anim hero-rise font-display text-[clamp(7rem,3rem+20vw,18rem)] leading-[0.8] font-extrabold tracking-[-0.06em] text-violet lg:col-span-7"
          style={cssVars({ "--d": "0ms" })}
        >
          4<span className="text-coral">0</span>4
        </p>
        <div className="lg:col-span-5 lg:self-end">
          <div className="hero-anim hero-rise" style={cssVars({ "--d": "60ms" })}>
            <Eyebrow>{notFoundPage.eyebrow}</Eyebrow>
          </div>
          <MaskedText as="h1" trigger="load" lines={[notFoundPage.title]} delay={80} className="mt-6 text-h3 text-fg" />
          <p className="hero-anim hero-rise mt-4 text-fg-soft" style={cssVars({ "--d": "180ms" })}>
            {notFoundPage.text}
          </p>
          <div className="hero-anim hero-rise mt-8 flex flex-col gap-3 sm:flex-row" style={cssVars({ "--d": "240ms" })}>
            <ButtonLink href={notFoundPage.home.href}>{notFoundPage.home.label}</ButtonLink>
            <ButtonLink href={notFoundPage.contact.href} variant="outline">
              {notFoundPage.contact.label}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
