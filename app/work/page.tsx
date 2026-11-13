import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { serviceCategories, workPage } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { PageTransition } from "@/components/motion/PageTransition";
import { ProjectCard } from "@/components/sections/work/ProjectCard";
import { WorkGrid } from "@/components/sections/work/WorkGrid";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = pageMetadata({
  title: workPage.metaTitle,
  description: workPage.metaDescription,
  path: "/work",
});

export default function WorkPage() {
  const filters = serviceCategories.map((category) => ({ id: category.id, label: category.shortTitle }));
  return (
    <PageTransition>
      <div>
        <PageHeader label={workPage.label} title={workPage.title} intro={workPage.intro} />
        <WorkGrid
          projects={projects}
          filters={filters}
          cards={projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        />
      </div>
    </PageTransition>
  );
}
