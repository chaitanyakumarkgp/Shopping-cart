"use client";
import Cookies from "js-cookie";

export const saveCart = (cart: any) => {
  Cookies.set("cart", JSON.stringify(cart), { expires: 7 });
};

export const loadCart = () => {
  const cart = Cookies.get("cart");
  return cart ? JSON.parse(cart) : [];
};
