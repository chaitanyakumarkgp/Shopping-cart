import { createSlice } from "@reduxjs/toolkit";
import { loadCart, saveCart } from "../utils/cartCookies";

const calculateTotal = (items: any[]) =>
  items.reduce((sum, item) => sum + item.price * item.qty, 0);

const loadedItems = loadCart();

const initialState = {
  items: loadedItems,
  totalAmount: calculateTotal(loadedItems), 
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = state.items.find(
        (i: any) => i.id === action.payload.id
      );

      if (!item) {
        state.items.push({ ...action.payload, qty: 1 });
      }

      state.totalAmount = calculateTotal(state.items);
      saveCart(state.items);
    },

    updateQty(state, action) {
      const item = state.items.find(
        (i: any) => i.id === action.payload.id
      );

      if (item) {
        item.qty = action.payload.qty;
      }

      state.totalAmount = calculateTotal(state.items);
      saveCart(state.items);
    },

    removeFromCart(state, action) {
      state.items = state.items.filter(
        (i: any) => i.id !== action.payload
      );

      state.totalAmount = calculateTotal(state.items);
      saveCart(state.items);
    },

    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
      saveCart([]);
    },
  },
});

export const {
  addToCart,
  updateQty,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
