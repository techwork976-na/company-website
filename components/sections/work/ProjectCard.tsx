import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ViewTransition } from "react";
import type { Project } from "@/content/projects";
import { serviceCategories, workPage } from "@/content/site";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { Tag } from "@/components/ui/Tag";

type ProjectCardProps = {
  project: Project;
  headingLevel?: "h2" | "h3";
};

/** Case study card with a pointer-following spotlight (React Bits SpotlightCard). */
export function ProjectCard({ project, headingLevel: Heading = "h2" }: ProjectCardProps) {
  const category = serviceCategories.find((item) => item.id === project.category);
  return (
    <SpotlightCard
      theme="light"
      intensity={1}
      spotlightSize={300}
      className="group h-full transition-[box-shadow,translate] duration-[var(--dur-base)] ease-brand hover:-translate-y-0.5 hover:shadow-card has-[a:focus-visible]:shadow-card"
    >
      <Link href={`/work/${project.slug}`} prefetch className="relative z-[2] flex h-full flex-col rounded-card p-3 pb-5">
        <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
          <div className="aspect-[4/3] overflow-hidden rounded-ui border border-line bg-surface">
            <ProjectVisual project={project} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" />
          </div>
        </ViewTransition>
        <div className="flex flex-1 flex-col px-2 pt-4">
          <p className="text-[0.875rem] font-medium text-ink-soft">{project.kind}</p>
          <div className="mt-1 flex items-start justify-between gap-4">
            <Heading className="text-title text-ink">
              <span className="link-slide link-slide-group">{project.name}</span>
            </Heading>
            <ArrowUpRight
              aria-hidden="true"
              strokeWidth={1.75}
              className="mt-1 size-5 shrink-0 text-ink transition-transform duration-[var(--dur-fast)] ease-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
          <p className="mt-2 text-ink2">{project.summary}</p>
          <p className="mt-3 border-t border-line pt-3 text-[0.9375rem] text-ink">
            <span className="text-ink-soft">{workPage.resultLabel}: </span>
            {project.result}
          </p>
          <div className="mt-auto flex flex-wrap gap-2 pt-4">
            <Tag>{category?.shortTitle ?? project.category}</Tag>
            {project.placeholder ? <Tag variant="sample">{workPage.sampleTag}</Tag> : null}
          </div>
        </div>
      </Link>
    </SpotlightCard>
  );
}
