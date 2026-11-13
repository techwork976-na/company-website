import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { ogContentType, ogSize, renderProjectOgImage } from "@/lib/og";

export const alt = `A ${site.name} project`;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectTwitterImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return renderProjectOgImage(slug);
}
