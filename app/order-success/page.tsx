"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { useRouter } from "next/navigation";
import { clearOrder } from "../../redux/orderSlice";
import { useEffect, useState } from "react";

export default function OrderSuccessPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const order = useSelector((state: RootState) => state.order);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  
  if (!mounted) return null;

  if (!order || !order.items || order.items.length === 0) {
    return (
      <div style={{ textAlign: "center" }}>
        <h3>No order found</h3>
        <button onClick={() => router.push("/")}>
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="order-success">
      <h1>Order Placed Successfully</h1>

      <div className="invoice">
        <h2>Order Summary</h2>

        {order.items.map((item: any) => (
          <div key={item.id} className="invoice-item">
            <img src={item.thumbnail} />
            <div>
              <h4>{item.title}</h4>
              <p>
                ₹ {item.price} × {item.qty} ={" "}
                <b>₹ {(item.price * item.qty).toFixed(2)}</b>
              </p>
            </div>
          </div>
        ))}

        <h3>Total Amount: ₹ {order.totalAmount.toFixed(2)}</h3>

        <p><b>Delivery Address:</b></p>
        <p>{order.address}</p>

        <p><b>Payment Method:</b> {order.payment.toUpperCase()}</p>

        <button onClick={() => window.print()}>
          Download Invoice
        </button>

        <button
          className="place-order"
          onClick={() => {
            dispatch(clearOrder());
            router.push("/");
          }}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
