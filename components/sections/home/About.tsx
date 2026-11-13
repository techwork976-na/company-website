"use client";

import { useRef } from "react";
import { home } from "@/content/site";
import { cn, cssVars } from "@/lib/cn";
import { useLazyGsap } from "@/lib/use-lazy-gsap";
import { MaskedText } from "@/components/motion/MaskedText";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Eyebrow } from "@/components/ui/Eyebrow";

const markers = ["bg-coral", "bg-lime", "bg-sky"];
const offsets = ["lg:pl-0", "lg:pl-[16%]", "lg:pl-[32%]"];

/**
 * About: the statement, then the three supporting lines as large type that
 * drifts sideways in opposite directions as you scroll (GSAP scrub), so
 * the section feels like it is moving with you.
 */
export function About() {
  const content = home.about;
  const sectionRef = useRef<HTMLElement>(null);

  useLazyGsap(sectionRef, (gsap) => {
    gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((line, index) => {
      const direction = index % 2 === 0 ? 1 : -1;
      gsap.fromTo(
        line,
        { xPercent: -4 * direction },
        {
          xPercent: 4 * direction,
          ease: "none",
          scrollTrigger: { trigger: line, start: "top bottom", end: "bottom top", scrub: 0.6 },
        },
      );
    });
  });

  return (
    <section
      ref={sectionRef}
      id="about"
     
      aria-labelledby="about-title"
      className="section-y relative overflow-hidden"
    >
      <div className="container-wide">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <MaskedText id="about-title" lines={content.title} className="mt-6 text-h1 text-fg" />
          </div>
          <Reveal className="lg:col-span-5 lg:col-start-8 lg:self-end" delay={120}>
            <p className="text-lead text-fg-soft">{content.description}</p>
            <ArrowLink href={content.cta.href} className="mt-6 text-accent">
              {content.cta.label}
            </ArrowLink>
          </Reveal>
        </div>

        <ul className="mt-20 border-t border-line lg:mt-28">
          {content.support.map((line, index) => (
            <li key={line} className="border-b border-line">
              <Reveal
                className={cn("flex items-center gap-5 py-6 md:gap-8 md:py-8", offsets[index])}
                delay={index * 80}
              >
                <span className="numeral w-8 shrink-0 text-small text-fg-soft">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  aria-hidden="true"
                  className={cn("size-4 shrink-0 rounded-[4px] md:size-6", markers[index])}
                  style={cssVars({ "--i": index })}
                />
                <span
                  data-drift=""
                  className="block font-display text-[clamp(1.875rem,0.9rem+4.6vw,5.5rem)] leading-[1] font-bold tracking-[-0.045em] text-fg md:whitespace-nowrap"
                >
                  {line}
                </span>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
