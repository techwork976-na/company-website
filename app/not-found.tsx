import type { Metadata } from "next";
import { notFoundPage } from "@/content/site";
import { cssVars } from "@/lib/cn";
import { MaskedText } from "@/components/motion/MaskedText";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: notFoundPage.metaTitle,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="container-wide grid min-h-[calc(100svh-var(--nav-h))] grid-cols-1 content-center gap-y-10 py-16 lg:grid-cols-12 lg:gap-x-8">
      <p
        aria-hidden="true"
        className="hero-anim hero-rise numeral text-[clamp(6rem,3rem+18vw,16rem)] leading-[0.8] font-medium tracking-[-0.06em] text-ink lg:col-span-7"
        style={cssVars({ "--d": "0ms" })}
      >
        404
      </p>
      <div className="lg:col-span-5 lg:self-end">
        <div className="hero-anim hero-rise" style={cssVars({ "--d": "60ms" })}>
          <SectionLabel>{notFoundPage.label}</SectionLabel>
        </div>
        <MaskedText as="h1" trigger="load" lines={[notFoundPage.title]} delay={80} className="mt-5 text-h3 text-ink" />
        <p className="hero-anim hero-rise mt-3 text-ink2" style={cssVars({ "--d": "180ms" })}>
          {notFoundPage.text}
        </p>
        <div
          className="hero-anim hero-rise mt-8 flex flex-col gap-3 sm:flex-row"
          style={cssVars({ "--d": "240ms" })}
        >
          <ButtonLink href={notFoundPage.home.href}>{notFoundPage.home.label}</ButtonLink>
          <ButtonLink href={notFoundPage.contact.href} variant="secondary">
            {notFoundPage.contact.label}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
