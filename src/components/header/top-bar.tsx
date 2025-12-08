"use client";
import Link from "next/link";
import { Search, ShoppingCart } from "lucide-react";

export default function TopBar() {
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-xl md:text-2xl lg:text-3xl font-bold text-primary">
            Pandey Computer
          </span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 w-full md:max-w-2xl md:mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-2.5 pl-10 border border-input rounded-lg bg-background text-foreground text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        {/* Icons: Cart, Wishlist, Profile */}
        <div className="flex items-center gap-4 md:gap-6">
          <Link
            href="/cart"
            className="flex flex-col items-center gap-1 text-foreground hover:text-primary transition-colors"
          >
            <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" />
            {/* <span className="text-xs md:text-sm">Cart</span> */}
          </Link>
        </div>
      </div>
    </div>
  );
}
