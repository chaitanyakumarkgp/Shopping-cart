"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  removeFromCart,
  updateQty,
  clearCart,
} from "../../redux/cartSlice";
import { placeOrder } from "../../redux/orderSlice";
import { saveOrderToHistory } from "../../utils/orderCookies";
import {
  loadCheckout,
  saveCheckout,
  clearCheckout,
} from "../../utils/checkoutCookies";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartPage() {
  const checkout = loadCheckout();

  const [mounted, setMounted] = useState(false);
  const [address, setAddress] = useState(checkout.address);
  const [payment, setPayment] = useState(checkout.payment);

  const { items, totalAmount } = useSelector(
    (state: RootState) => state.cart
  );

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    saveCheckout(address, payment);
  }, [address, payment]);

  if (!mounted) return null;

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (!address.trim()) {
      alert("Please enter delivery address");
      return;
    }

    const orderData = {
      items: [...items],
      totalAmount,
      address,
      payment,
    };

    
    dispatch(placeOrder(orderData));

    
    saveOrderToHistory(orderData);

    
    dispatch(clearCart());
    clearCheckout();

    
    router.push("/order-success");
  };

  return (
    <div className="cart-container">
      <h1>Cart</h1>

      {items.length === 0 && <p>Cart is empty</p>}

      {items.map((item: any) => (
        <div key={item.id} className="cart-item">
          <img src={item.thumbnail} />
          <h3>{item.title}</h3>

          <input
            type="number"
            min="1"
            value={item.qty}
            onChange={(e) =>
              dispatch(
                updateQty({
                  id: item.id,
                  qty: Number(e.target.value),
                })
              )
            }
          />

          <p>₹ {(item.price * item.qty).toFixed(2)}</p>

          <button
            className="remove-btn"
            onClick={() => dispatch(removeFromCart(item.id))}
          >
            Remove
          </button>
        </div>
      ))}

      {items.length > 0 && (
        <>
          <h2>Total Amount: ₹ {totalAmount.toFixed(2)}</h2>

          <h2>Delivery Address</h2>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <h2>Payment Method</h2>

          {["card", "upi", "cod"].map((p) => (
            <label key={p}>
              <input
                type="radio"
                value={p}
                checked={payment === p}
                onChange={(e) => setPayment(e.target.value)}
              />
              {p.toUpperCase()}
            </label>
          ))}

          <button className="place-order" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
}
