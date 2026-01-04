"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setSearch } from "../redux/searchSlice";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  );

  
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  
  const hideSearch =
    pathname.startsWith("/cart") ||
    pathname.startsWith("/products") ||
    pathname.startsWith("/orders");

  return (
    <nav className="navbar">
      <Link href="/" className="brand">
        <span className="logo-box">S</span>
        <span className="brand-text">SoulKart</span>
      </Link>


      
      {!hideSearch && (
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
      )}

      <div className="nav-actions">
  <Link
    href="/orders"
    className={`nav-link ${pathname.startsWith("/orders") ? "active" : ""}`}
  >
    📦 My Orders
  </Link>

  <Link
    href="/cart"
    className={`nav-link cart-link ${pathname.startsWith("/cart") ? "active" : ""}`}
  >
    🛒 Cart
    <span className="cart-badge">
      {mounted ? cartItems.length : 0}
    </span>
  </Link>
</div>

    </nav>
  );
}
