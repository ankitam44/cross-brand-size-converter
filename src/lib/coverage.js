import { BRAND_FIT, CATEGORIES } from "./convert.js";

export function getCoverage() {
  return CATEGORIES.map((category) => ({
    category,
    brands: Object.keys(BRAND_FIT[category]).sort(),
  }));
}
