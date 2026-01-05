"use client";
export const dynamic = "force-dynamic";



import { useEffect, useState } from "react";
import { loadOrders, cancelOrder } from "../../utils/orderCookies";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const router = useRouter();

  
  useEffect(() => {
  const load = () => setOrders(loadOrders());

  load(); 

  window.addEventListener("focus", load);
  window.addEventListener("visibilitychange", load);

  return () => {
    window.removeEventListener("focus", load);
    window.removeEventListener("visibilitychange", load);
  };
}, []);

  const handleCancel = (orderId: number) => {
    if (!confirm("Cancel this order?")) return;
    cancelOrder(orderId);
    setOrders(loadOrders());
  };

  if (orders.length === 0) {
    return (
      <div className="orders-empty">
        <h2>No orders yet 🛍️</h2>
        <p>You haven’t placed any orders.</p>
        <button className="add-btn" onClick={() => router.push("/")}>
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h1>My Orders</h1>

      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <div className="order-header">
            <p><b>Order Date:</b> {order.date}</p>
            <p className="order-total">
              ₹ {order.totalAmount.toFixed(2)}
            </p>
          </div>

          <p><b>Payment:</b> {order.payment.toUpperCase()}</p>

          <div className="order-items">
            {order.items.map((item: any) => (
              <div key={item.id} className="order-item">
                <img src={item.thumbnail} />
                <div>
                  <p><b>{item.title}</b></p>
                  <p>₹ {item.price} × {item.qty}</p>
                </div>
              </div>
            ))}
          </div>

          <p><b>Delivery Address:</b></p>
          <p className="order-address">{order.address}</p>

          <button
            className="remove-btn"
            onClick={() => handleCancel(order.id)}
          >
            Cancel Order
          </button>
        </div>
      ))}
    </div>
  );
}
