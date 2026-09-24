import { describe, it, expect } from "vitest";
import { getCoverage } from "./coverage.js";
import { BRAND_FIT, CATEGORIES } from "./convert.js";

describe("getCoverage (AC4)", () => {
  it("lists exactly the brands present in the data, and only those", () => {
    const coverage = getCoverage();
    expect(coverage.map((c) => c.category)).toEqual(CATEGORIES);
    for (const { category, brands } of coverage) {
      const expected = Object.keys(BRAND_FIT[category]).sort();
      expect(brands).toEqual(expected);
    }
  });
});
