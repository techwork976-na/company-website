import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { getNextProject, getProject, projects } from "@/content/projects";
import { projectPage, serviceCategories, workPage } from "@/content/site";
import { cssVars } from "@/lib/cn";
import { pageMetadata } from "@/lib/seo";
import { MaskedText } from "@/components/motion/MaskedText";
import { PageTransition } from "@/components/motion/PageTransition";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Tag } from "@/components/ui/Tag";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

/*
 * Every project page is prerendered, and links to it use prefetch={true},
 * so the whole page is already on the client when someone clicks. The page
 * may therefore read `params` without a Suspense placeholder, which also
 * keeps the card-to-hero image morph intact.
 */
export const instant = false;

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { robots: { index: false } };
  return {
    ...pageMetadata({ title: project.name, description: project.summary, path: `/work/${project.slug}` }),
    // Sample case studies stay out of search results until they are real.
    robots: project.placeholder ? { index: false, follow: true } : undefined,
  };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getNextProject(project.slug);
  const category = serviceCategories.find((item) => item.id === project.category);
  const sections = [
    { label: projectPage.problemLabel, text: project.problem },
    { label: projectPage.builtLabel, text: project.built },
    { label: projectPage.resultLabel, text: project.outcome },
  ];
  const meta = [
    { label: projectPage.categoryLabel, value: category?.title ?? project.category },
    { label: projectPage.scopeLabel, value: project.scope.join(", ") },
    { label: projectPage.yearLabel, value: project.year, numeral: true },
  ];

  return (
    <PageTransition>
      <article aria-labelledby={`project-${project.slug}-title`}>
        <header className="container-wide pt-6 md:pt-10 lg:pt-12">
          <ArrowLink href="/work" direction="left" className="text-ink">
            {projectPage.backLabel}
          </ArrowLink>
          <div className="hero-anim hero-rise mt-8 flex flex-wrap gap-2 lg:mt-10" style={cssVars({ "--d": "0ms" })}>
            <Tag>{project.kind}</Tag>
            {project.placeholder ? <Tag variant="sample">{workPage.sampleTag}</Tag> : null}
          </div>
          <MaskedText
            as="h1"
            id={`project-${project.slug}-title`}
            trigger="load"
            lines={[project.name]}
            delay={40}
            className="mt-5 text-h1 text-ink"
          />
          <p className="hero-anim hero-rise mt-5 max-w-[40rem] text-lead text-ink2" style={cssVars({ "--d": "140ms" })}>
            {project.summary}
          </p>
          <dl
            className="hero-anim hero-rise mt-10 grid grid-cols-1 divide-y divide-line overflow-hidden rounded-card border border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0"
            style={cssVars({ "--d": "200ms" })}
          >
            {meta.map((item) => (
              <div key={item.label} className="p-5 lg:p-6">
                <dt className="eyebrow text-ink-soft">{item.label}</dt>
                <dd className={item.numeral ? "numeral mt-1 text-ink" : "mt-1 text-ink"}>{item.value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <div className="container-wide mt-8 lg:mt-10">
          <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
            <div className="aspect-[4/3] overflow-hidden rounded-panel border border-line bg-surface md:aspect-[16/9]">
              <ProjectVisual project={project} priority sizes="(min-width: 1344px) 1248px, 100vw" />
            </div>
          </ViewTransition>
          {project.placeholder ? (
            <p className="mt-3 text-[0.875rem] text-ink-soft">{projectPage.sampleNote}</p>
          ) : null}
        </div>

        <Stagger className="container-wide section-y">
          {sections.map((section, sectionIndex) => (
            <StaggerItem
              key={section.label}
              index={sectionIndex}
              className="grid grid-cols-1 gap-4 border-t border-line py-8 first:border-t-0 first:pt-0 last:pb-0 lg:grid-cols-12 lg:gap-8 lg:py-12"
            >
              <div className="lg:col-span-4">
                <SectionLabel as="h2" index={String(sectionIndex + 1).padStart(2, "0")}>
                  {section.label}
                </SectionLabel>
              </div>
              <p className="max-w-[42rem] text-title text-ink lg:col-span-8">{section.text}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <section aria-label={projectPage.nextLabel} className="border-t border-line bg-surface">
          <Link
            href={`/work/${next.slug}`}
            prefetch
            className="group container-wide flex flex-col gap-8 py-14 lg:flex-row lg:items-end lg:justify-between lg:py-20"
          >
            <span className="block">
              <SectionLabel as="span">{projectPage.nextLabel}</SectionLabel>
              <span className="mt-5 block text-h1 font-semibold text-ink">
                <span className="link-slide link-slide-group">{next.name}</span>
              </span>
              <span className="mt-3 block max-w-[34rem] text-ink2">{next.summary}</span>
            </span>
            <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-ink text-surface transition-colors duration-[var(--dur-fast)] ease-brand group-hover:bg-ink2 lg:size-16">
              <ArrowRight
                aria-hidden="true"
                strokeWidth={1.75}
                className="size-6 transition-transform duration-[var(--dur-fast)] ease-brand group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        </section>
      </article>
    </PageTransition>
  );
}
