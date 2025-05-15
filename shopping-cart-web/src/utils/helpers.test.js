import { describe, it, expect } from "vitest";
import { compareVariant } from "./helpers";

const variants = [
  { color: "red", power: [6.5, 9.5], quantity: 5 },
  { color: "white", power: [6.5], quantity: 0 },
  { color: "black", storage: ["500"], quantity: 2 },
];

describe("compareVariant", () => {
  it("matches exact single-value variant", () => {
    const selected = { color: "white", power: 6.5 };
    const keys = ["color", "power"];
    const match = compareVariant(variants, selected, keys);
    expect(match).toEqual(variants[1]);
  });

  it("matches array-variant correctly", () => {
    const selected = { color: "red", power: 9.5 };
    const keys = ["color", "power"];
    const match = compareVariant(variants, selected, keys);
    expect(match).toEqual(variants[0]);
  });

  it("returns undefined if no variant matches", () => {
    const selected = { color: "green", power: 6.5 };
    const keys = ["color", "power"];
    const match = compareVariant(variants, selected, keys);
    expect(match).toBeUndefined();
  });

  it("handles array-based key like storage", () => {
    const selected = { color: "black", storage: "500" };
    const keys = ["color", "storage"];
    const match = compareVariant(variants, selected, keys);
    expect(match).toEqual(variants[2]);
  });

  it("returns undefined for partial matches", () => {
    const selected = { color: "black" };
    const keys = ["color", "storage"];
    const match = compareVariant(variants, selected, keys);
    expect(match).toBeUndefined();
  });
});
