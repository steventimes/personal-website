export interface RepositorySnapshot {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  updatedAt: string;
  url: string;
}

export interface GitHubRepository {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
}

export const isGitHubRepository = (value: unknown): value is GitHubRepository => {
  if (!value || typeof value !== "object") return false;
  const repo = value as Partial<GitHubRepository>;
  return typeof repo.name === "string"
    && (typeof repo.description === "string" || repo.description === null)
    && typeof repo.html_url === "string"
    && (typeof repo.language === "string" || repo.language === null)
    && typeof repo.stargazers_count === "number"
    && typeof repo.forks_count === "number"
    && typeof repo.updated_at === "string"
    && typeof repo.fork === "boolean";
};

export const rankRepositories = (repos: GitHubRepository[], limit = 4) =>
  repos.filter((repo) => !repo.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count
      || Date.parse(b.updated_at) - Date.parse(a.updated_at))
    .slice(0, limit);

export const mergeRepository = (
  snapshot: RepositorySnapshot,
  remote: GitHubRepository
): RepositorySnapshot => ({
  ...snapshot,
  language: remote.language || snapshot.language,
  stars: remote.stargazers_count,
  forks: remote.forks_count,
  updatedAt: remote.updated_at
});
