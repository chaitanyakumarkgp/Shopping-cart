import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import searchRedcuer from './searchSlice'
import orderReducer from './orderSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchRedcuer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
