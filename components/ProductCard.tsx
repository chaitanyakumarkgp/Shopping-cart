"use client";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { RootState } from "../redux/store";
import Link from "next/link";

export default function ProductCard({ product }: any) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const isAdded = cartItems.some((item: any) => item.id === product.id);

  return (
    <div className="card">
      <Link href={`/products/${product.id}`}>
        <Image src={product.thumbnail} alt={product.title} width={200} height={200}/>
        <h3>{product.title}</h3>
      </Link>

      <p>₹ {product.price}</p>

      <button disabled={isAdded}
        onClick={() => dispatch(addToCart(product))}
      >
        {isAdded ? "Added" : "Add to Cart"}
      </button>
    </div>
  );
}
