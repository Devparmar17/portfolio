import { notFound } from "next/navigation";

import { projects, siteUrl } from "@/data/portfolio";
import { chaptersFor } from "@/lib/caseStudyChapters";
import CaseStudyView from "@/components/case-study/CaseStudyView";

/** Only projects with something to show get a page of their own. */
const viewable = projects.filter((p) => chaptersFor(p).length > 0);

export function generateStaticParams() {
  return viewable.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = viewable.find((p) => p.slug === slug);
  if (!project) return {};

  const title = `${project.title} - ${project.subtitle}`;
  return {
    title,
    description: project.description,
    alternates: { canonical: `${siteUrl}/work/${project.slug}` },
    openGraph: {
      title,
      description: project.description,
      url: `${siteUrl}/work/${project.slug}`,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const project = viewable.find((p) => p.slug === slug);
  if (!project) notFound();

  // Wraps around, so the last study still offers somewhere to go.
  const i = viewable.findIndex((p) => p.slug === slug);
  const next = viewable[(i + 1) % viewable.length];

  return (
    <CaseStudyView
      project={project}
      next={next.slug === project.slug ? null : next}
    />
  );
}
