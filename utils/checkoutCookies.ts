"use client";
import Cookies from "js-cookie";

export const saveCheckout = (address: string, payment: string) => {
  Cookies.set(
    "checkout",
    JSON.stringify({ address, payment }),
    { expires: 7 }
  );
};

export const loadCheckout = () => {
  const data = Cookies.get("checkout");
  return data
    ? JSON.parse(data)
    : { address: "", payment: "cod" };
};

export const clearCheckout = () => {
  Cookies.remove("checkout");
};
