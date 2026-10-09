/**
 * Chapters for the animated case-study view.
 *
 * A project may author `caseStudy.chapters` by hand - that always wins. Where
 * it hasn't, chapters are derived from fields the project already carries
 * (description, points, stages). Nothing is written here that the project
 * doesn't already say about itself: a project with no content gets no
 * chapters, and the caller falls back to its external link.
 */
export function chaptersFor(project) {
  if (!project) return [];
  if (project.caseStudy?.chapters?.length) return project.caseStudy.chapters;

  const chapters = [];

  if (project.description) {
    chapters.push({
      kind: "problem",
      label: "Overview",
      title: project.subtitle || project.title,
      body: project.description,
    });
  }

  if (project.points?.length) {
    chapters.push({
      kind: "solution",
      label: "What I Did",
      title: project.role || "What I did",
      bullets: project.points,
    });
  }

  if (project.stages?.length) {
    chapters.push({
      kind: "process",
      label: "Process",
      title: project.stagesLabel || "How it came together",
      steps: project.stages,
    });
  }

  return chapters;
}
