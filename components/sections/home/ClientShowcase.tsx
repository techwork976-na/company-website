"use client";

import { useRef } from "react";
import { home } from "@/content/site";
import { cssVars } from "@/lib/cn";
import { useLazyGsap } from "@/lib/use-lazy-gsap";
import { MaskedText } from "@/components/motion/MaskedText";
import { Reveal } from "@/components/motion/Reveal";
import { BrandMark, brandColors } from "@/components/ui/BrandMark";
import { Eyebrow } from "@/components/ui/Eyebrow";

/** How far the visitor scrolls, in viewport heights, for one full turn. */
const TURN_LENGTH = 1.5;

/**
 * Client showcase as a very large dial. Only the top of the wheel is
 * visible, so brand wordmarks rise over the horizon and set again, with a
 * precision tick ring turning with them.
 *
 * Scroll-driven (GSAP ScrollTrigger): when the section reaches the middle
 * of the screen it pins, and scrolling turns the dial one full rotation
 * (360°); then the page unpins and carries on. Scrub smoothing keeps the
 * turn fluid with wheels, trackpads and touch. With reduced motion, or
 * without JavaScript, the dial simply stays still.
 */
export function ClientShowcase() {
  const content = home.clients;
  // Two laps of the eight brands around the wheel.
  const items = [...content.brands, ...content.brands];
  const sectionRef = useRef<HTMLElement>(null);

  useLazyGsap(
    sectionRef,
    (gsap, ScrollTrigger, section) => {
      const wheel = section.querySelector<HTMLElement>("[data-dial-wheel]");
      if (!wheel) return;

      gsap.fromTo(
        wheel,
        { rotation: 0 },
        {
          rotation: 360,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            // Pin with the whole section centred when it fits on screen.
            start: () => (section.offsetHeight < window.innerHeight ? "center center" : "top top"),
            end: () => `+=${Math.round(window.innerHeight * TURN_LENGTH)}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            // The pin adds scroll space, so it is measured before every other trigger.
            refreshPriority: 1,
          },
        },
      );

      // Sections further down measure their triggers after the pin's space exists.
      ScrollTrigger.refresh();
    },
    // Set up straight away: the pin changes the page height, which must
    // happen before the visitor gets near, never while they are below it.
    { margin: "100000px 0px" },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="clients-title"
      className="relative bg-canvas pt-[calc(var(--section-y)*0.5)]"
    >
      <div className="container-wide grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
        <div className="lg:col-span-7">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <MaskedText id="clients-title" lines={content.title} className="mt-6 text-h2 text-fg" />
        </div>
        <Reveal className="lg:col-span-4 lg:col-start-9" delay={120}>
          <p className="text-lead text-fg-soft">{content.description}</p>
        </Reveal>
      </div>

      <Reveal variant="fade" className="dial mt-10 lg:mt-14">
        <div data-dial-wheel="" className="dial__wheel">
          <span aria-hidden="true" className="dial__ring" />
          <span aria-hidden="true" className="dial__ticks" />
          <span aria-hidden="true" className="dial__ring dial__ring--inner" />
          <ul aria-label={content.listLabel} className="contents">
            {items.map((brand, index) => {
              const { color, ink } = brandColors(brand);
              const duplicate = index >= content.brands.length;
              return (
                <li
                  key={`${brand}-${index}`}
                  aria-hidden={duplicate ? "true" : undefined}
                  className="dial__item"
                  style={cssVars({ "--i": index, "--n": items.length })}
                >
                  <span
                    className="dial__brand flex items-center gap-3 whitespace-nowrap"
                    style={cssVars({ "--brand": color, "--brand-ink": ink })}
                  >
                    <span
                      className="dial__brand-mark flex size-11 items-center justify-center rounded-[0.875rem] border border-line bg-raise md:size-12"
                      style={{ color }}
                    >
                      <BrandMark name={brand} className="size-6" />
                    </span>
                    <span className="font-display text-[1.375rem] font-bold tracking-[-0.035em] text-fg md:text-[1.75rem]">
                      {brand}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
