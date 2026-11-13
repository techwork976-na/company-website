"use client";

import { AnimatePresence } from "framer-motion";
import * as m from "framer-motion/m";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { home } from "@/content/site";
import { services } from "@/content/services";
import { cn } from "@/lib/cn";
import { serviceColors, serviceIcons } from "@/lib/service-style";
import { MaskedText } from "@/components/motion/MaskedText";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * Services overview as an interactive index rather than a grid of cards.
 * Hovering or focusing a service lights it up (a bar glides between rows
 * with Framer Motion layoutId) and the colour panel beside the list swaps
 * to that service. On small screens each row simply shows its summary.
 */
export function ServicesOverview() {
  const content = home.services;
  const [active, setActive] = useState(0);
  const service = services[active]!;
  const colors = serviceColors[service.color];
  const Icon = serviceIcons[service.icon];

  return (
    <section id="services" data-tone="indigo" aria-labelledby="services-title" className="section-y relative">
      <div className="container-wide">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <MaskedText id="services-title" lines={content.title} className="mt-6 text-h2 text-fg" />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={120}>
            <p className="text-lead text-fg-soft">{content.description}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:mt-20 lg:grid-cols-12">
          <Stagger as="ol" stagger={50} className="border-t border-line lg:col-span-7">
            {services.map((item, index) => {
              const lit = index === active;
              const itemColors = serviceColors[item.color];
              return (
                <StaggerItem as="li" key={item.slug} index={index} className="relative border-b border-line">
                  {lit ? (
                    <m.span
                      layoutId="service-indicator"
                      aria-hidden="true"
                      className="absolute top-0 -bottom-px left-0 hidden w-1 bg-accent lg:block"
                    />
                  ) : null}
                  <Link
                    href={`/services/${item.slug}`}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    className="group grid grid-cols-[2.5rem_1fr_auto] items-start gap-x-3 py-6 md:grid-cols-[3.5rem_1fr_auto] md:py-7 lg:items-center lg:pl-7"
                  >
                    <span
                      className={cn(
                        "numeral pt-1.5 text-small transition-colors duration-[var(--dur-base)] lg:pt-0",
                        lit ? "lg:text-accent" : "text-fg-soft",
                      )}
                    >
                      {item.index}
                    </span>
                    <span>
                      <span
                        className={cn(
                          "block font-display text-[clamp(1.5rem,1.1rem+1.6vw,2.5rem)] leading-[1.05] font-bold tracking-[-0.035em] transition-colors duration-[var(--dur-base)] ease-brand",
                          lit ? "lg:text-accent" : "lg:text-fg",
                        )}
                      >
                        {item.title}
                      </span>
                      <span className="mt-2 block max-w-[30rem] text-fg-soft lg:hidden">{item.summary}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "mt-1 flex size-10 items-center justify-center rounded-full border border-line-strong transition-[background-color,border-color,color,rotate] duration-[var(--dur-slow)] ease-brand lg:mt-0",
                        lit && `lg:rotate-45 lg:border-transparent ${itemColors.bg} ${itemColors.fg}`,
                      )}
                    >
                      <ArrowUpRight strokeWidth={2} className="size-[1.125rem]" />
                    </span>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>

          {/* Visual companion to the list; the list itself carries all the content. */}
          <div aria-hidden="true" className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-[calc(var(--nav-h)+2rem)]">
              <div
                className={cn(
                  "relative aspect-[4/5] overflow-hidden rounded-panel transition-colors duration-[var(--dur-slow)] ease-brand",
                  colors.bg,
                  colors.fg,
                )}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <m.div
                    key={service.slug}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.36 }}
                    className="absolute inset-0 flex flex-col p-9 xl:p-10"
                  >
                    <div className="flex items-start justify-between">
                      <span className="numeral text-small font-semibold">
                        {service.index} / {String(services.length).padStart(2, "0")}
                      </span>
                      <span className="flex size-14 items-center justify-center rounded-2xl bg-ink text-white">
                        <Icon strokeWidth={1.75} className="size-7" />
                      </span>
                    </div>
                    <Icon strokeWidth={0.6} className="absolute -right-10 -bottom-10 size-[22rem] opacity-[0.16]" />
                    <div className="relative mt-auto">
                      <p className="font-display text-[2.5rem] leading-[1] font-bold tracking-[-0.04em] xl:text-[2.875rem]">
                        {service.title}
                      </p>
                      <p className="mt-4 max-w-[24rem] text-lead opacity-90">{service.summary}</p>
                      <p className="eyebrow mt-8 opacity-75">{content.includesLabel}</p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {service.offerings.slice(0, 4).map((offering) => (
                          <li
                            key={offering.title}
                            className="rounded-full border border-current/30 px-3.5 py-1.5 text-small font-semibold"
                          >
                            {offering.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </m.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <Reveal className="mt-12 lg:mt-16">
          <ButtonLink href={content.cta.href}>{content.cta.label}</ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
