import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./features/slices/products/productsSlice";
import cartReducer from "./features/slices/cart/cartSlice";

export const store = configureStore({
  reducer: {
    [productsSlice.reducerPath]: productsSlice.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsSlice.middleware),
});
