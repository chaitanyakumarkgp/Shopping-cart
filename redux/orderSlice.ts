import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    items: [],
    totalAmount: 0,
    address: "",
    payment: "",
  },
  reducers: {
    placeOrder(state, action) {
      state.items = action.payload.items;
      state.totalAmount = action.payload.totalAmount;
      state.address = action.payload.address;
      state.payment = action.payload.payment;
    },
    clearOrder(state) {
      state.items = [];
      state.totalAmount = 0;
      state.address = "";
      state.payment = "";
    },
  },
});

export const { placeOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
