"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";
import { RootState } from "../../../redux/store";

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const [product, setProduct] = useState<any>(null);

  
  const cartItems = useSelector((state: RootState) => state.cart.items);

  
  const isAdded = cartItems.some(
    (item: any) => item.id === Number(id)
  );

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then(setProduct);
  }, [id]);

  if (!product) return <p>Loading</p>;

  return (
    <div className="product-details">
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={300}
        height={300}
      />

      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <h3>₹ {product.price}</h3>

      <button
        disabled={isAdded}
        onClick={() => dispatch(addToCart(product))}
      >
        {isAdded ? "Already in Cart" : "Add to Cart"}
      </button>
    </div>
  );
}
