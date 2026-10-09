import { projects, siteUrl } from "@/data/portfolio";
import { chaptersFor } from "@/lib/caseStudyChapters";

export default function sitemap() {
  const lastModified = new Date();

  // Only the studies that actually have a page of their own.
  const studies = projects
    .filter((project) => chaptersFor(project).length > 0)
    .map((project) => ({
      url: `${siteUrl}/work/${project.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...studies,
  ];
}
