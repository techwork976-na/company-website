import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { absoluteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/services"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/work"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.8 },
  ];

  // Sample case studies stay out of search results until they are real.
  const caseStudies: MetadataRoute.Sitemap = projects
    .filter((project) => !project.placeholder)
    .map((project) => ({
      url: absoluteUrl(`/work/${project.slug}`),
      changeFrequency: "yearly",
      priority: 0.6,
    }));

  return [...pages, ...caseStudies];
}
