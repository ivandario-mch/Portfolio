import { projects, type Project } from "@/data/projects";

export type ProjectMeta = Project & {
  stars: number;
  liveDescription: string | null;
};

type GitHubRepo = {
  name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
  fork: boolean;
};

const USERNAME = "ivandario-mch";

export async function getProjects(): Promise<ProjectMeta[]> {
  const fallback = projects.map((p) => ({
    ...p,
    stars: 0,
    liveDescription: null,
  }));

  try {
    const res = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`,
      { next: { revalidate: 60 * 60 * 6 } }
    );

    if (!res.ok) return fallback;

    const repos = (await res.json()) as GitHubRepo[];
    const byName = new Map(repos.map((r) => [r.name.toLowerCase(), r]));

    return projects.map((p) => {
      const repo = byName.get(p.name.toLowerCase());
      return {
        ...p,
        stars: repo?.stargazers_count ?? 0,
        liveDescription: repo?.description ?? null,
      };
    });
  } catch {
    return fallback;
  }
}
