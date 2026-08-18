import type { Project } from "@/lib/studio/types";

export function projectCaseNumber(projects: Project[], projectId: string) {
  const index = projects.findIndex((project) => project.id === projectId);
  return String(Math.max(index, 0) + 1).padStart(2, "0");
}

export function screenshotForProject(project: Project | null | undefined) {
  if (!project) return null;
  return project.screenshot_desktop || project.image || project.thumbnail || null;
}
