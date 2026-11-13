"use client";

import { useEffect, useRef } from "react";
import { home } from "@/content/site";
import { motion } from "@/lib/tokens";
import { REDUCED_MOTION } from "@/lib/use-media-query";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Four steps on one track. As the section scrolls into view, a thin gold
 * line fills along the track and each step switches on as the line reaches
 * it (GSAP ScrollTrigger, scrubbed to the scroll position, so it is exactly
 * as fast as the visitor scrolls).
 *
 * GSAP is only downloaded when the section approaches the viewport. Without
 * JavaScript, or with reduced motion, the track is simply shown complete.
 */
export function Process() {
  const content = home.process;
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia(REDUCED_MOTION).matches) return;

    let cancelled = false;
    let revert: (() => void) | undefined;

    const enhance = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const context = gsap.context(() => {
        const track = section.querySelector<HTMLElement>("[data-process-track]");
        const steps = gsap.utils.toArray<HTMLElement>("[data-process-step]", section);
        if (!track || steps.length === 0) return;

        section.setAttribute("data-enhanced", "");
        gsap.fromTo(
          section,
          { "--progress": 0 },
          {
            "--progress": 1,
            ease: "none",
            scrollTrigger: {
              trigger: track,
              start: "top 85%",
              end: "top 45%",
              scrub: 0.2,
              onUpdate: (self) => {
                steps.forEach((step, index) => {
                  step.toggleAttribute("data-active", self.progress >= index / steps.length + 0.02);
                });
              },
            },
          },
        );
      }, section);

      revert = () => {
        context.revert();
        section.removeAttribute("data-enhanced");
        section.querySelectorAll("[data-active]").forEach((step) => step.removeAttribute("data-active"));
      };
    };

    // Fetch GSAP shortly before the section is needed, not on page load.
    const nearby = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        nearby.disconnect();
        void enhance();
      },
      { rootMargin: "800px 0px" },
    );
    nearby.observe(section);

    return () => {
      cancelled = true;
      nearby.disconnect();
      revert?.();
    };
  }, []);

  return (
    <section id="process" ref={sectionRef} aria-labelledby="process-title" className="process section-y">
      <div className="container-wide">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <SectionLabel index={content.index}>{content.label}</SectionLabel>
            <SplitHeading id="process-title" lines={content.title} className="mt-5 text-h2 text-ink" />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9 lg:self-end" delay={80}>
            <p className="text-lead text-ink2">{content.intro}</p>
          </Reveal>
        </div>

        <AnimatedContent distance={16} duration={motion.duration.reveal} threshold={0.1} className="relative mt-12 lg:mt-16" data-process-track="">
          <span aria-hidden="true" className="process__line">
            <span className="process__fill" />
          </span>
          <ol className="grid grid-cols-1 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
            {content.steps.map((step) => (
              <li key={step.number} data-process-step="" className="relative pl-9 lg:pt-10 lg:pl-0">
                <span aria-hidden="true" className="process__node" />
                <div className="process__content">
                  <span className="numeral text-[0.875rem] text-ink-soft">{step.number}</span>
                  <h3 className="mt-2 text-title text-ink">{step.title}</h3>
                  <p className="mt-2 max-w-[22rem] text-ink2">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </AnimatedContent>
      </div>
    </section>
  );
}
