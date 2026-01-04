"use client";

import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/cartSlice";
import { RootState } from "../redux/store";

export default function ProductCard({ product }: any) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const isAdded = cartItems.some(
    (item: any) => item.id === product.id
  );

  return (
    <div className="card-wrapper">
      <Link href={`/products/${product.id}`} className="card-link">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={200}
          height={200}
        />
        <h3 className="product-title">{product.title}</h3>
        <p className="price">₹ {product.price}</p>
      </Link>

      <button
        className={isAdded ? "remove-btn" : "add-btn"}
        onClick={() =>
          isAdded
            ? dispatch(removeFromCart(product.id))
            : dispatch(addToCart(product))
        }
      >
        {isAdded ? "Remove from Cart" : "Add to Cart"}
      </button>
    </div>
  );
}
