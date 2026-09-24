import { describe, it, expect } from "vitest";
import { BRANDS, CATEGORIES, SIZE_SCALE, convertSize } from "./convert.js";

describe("convertSize (AC1: lookup) and AC2 (confidence) and AC5 (caveat)", () => {
  for (const category of CATEGORIES) {
    for (const sourceBrand of BRANDS) {
      for (const targetBrand of BRANDS) {
        it(`${category}: ${sourceBrand} -> ${targetBrand} returns a full result`, () => {
          const result = convertSize(sourceBrand, "M", category, targetBrand);

          // AC1: non-empty result for every brand pair present in the dataset
          expect(result.targetSize).toBeTruthy();
          expect(SIZE_SCALE).toContain(result.targetSize);

          // AC2: exactly one of the two confidence labels, never both/neither
          expect(["close match", "uncertain"]).toContain(result.confidence);

          // AC5: every result carries a non-empty caveat
          expect(typeof result.caveat).toBe("string");
          expect(result.caveat.length).toBeGreaterThan(0);
        });
      }
    }
  }

  it("throws on an unknown source brand", () => {
    expect(() => convertSize("NotABrand", "M", "tops", "Zara")).toThrow();
  });

  it("throws on an unknown size", () => {
    expect(() => convertSize("Zara", "XXXL", "tops", "H&M")).toThrow();
  });

  it("clamps rather than returning an out-of-scale size", () => {
    // XS in a brand that runs small (+1), converted to a brand that runs large (-1),
    // would go below XS -- must clamp to the scale, not return undefined.
    const result = convertSize("Zara", "XS", "tops", "Old Navy");
    expect(SIZE_SCALE).toContain(result.targetSize);
  });
});
