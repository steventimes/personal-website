import { describe, expect, it } from "vitest";
import { site } from "./site";

describe("portfolio content boundaries", () => {
  it("publishes only the maintained public code in the authored order", () => {
    expect(site.publicCode.map((project) => project.name)).toEqual([
      "fpstreams",
      "dependency-checker"
    ]);
  });

  it("keeps the reimbursement repository with the featured internship", () => {
    expect(site.featuredExperience.link).toEqual({
      label: "View reimbursement workflow code",
      href: "https://github.com/steventimes/Email-project-yudao"
    });
  });

  it("publishes only the Software Systems Atlas deployment", () => {
    const atlas = site.otherWork.find((item) => item.id === "software-systems-atlas");
    expect(atlas?.link.href).toBe("https://software-systems-atlas.pages.dev");
    expect(atlas?.link.href).not.toContain("github.com");
  });
});
