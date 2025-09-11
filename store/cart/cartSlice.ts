
// src/store/cart/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { IProduct } from "@/types/product";
import type { RootState } from "@/store/store";

interface IcartSlice {
  items: Record<number, IProduct>;
  productFullInfo: Record<number, IProduct>;
}

const initialState: IcartSlice = {
  items: {},
  productFullInfo: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<IProduct>) {
      const p = action.payload;
      const id = p.id;
      const existing = state.items[id];
      if (existing) {
        // increment quantity
        existing.quantity = (existing.quantity ?? 1) + (p.quantity ?? 1);
      } else {
        // store a shallow copy with quantity
        state.items[id] = { ...p, quantity: p.quantity ?? 1 };
        state.productFullInfo[id] = { ...p };
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const id = action.payload;
      delete state.items[id];
      delete state.productFullInfo[id];
    },
    setQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        delete state.items[id];
        delete state.productFullInfo[id];
      } else {
        if (state.items[id]) state.items[id].quantity = quantity;
      }
    },
    clearCart(state) {
      state.items = {};
      state.productFullInfo = {};
    },
  },
});

export const selectCartTotalQuantity = (state: RootState) =>
  Object.values(state.cart.items).reduce(
    (total, item) => total + (item.quantity ?? 1),
    0
  );

export const { addToCart, removeFromCart, setQuantity, clearCart } = cartSlice.actions;
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartProductInfo = (state: RootState) => state.cart.productFullInfo;
export default cartSlice.reducer;