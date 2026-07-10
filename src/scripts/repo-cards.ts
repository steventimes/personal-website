interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
}

const usernamePattern = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/;

const isGitHubRepo = (value: unknown): value is GitHubRepo => {
  if (!value || typeof value !== "object") return false;

  const repo = value as Partial<GitHubRepo>;
  return (
    typeof repo.name === "string" &&
    (typeof repo.description === "string" || repo.description === null) &&
    typeof repo.html_url === "string" &&
    (typeof repo.language === "string" || repo.language === null) &&
    typeof repo.stargazers_count === "number" &&
    typeof repo.forks_count === "number" &&
    typeof repo.updated_at === "string" &&
    typeof repo.fork === "boolean"
  );
};

const safeGitHubUrl = (value: string, username: string): string => {
  const fallback = `https://github.com/${encodeURIComponent(username)}`;

  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "github.com" ? url.href : fallback;
  } catch {
    return fallback;
  }
};

const formatDate = (value: string): string => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date);
};

const createRepoCard = (repo: GitHubRepo, username: string): HTMLAnchorElement => {
  const card = document.createElement("a");
  card.className = "repo-card surface shadow-soft";
  card.href = safeGitHubUrl(repo.html_url, username);
  card.target = "_blank";
  card.rel = "noreferrer";

  const headingRow = document.createElement("div");
  headingRow.className = "flex items-start justify-between gap-3";

  const name = document.createElement("h3");
  name.className = "min-w-0 break-words font-semibold text-zinc-950";
  name.textContent = repo.name;

  const language = document.createElement("span");
  language.className = "tag shrink-0";
  language.textContent = repo.language || "Repository";

  headingRow.append(name, language);

  const description = document.createElement("p");
  description.className = "mt-3 line-clamp-3 flex-1 text-sm leading-6 text-zinc-600";
  description.textContent = repo.description || "No description provided.";

  const metadata = document.createElement("div");
  metadata.className = "mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-zinc-500";

  const stars = document.createElement("span");
  stars.textContent = `${repo.stargazers_count} stars`;

  const forks = document.createElement("span");
  forks.textContent = `${repo.forks_count} forks`;

  const updated = document.createElement("span");
  updated.textContent = `Updated ${formatDate(repo.updated_at)}`;

  metadata.append(stars, forks, updated);
  card.append(headingRow, description, metadata);
  return card;
};

document.querySelectorAll<HTMLElement>("[data-repo-cards]").forEach((root) => {
  if (root.dataset.enhanced === "true") return;
  root.dataset.enhanced = "true";

  const username = root.dataset.username || "";
  const grid = root.querySelector<HTMLElement>("[data-repo-grid]");
  const error = root.querySelector<HTMLElement>("[data-repo-error]");
  if (!grid || !error) return;

  const showError = (message: string) => {
    grid.replaceChildren();
    error.textContent = message;
    error.classList.remove("hidden");
  };

  if (!usernamePattern.test(username)) {
    showError("Could not load repositories: invalid GitHub username.");
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
      if (!Array.isArray(payload)) throw new Error("GitHub API returned an unexpected response");

      const repositories = payload
        .filter(isGitHubRepo)
        .filter((repo) => !repo.fork)
        .sort(
          (a, b) =>
            b.stargazers_count - a.stargazers_count ||
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        )
        .slice(0, 6);

      if (repositories.length === 0) {
        const empty = document.createElement("p");
        empty.className = "text-sm text-zinc-500";
        empty.textContent = "No public repositories found.";
        grid.replaceChildren(empty);
        return;
      }

      grid.replaceChildren(...repositories.map((repo) => createRepoCard(repo, username)));
    } catch (cause) {
      console.error("Unable to load GitHub repositories", cause);
      showError("Could not load repositories. The GitHub API may be temporarily unavailable.");
    }
  })();
});
