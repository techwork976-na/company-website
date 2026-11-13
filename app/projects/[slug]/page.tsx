import { Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectPage } from "@/content/site";
import { getNextProject, getProject, projects } from "@/content/projects";
import { cn, cssVars } from "@/lib/cn";
import { stages } from "@/lib/project-style";
import { pageMetadata } from "@/lib/seo";
import { TechIcon } from "@/lib/tech-icons";
import { MaskedText } from "@/components/motion/MaskedText";
import { PageTransition } from "@/components/motion/PageTransition";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectMockup } from "@/components/mockups";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export const instant = false;

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { robots: { index: false } };
  return {
    ...pageMetadata({ title: project.title, description: project.summary, path: `/projects/${project.slug}` }),
    // Demo concepts stay out of search results.
    robots: { index: false, follow: true },
  };
}

/** A featured project: the coded mockup large on its colour stage, then the story and the details. */
export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const stage = stages[project.stage];
  const next = getNextProject(project.slug);
  const story = [
    { title: projectPage.overviewTitle, text: project.overview },
    { title: projectPage.challengeTitle, text: project.challenge },
    { title: projectPage.solutionTitle, text: project.solution },
  ];

  return (
    <PageTransition>
      <article aria-labelledby="project-title">
        <header data-tone="indigo" className="pt-8 pb-12 md:pt-12">
          <div className="container-wide">
            <ArrowLink href="/#work" direction="left">
              {projectPage.backLabel}
            </ArrowLink>
            <div className="mt-10 grid grid-cols-1 gap-8 lg:mt-14 lg:grid-cols-12 lg:items-end lg:gap-10">
              <div className="lg:col-span-8">
                <div className="hero-anim hero-rise" style={cssVars({ "--d": "0ms" })}>
                  <Eyebrow>{project.category}</Eyebrow>
                </div>
                <MaskedText
                  as="h1"
                  id="project-title"
                  trigger="load"
                  lines={[project.title]}
                  delay={40}
                  className="mt-7 text-h1 text-fg"
                />
              </div>
              <p
                className="hero-anim hero-rise text-lead text-fg-soft lg:col-span-4"
                style={cssVars({ "--d": "220ms" })}
              >
                {project.summary}
              </p>
            </div>
          </div>
        </header>

        <section data-tone="indigo" aria-label={project.title} className="pb-[var(--section-y)]">
          <div className="container-wide">
            <div
              className={cn(
                "hero-anim hero-rise overflow-hidden rounded-panel px-5 py-14 sm:px-10 md:py-20",
                stage.panel,
              )}
              style={cssVars({ "--d": "300ms" })}
            >
              <div className="mx-auto max-w-[52rem]">
                <ProjectMockup visual={project.visual} />
              </div>
            </div>
            <p className="mt-4 text-small text-fg-soft">{projectPage.demoNote}</p>
          </div>
        </section>

        <section data-tone="paper" aria-labelledby="story-title" className="section-y">
          <h2 id="story-title" className="sr-only">
            {projectPage.overviewTitle}
          </h2>
          <div className="container-wide grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="space-y-12 lg:col-span-7">
              {story.map((part, index) => (
                <Reveal
                  key={part.title}
                  delay={index * 60}
                  className="grid grid-cols-1 gap-3 border-t border-line pt-6 md:grid-cols-[12rem_1fr] md:gap-8"
                >
                  <h3 className="font-display text-title font-bold text-fg">{part.title}</h3>
                  <p className="text-lead text-fg-soft">{part.text}</p>
                </Reveal>
              ))}
            </div>

            <aside className="space-y-10 lg:col-span-4 lg:col-start-9">
              <Reveal className={cn("rounded-card p-7", stage.panel, stage.text)}>
                <h3 className="eyebrow">{projectPage.featuresTitle}</h3>
                <ul className="mt-5 space-y-3">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex gap-3 font-medium">
                      <Check aria-hidden="true" strokeWidth={2.5} className="mt-0.5 size-4.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={80}>
                <h3 className="eyebrow text-fg-soft">{projectPage.stackTitle}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((tool) => (
                    <li
                      key={tool}
                      className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-raise pr-4 pl-1.5 text-small font-semibold text-fg"
                    >
                      <span className="flex size-8 items-center justify-center rounded-full bg-canvas">
                        <TechIcon name={tool} />
                      </span>
                      {tool}
                    </li>
                  ))}
                </ul>
                <ButtonLink
                  href={`/contact?service=${project.service}`}
                  className="mt-10 w-full justify-between sm:w-auto"
                >
                  {projectPage.ctaLabel}
                </ButtonLink>
              </Reveal>
            </aside>
          </div>
        </section>

        <section data-tone="violet" aria-label={projectPage.nextLabel}>
          <Link href={`/projects/${next.slug}`} className="group block py-16 md:py-24">
            <span className="container-wide flex items-end justify-between gap-6">
              <span>
                <span className="eyebrow block text-fg-soft">{projectPage.nextLabel}</span>
                <span className="mt-4 block font-display text-h2 text-fg">
                  <span className="link-slide link-slide-group">{next.title}</span>
                </span>
              </span>
              <span
                aria-hidden="true"
                className="flex size-14 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent transition-transform duration-[var(--dur-slow)] ease-brand group-hover:translate-x-1 md:size-20"
              >
                <svg viewBox="0 0 24 24" className="size-6 md:size-8" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </span>
          </Link>
        </section>
      </article>
    </PageTransition>
  );
}
