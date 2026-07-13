import { describe, expect, it } from "vitest";
import { isGitHubRepository, mergeRepository, rankRepositories } from "./repositories";

const repo = (name: string, stars: number, updated: string, fork = false) => ({
  name,
  description: `${name} description`,
  html_url: `https://github.com/steventimes/${name}`,
  language: "Python",
  stargazers_count: stars,
  forks_count: 0,
  updated_at: updated,
  fork
});

describe("repository helpers", () => {
  it("validates the complete GitHub shape", () => {
    expect(isGitHubRepository(repo("valid", 1, "2026-07-10T00:00:00Z"))).toBe(true);
    expect(isGitHubRepository({ name: "partial" })).toBe(false);
  });

  it("ranks non-forks by stars and then update time", () => {
    const ranked = rankRepositories([
      repo("recent", 0, "2026-07-10T00:00:00Z"),
      repo("starred", 1, "2026-01-01T00:00:00Z"),
      repo("old", 0, "2025-01-01T00:00:00Z"),
      repo("fork", 9, "2026-07-10T00:00:00Z", true)
    ], 3);
    expect(ranked.map((item) => item.name)).toEqual(["starred", "recent", "old"]);
  });

  it("keeps the authored description while refreshing metadata", () => {
    const merged = mergeRepository({
      name: "fpstreams",
      description: "Authored summary",
      language: "Python",
      stars: 1,
      forks: 0,
      updatedAt: "2026-03-10T13:40:21Z",
      url: "https://github.com/steventimes/fpstreams"
    }, repo("fpstreams", 2, "2026-07-10T00:00:00Z"));
    expect(merged.description).toBe("Authored summary");
    expect(merged.stars).toBe(2);
  });
});
