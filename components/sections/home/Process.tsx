"use client";

import { useRef } from "react";
import { home } from "@/content/site";
import { useLazyGsap } from "@/lib/use-lazy-gsap";
import { MaskedText } from "@/components/motion/MaskedText";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * Six steps on one track. The heading and a large step counter stay
 * pinned beside the list (CSS sticky); as you scroll, a line fills along
 * the track and each step switches on as the line reaches it, while the
 * counter rolls to the current step (GSAP ScrollTrigger, scrubbed).
 * Without JavaScript or with reduced motion everything is shown complete.
 */
export function Process() {
  const content = home.process;
  const sectionRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);

  useLazyGsap(sectionRef, (gsap, _ScrollTrigger, section) => {
    const track = section.querySelector<HTMLElement>("[data-process-track]");
    const steps = gsap.utils.toArray<HTMLElement>("[data-process-step]", section);
    if (!track || steps.length === 0) return;

    section.setAttribute("data-enhanced", "");
    let current = -1;
    gsap.fromTo(
      section,
      { "--progress": 0 },
      {
        "--progress": 1,
        ease: "none",
        scrollTrigger: {
          trigger: track,
          start: "top 60%",
          end: "bottom 60%",
          scrub: 0.3,
          onUpdate: (self) => {
            let reached = 0;
            steps.forEach((step, index) => {
              const on = self.progress >= index / steps.length;
              step.toggleAttribute("data-active", on);
              if (on) reached = index;
            });
            if (reached !== current && counterRef.current && titleRef.current) {
              current = reached;
              counterRef.current.textContent = content.steps[reached]!.number;
              titleRef.current.textContent = content.steps[reached]!.title;
            }
          },
        },
      },
    );

    return () => {
      section.removeAttribute("data-enhanced");
      section.querySelectorAll("[data-active]").forEach((step) => step.removeAttribute("data-active"));
    };
  });

  return (
    <section
      id="process"
      ref={sectionRef}
     
      aria-labelledby="process-title"
      className="process section-y"
    >
      <div className="container-wide grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+3rem)]">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <MaskedText id="process-title" lines={content.title} className="mt-6 text-h2 text-fg" />
            <div aria-hidden="true" className="mt-12 hidden items-end gap-5 lg:flex">
              <span
                ref={counterRef}
                className="font-display text-[8rem] leading-[0.8] font-extrabold tracking-[-0.06em] text-accent"
              >
                {content.steps[0]!.number}
              </span>
              <span className="pb-2">
                <span className="eyebrow block text-fg-soft">{content.stepLabel}</span>
                <span ref={titleRef} className="mt-1 block font-display text-title font-bold text-fg">
                  {content.steps[0]!.title}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div data-process-track="" className="relative lg:col-span-6 lg:col-start-7">
          <span aria-hidden="true" className="process__line">
            <span className="process__fill" />
          </span>
          <ol className="space-y-10 md:space-y-14">
            {content.steps.map((step) => (
              <li
                key={step.number}
                data-process-step=""
                className="relative grid grid-cols-[2.5rem_1fr] gap-x-6 md:gap-x-8"
              >
                <span
                  aria-hidden="true"
                  className="process__node numeral relative z-10 flex size-10 items-center justify-center rounded-full border-2 border-accent bg-accent text-small font-semibold text-on-accent"
                >
                  {step.number}
                </span>
                <div className="process__content pt-1">
                  <h3 className="font-display text-h3 text-fg">
                    <span className="sr-only">{step.number}. </span>
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-[30rem] text-lead text-fg-soft">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
