"use client";

import { Check } from "lucide-react";
import { useRef } from "react";
import { home } from "@/content/site";
import { projects } from "@/content/projects";
import { cn, cssVars } from "@/lib/cn";
import { stages } from "@/lib/project-style";
import { useLazyGsap } from "@/lib/use-lazy-gsap";
import { MaskedText } from "@/components/motion/MaskedText";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectMockup } from "@/components/mockups";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * Featured projects as a deck of full-width colour panels. On large
 * screens each panel sticks a little lower than the last, so they stack
 * as you scroll, and the panel underneath eases back (GSAP scrub). The
 * coded mockup is the hero of every panel; layouts alternate sides.
 */
export function FeaturedProjects() {
  const content = home.projects;
  const sectionRef = useRef<HTMLElement>(null);

  useLazyGsap(
    sectionRef,
    (gsap, _ScrollTrigger, section) => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-stack-panel]", section);
      panels.forEach((panel, index) => {
        const next = panels[index + 1];
        const inner = panel.querySelector<HTMLElement>("[data-stack-inner]");
        if (!next || !inner) return;
        gsap.to(inner, {
          scale: 0.94,
          ease: "none",
          scrollTrigger: { trigger: next, start: "top bottom", end: "top 20%", scrub: 0.4 },
        });
      });
    },
    { media: "(min-width: 64rem)" },
  );

  return (
    <section ref={sectionRef} id="work" data-tone="indigo" aria-labelledby="work-title" className="section-y relative">
      <div className="container-wide">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-8">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <MaskedText id="work-title" lines={content.title} className="mt-6 text-h2 text-fg" />
          </div>
          <Reveal className="lg:col-span-3 lg:col-start-10" delay={120}>
            <p className="text-lead text-fg-soft">{content.description}</p>
          </Reveal>
        </div>

        <ol className="mt-14 space-y-6 lg:mt-20 lg:space-y-[12vh]">
          {projects.map((project, index) => {
            const stage = stages[project.stage];
            const flip = index % 2 === 1;
            return (
              <li key={project.slug} data-stack-panel="" className="stack-panel" style={cssVars({ "--i": index })}>
                <article
                  data-stack-inner=""
                  aria-labelledby={`project-${project.slug}`}
                  className={cn(
                    "stack-panel__inner grid grid-cols-1 gap-10 overflow-hidden rounded-panel p-6 sm:p-8 lg:min-h-[min(80vh,46rem)] lg:grid-cols-12 lg:items-center lg:gap-8 lg:p-12 xl:p-14",
                    stage.panel,
                    stage.text,
                  )}
                >
                  <div className={cn("lg:col-span-5", flip && "lg:order-2 lg:col-start-8")}>
                    <p className={cn("eyebrow flex flex-wrap items-center gap-x-3 gap-y-1", stage.soft)}>
                      <span className="numeral">
                        {content.projectLabel} {project.index}
                      </span>
                      <span aria-hidden="true" className="h-px w-6 bg-current" />
                      <span>{project.category}</span>
                    </p>
                    <h3 id={`project-${project.slug}`} className="mt-5 text-h3">
                      {project.title}
                    </h3>
                    <p className={cn("mt-4 max-w-[30rem] text-lead", stage.soft)}>{project.summary}</p>

                    <p className="eyebrow mt-8">{content.featuresLabel}</p>
                    <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                      {project.features.map((feature) => (
                        <li key={feature} className="flex gap-2.5 text-small font-medium">
                          <Check aria-hidden="true" strokeWidth={2.5} className="mt-0.5 size-4 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <p className="sr-only">{content.stackLabel}</p>
                    <ul className="mt-6 flex flex-wrap gap-1.5">
                      {project.stack.map((tool) => (
                        <li
                          key={tool}
                          className={cn("rounded-full border px-3 py-1 text-[0.8125rem] font-semibold", stage.chip)}
                        >
                          {tool}
                        </li>
                      ))}
                    </ul>

                    <ArrowLink href={`/projects/${project.slug}`} className="mt-7">
                      {content.viewLabel}
                      <span className="sr-only">: {project.title}</span>
                    </ArrowLink>
                  </div>

                  <div className={cn("relative lg:col-span-7", flip && "lg:order-1 lg:col-start-1")}>
                    <div className="mx-auto max-w-[44rem] py-4 lg:py-6">
                      <ProjectMockup visual={project.visual} />
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
