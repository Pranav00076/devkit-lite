import { describe, it, expect } from "vitest";
import { slugify } from "../src/slugify.js";

describe("slugify", () => {
  it("converts simple text", () => {
    expect(slugify("Hello World!")).toBe("hello-world");
  });

  it("returns empty string for empty input", () => {
    expect(slugify("")).toBe("");
  });

  it("returns empty string for input with only special characters", () => {
    expect(slugify("!@#$%^&*()")).toBe("");
  });

  it("removes special characters", () => {
    expect(slugify("Price: $99.99 (USD)")).toBe("price-9999-usd");
  });

  it("normalizes Unicode input", () => {
    expect(slugify("Café Crème")).toBe("cafe-creme");
    expect(slugify("Ünïcödé Tëxt")).toBe("unicode-text");
    expect(slugify("Ångström")).toBe("angstrom");
  });

  it("collapses consecutive spaces into one hyphen", () => {
    expect(slugify("too   many    spaces")).toBe("too-many-spaces");
  });

  it("collapses consecutive hyphens", () => {
    expect(slugify("already--slugified---text")).toBe("already-slugified-text");
  });

  it("removes leading and trailing hyphens", () => {
    expect(slugify("  -trimmed-  ")).toBe("trimmed");
    expect(slugify("--edge--")).toBe("edge");
  });

  it("handles underscores and mixed separators", () => {
    expect(slugify("snake_case and-kebab")).toBe("snake-case-and-kebab");
  });

  it("keeps digits intact", () => {
    expect(slugify("Version 2.0 Release")).toBe("version-20-release");
  });

  it("throws for non-string input", () => {
    expect(() => slugify(123)).toThrow(TypeError);
    expect(() => slugify(null)).toThrow(TypeError);
    expect(() => slugify(undefined)).toThrow(TypeError);
  });
});
