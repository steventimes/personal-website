import type { RepositorySnapshot } from "../lib/repositories";
import { isGitHubRepository, mergeRepository, rankRepositories } from "../lib/repositories";

const usernamePattern = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/;
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC"
});

const formatCount = (value: number, label: string) =>
  `${value} ${label}${value === 1 ? "" : "s"}`;

const formatDate = (value: string): string => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Unknown" : dateFormatter.format(date);
};

const readSnapshot = (row: HTMLElement): RepositorySnapshot | null => {
  const name = row.dataset.repoName;
  const link = row.querySelector<HTMLAnchorElement>("h3 a");
  const description = row.querySelector<HTMLElement>("[data-repo-description]");
  const language = row.querySelector<HTMLElement>("[data-repo-language]");
  const stars = row.querySelector<HTMLElement>("[data-repo-stars]");
  const forks = row.querySelector<HTMLElement>("[data-repo-forks]");
  const updated = row.querySelector<HTMLTimeElement>("[data-repo-updated]");

  if (!name || !link || !description || !language || !stars || !forks || !updated) {
    return null;
  }

  const starsValue = Number(stars.dataset.repoStars);
  const forksValue = Number(forks.dataset.repoForks);
  if (!Number.isFinite(starsValue) || !Number.isFinite(forksValue)) return null;

  return {
    name,
    description: description.textContent?.trim() ?? "",
    language: language.textContent?.trim() ?? "",
    stars: starsValue,
    forks: forksValue,
    updatedAt: updated.dateTime,
    url: link.getAttribute("href") ?? ""
  };
};

const updateRow = (row: HTMLElement, repository: RepositorySnapshot): void => {
  const language = row.querySelector<HTMLElement>("[data-repo-language]");
  const stars = row.querySelector<HTMLElement>("[data-repo-stars]");
  const forks = row.querySelector<HTMLElement>("[data-repo-forks]");
  const updated = row.querySelector<HTMLTimeElement>("[data-repo-updated]");
  if (!language || !stars || !forks || !updated) return;

  language.textContent = repository.language;
  stars.dataset.repoStars = String(repository.stars);
  stars.textContent = formatCount(repository.stars, "star");
  forks.dataset.repoForks = String(repository.forks);
  forks.textContent = formatCount(repository.forks, "fork");
  updated.dateTime = repository.updatedAt;
  updated.textContent = formatDate(repository.updatedAt);
};

document.querySelectorAll<HTMLElement>("[data-repo-cards]").forEach((root) => {
  if (root.dataset.enhanced === "true") return;
  root.dataset.enhanced = "true";

  const username = root.dataset.username ?? "";
  const error = root.querySelector<HTMLElement>("[data-repo-error]");
  const rows = Array.from(root.querySelectorAll<HTMLElement>("[data-repo-name]"));

  const showError = () => {
    if (error) error.hidden = false;
  };

  if (!error || !usernamePattern.test(username)) {
    showError();
    return;
  }

  const snapshots = rows
    .map(readSnapshot)
    .filter((snapshot): snapshot is RepositorySnapshot => snapshot !== null);

  if (snapshots.length !== rows.length) {
    showError();
    return;
  }

  void (async () => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
        { headers: { Accept: "application/vnd.github+json" } }
      );
      if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);

      const payload: unknown = await response.json();
      if (!Array.isArray(payload) || !payload.every(isGitHubRepository)) {
        throw new Error("GitHub API returned an unexpected response");
      }

      const remoteByName = new Map(
        rankRepositories(payload, 4).map((repository) => [repository.name, repository])
      );

      snapshots.forEach((snapshot) => {
        const remote = remoteByName.get(snapshot.name);
        const row = rows.find((candidate) => candidate.dataset.repoName === snapshot.name);
        if (remote && row) updateRow(row, mergeRepository(snapshot, remote));
      });
    } catch {
      showError();
    }
  })();
});
