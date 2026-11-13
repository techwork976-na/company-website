import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";
import { home, servicesPage } from "@/content/site";
import { services } from "@/content/services";
import { cn, cssVars } from "@/lib/cn";
import { pageMetadata } from "@/lib/seo";
import { serviceColors, serviceIcons } from "@/lib/service-style";
import { MaskedText } from "@/components/motion/MaskedText";
import { PageTransition } from "@/components/motion/PageTransition";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = pageMetadata({
  title: servicesPage.metaTitle,
  description: servicesPage.metaDescription,
  path: "/services",
});

/** Text on the hover band must read on that service's colour. */
const hoverText: Record<string, string> = {
  "text-white": "group-hover:text-white group-focus-visible:text-white",
  "text-ink": "group-hover:text-ink group-focus-visible:text-ink",
};

/**
 * Services index: clean, text-first and scannable. Each service is one
 * row (number, name, summary, what it includes); hovering slides the
 * service's colour band up behind it. Each row opens the service's own
 * detail page, and the title morphs into its heading.
 */
export default function ServicesPage() {
  const steps = home.process.steps;
  return (
    <PageTransition>
      <div>
        <section aria-labelledby="services-title" className="pt-12 pb-16 md:pt-20 lg:pb-24">
          <div className="container-wide grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-8">
              <div className="hero-anim hero-rise" style={cssVars({ "--d": "0ms" })}>
                <Eyebrow>{servicesPage.eyebrow}</Eyebrow>
              </div>
              <MaskedText
                as="h1"
                id="services-title"
                trigger="load"
                lines={servicesPage.title}
                delay={40}
                className="mt-7 text-h1 text-fg"
              />
            </div>
            <div className="hero-anim hero-rise lg:col-span-4" style={cssVars({ "--d": "260ms" })}>
              <p className="text-lead text-fg-soft">{servicesPage.intro}</p>
            </div>
          </div>
        </section>

        <section aria-label={servicesPage.indexLabel} className="pb-[var(--section-y)]">
          <div className="container-wide">
            <p className="eyebrow flex items-center justify-between border-b-2 border-fg pb-4 text-fg">
              <span>{servicesPage.indexLabel}</span>
              <span className="text-fg-soft">{servicesPage.countLabel}</span>
            </p>
            <Stagger as="ol" stagger={50}>
              {services.map((service, index) => {
                const colors = serviceColors[service.color];
                const Icon = serviceIcons[service.icon];
                return (
                  <StaggerItem as="li" key={service.slug} index={index} className="border-b border-line">
                    <Link
                      href={`/services/${service.slug}`}
                      prefetch
                      className="service-row group relative block overflow-hidden focus-visible:outline-offset-[-2px]"
                    >
                      <span aria-hidden="true" className={cn("service-row__band absolute inset-0", colors.bg)} />
                      <span
                        className={cn(
                          "service-row__shift relative grid grid-cols-[2.25rem_1fr_auto] gap-x-4 gap-y-4 py-7 transition-colors duration-[var(--dur-base)] md:grid-cols-[4rem_1fr_auto] md:py-9 lg:grid-cols-[4rem_minmax(0,1.25fr)_minmax(0,1fr)_auto] lg:items-center lg:gap-x-10 lg:px-4",
                          hoverText[colors.fg],
                        )}
                      >
                        <span className="numeral pt-2 text-small font-semibold lg:pt-0">{service.index}</span>
                        <span>
                          <ViewTransition name={`service-title-${service.slug}`} share="morph" default="none">
                            <span className="block w-fit font-display text-[clamp(1.75rem,1.2rem+2.2vw,3.25rem)] leading-[1] font-bold tracking-[-0.04em]">
                              {service.title}
                            </span>
                          </ViewTransition>
                          <span className="mt-3 block max-w-[34rem] text-body opacity-80">{service.summary}</span>
                        </span>
                        <span className="col-start-2 hidden lg:col-start-3 lg:block">
                          <span className="eyebrow block opacity-70">{servicesPage.includesLabel}</span>
                          <span className="mt-2 block text-small leading-relaxed font-medium">
                            {service.offerings
                              .slice(0, 3)
                              .map((offering) => offering.title)
                              .join(" · ")}
                          </span>
                        </span>
                        <span
                          aria-hidden="true"
                          className="col-start-3 row-start-1 flex size-12 items-center justify-center rounded-full border border-current/25 transition-transform duration-[var(--dur-slow)] ease-brand group-hover:rotate-45 lg:col-start-4 lg:size-14"
                        >
                          <Icon strokeWidth={1.75} className="size-5 group-hover:hidden" />
                          <ArrowUpRight strokeWidth={2} className="hidden size-5 -rotate-45 group-hover:block" />
                        </span>
                      </span>
                    </Link>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>

        <section aria-labelledby="engagement-title" className="section-y">
          <div className="container-wide">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <Eyebrow>{home.process.eyebrow}</Eyebrow>
                <MaskedText
                  id="engagement-title"
                  lines={[servicesPage.processTitle]}
                  className="mt-6 text-h2 text-fg"
                />
              </div>
              <Reveal className="lg:col-span-4 lg:col-start-9 lg:justify-self-end">
                <ArrowLink href={servicesPage.processLink.href} className="text-accent">
                  {servicesPage.processLink.label}
                </ArrowLink>
              </Reveal>
            </div>
            <Stagger
              as="ol"
              className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-card bg-line sm:grid-cols-2 lg:grid-cols-3"
            >
              {steps.map((step, index) => (
                <StaggerItem as="li" key={step.number} index={index} className="bg-canvas p-6 md:p-8">
                  <span className="numeral text-small font-semibold text-accent">{step.number}</span>
                  <h3 className="mt-3 font-display text-title font-bold text-fg">{step.title}</h3>
                  <p className="mt-2 text-fg-soft">{step.text}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
