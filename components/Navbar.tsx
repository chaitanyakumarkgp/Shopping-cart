"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function Navbar() {
  const cartCount = useSelector(
    (state: RootState) => state.cart.items.length
  );

  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/cart">Cart ({cartCount})</Link>
    </nav>
  );
}
