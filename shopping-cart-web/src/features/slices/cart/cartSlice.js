import { createSlice } from "@reduxjs/toolkit";
import { findCartItem, removeCartItem } from "../../../utils/cartHelpers";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id, name, price, selectedOptions } = action.payload;
      const exists = findCartItem(state.items, id, selectedOptions);
      if (exists) {
        exists.quantity += 1;
      } else {
        state.items.push({ id, name, price, selectedOptions, quantity: 1 });
      }
    },

    removeItem: (state, action) => {
      const { id, selectedOptions } = action.payload;
      state.items = removeCartItem(state.items, id, selectedOptions);
    },

    increment: (state, action) => {
      const { id, selectedOptions } = action.payload;
      const item = findCartItem(state.items, id, selectedOptions);
      if (item) item.quantity += 1;
    },

    decrement: (state, action) => {
      const { id, selectedOptions } = action.payload;
      const item = findCartItem(state.items, id, selectedOptions);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = removeCartItem(state.items, id, selectedOptions);
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, increment, decrement, clearCart } =
  cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export default cartSlice.reducer;
