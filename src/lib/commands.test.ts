import { describe, expect, it } from "vitest";
import { filterCommandItems, nextActiveIndex } from "./commands";

const items = [
  { label: "Selected Work", href: "#projects" },
  { label: "Resume", href: "/resume.pdf" }
];

describe("command helpers", () => {
  it("filters labels without case sensitivity", () => {
    expect(filterCommandItems(items, "WORK")).toEqual([items[0]]);
  });

  it("wraps keyboard selection", () => {
    expect(nextActiveIndex(1, 1, 2)).toBe(0);
    expect(nextActiveIndex(0, -1, 2)).toBe(1);
    expect(nextActiveIndex(-1, 1, 2)).toBe(0);
  });
});
