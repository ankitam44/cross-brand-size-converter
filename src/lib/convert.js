// Universal alpha size scale used as the conversion backbone.
export const SIZE_SCALE = ["XS", "S", "M", "L", "XL", "XXL"];

export const CATEGORIES = ["tops", "bottoms"];

// Fit offset per brand per category, in whole size-steps relative to a neutral baseline:
//   -1 = runs large (size down a step)    0 = true to size    +1 = runs small (size up a step)
// Deliberately coarse (3 levels, not fractional) -- fake precision beyond this is exactly
// what the free incumbents already get wrong (see research.md).
export const BRAND_FIT = {
  tops: {
    "Zara": 1,
    "H&M": 1,
    "Uniqlo": 1,
    "Nike": 0,
    "Adidas": 0,
    "Gap": 0,
    "Levi's": 0,
    "Mango": 1,
    "Old Navy": -1,
    "ASOS": 0,
    "Everlane": 0,
    "J.Crew": -1,
  },
  bottoms: {
    "Zara": 1,
    "H&M": 1,
    "Uniqlo": 1,
    "Nike": 0,
    "Adidas": 0,
    "Gap": 0,
    "Levi's": 0,
    "Mango": 1,
    "Old Navy": -1,
    "ASOS": 0,
    "Everlane": 0,
    "J.Crew": 0,
  },
};

export const BRANDS = Object.keys(BRAND_FIT.tops);

export function convertSize(sourceBrand, sourceSize, category, targetBrand) {
  const scaleIndex = SIZE_SCALE.indexOf(sourceSize);
  if (scaleIndex === -1) throw new Error(`Unknown size: ${sourceSize}`);

  const sourceOffset = BRAND_FIT[category]?.[sourceBrand];
  const targetOffset = BRAND_FIT[category]?.[targetBrand];
  if (sourceOffset === undefined) throw new Error(`Unknown source brand: ${sourceBrand}`);
  if (targetOffset === undefined) throw new Error(`Unknown target brand: ${targetBrand}`);

  const neutralIndex = scaleIndex - sourceOffset;
  const rawTargetIndex = neutralIndex + targetOffset;
  const clampedIndex = Math.min(SIZE_SCALE.length - 1, Math.max(0, rawTargetIndex));
  const offScale = rawTargetIndex !== clampedIndex;
  const targetSize = SIZE_SCALE[clampedIndex];

  const diff = Math.abs(targetOffset - sourceOffset);
  const confidence = diff <= 1 ? "close match" : "uncertain";

  const caveat = buildCaveat(sourceBrand, targetBrand, category, diff, offScale);

  return { targetSize, confidence, caveat };
}

function buildCaveat(sourceBrand, targetBrand, category, diff, offScale) {
  if (offScale) {
    return `${sourceBrand} and ${targetBrand} fit so differently in ${category} that the honest answer is off our scale -- treat this as a rough floor, not a size.`;
  }
  if (diff === 0) {
    return `${sourceBrand} and ${targetBrand} run about the same in ${category}, but cut, fabric, and fit line (slim/regular/relaxed) still vary by style.`;
  }
  return `${sourceBrand} and ${targetBrand} are known to fit differently in ${category} -- this is a starting estimate, not a guarantee, especially between fit lines.`;
}
