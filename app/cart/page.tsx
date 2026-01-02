"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {removeFromCart,updateQty,clearCart,} from "../../redux/cartSlice";
import { useRouter } from "next/navigation";


export default function CartPage() {
  const { items, totalAmount } = useSelector(
    (state: RootState) => state.cart
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const placeOrder = () => {
    alert("Order placed successfully!");
    dispatch(clearCart());
    router.push("/");
  };

  return (
    <div>
      <h1>Cart</h1>

      {items.length === 0 && <p>Cart is empty</p>}

      {items.map((item: any) => (
        <div key={item.id} className="cart-item">
          <img src={item.thumbnail}/>
          <h3>{item.title}</h3>

          <p>Price: ₹ {item.price.toFixed(2)}</p>

          <input type="number" min="1" value={item.qty} onChange={(e) => dispatch(
                updateQty({
                  id: item.id,
                  qty: Number(e.target.value),
                })
              )
            }
          />

          <p>
            Item Total: ₹ {(item.price * item.qty).toFixed(2)}
          </p>

          <button onClick={() => dispatch(removeFromCart(item.id))}>
            Remove
          </button>
        </div>
      ))}

      {items.length > 0 && (
        <>
          <h2>Total Amount: ₹ {totalAmount.toFixed(2)}</h2>

          <button className="place-order" onClick={placeOrder}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
}
