"use client";
import Cookies from "js-cookie";

const KEY = "orders";

export const loadOrders = (): any[] => {
  try {
    const data = Cookies.get(KEY);
    console.log("data cookies",data)
    if (!data) return [];

    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};


export const saveOrderToHistory = (order: any) => {
  const existingOrders = loadOrders();
  console.log("Existing",existingOrders);

  const newOrder = {
    ...order,
    id: crypto.randomUUID(),
    date: new Date().toLocaleString(),
  };
  console.log("New",newOrder);

  const updatedOrders = [...existingOrders, newOrder];

  console.log("updatedOrders",updatedOrders)

  Cookies.set(KEY, JSON.stringify(updatedOrders), {
    expires: 7,
    path: "/", 
  });
};


export const getLatestOrder = () => {
  const orders = loadOrders();
  return orders.length > 0 ? orders[orders.length - 1] : null;
};

export const cancelOrder = (orderId: number) => {
  const orders = loadOrders();
  const updatedOrders = orders.filter(
    (order) => order.id !== orderId
  );

  Cookies.set(KEY, JSON.stringify(updatedOrders), { expires: 7 });
};
