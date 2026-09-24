import { describe, it, expect, beforeEach } from "vitest";

// Minimal in-memory localStorage polyfill -- keeps the project free of an
// extra jsdom/happy-dom devDependency for what is otherwise pure logic.
function createMemoryStorage() {
  let store = {};
  return {
    getItem: (k) => (k in store ? store[k] : null),
    setItem: (k, v) => {
      store[k] = String(v);
    },
    removeItem: (k) => {
      delete store[k];
    },
    clear: () => {
      store = {};
    },
  };
}

globalThis.localStorage = createMemoryStorage();

const { saveMySize, loadMySize, clearMySize } = await import("./storage.js");

describe("saved-size storage (AC3)", () => {
  beforeEach(() => clearMySize());

  it("returns null when nothing is saved", () => {
    expect(loadMySize()).toBeNull();
  });

  it("round-trips a saved brand + size", () => {
    saveMySize("Zara", "M");
    expect(loadMySize()).toEqual({ brand: "Zara", size: "M" });
  });

  it("clears the saved size", () => {
    saveMySize("Zara", "M");
    clearMySize();
    expect(loadMySize()).toBeNull();
  });
});
