import { describe, it, expect } from "vitest";
import cartReducer, {
  addItem,
  removeItem,
  increment,
  decrement,
} from "./cartSlice";

describe("cartSlice", () => {
  const baseItem = {
    id: 1,
    name: "Bulb",
    price: 100,
    selectedOptions: { color: "red", power: "9,5" },
  };

  it("should add a new item", () => {
    const state = cartReducer(undefined, addItem(baseItem));
    expect(state.items.length).toBe(1);
    expect(state.items[0].quantity).toBe(1);
  });

  it("should increment quantity if item exists", () => {
    const state1 = cartReducer(undefined, addItem(baseItem));
    const state2 = cartReducer(state1, increment(baseItem));
    expect(state2.items[0].quantity).toBe(2);
  });

  it("should decrement quantity", () => {
    let state = cartReducer(undefined, addItem(baseItem));
    state = cartReducer(state, addItem(baseItem));
    state = cartReducer(state, decrement(baseItem));
    expect(state.items[0].quantity).toBe(1);
  });

  it("should remove item when quantity hits 0", () => {
    let state = cartReducer(undefined, addItem(baseItem));
    state = cartReducer(state, decrement(baseItem));
    expect(state.items.length).toBe(0);
  });

  it("should fully remove item", () => {
    let state = cartReducer(undefined, addItem(baseItem));
    state = cartReducer(state, removeItem(baseItem));
    expect(state.items.length).toBe(0);
  });
});
