/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlist-store";

export default function WishlistIcon() {
  const totalItems = useWishlistStore((state) => state.getTotalItems());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative">
      <Heart className="h-5 w-5 md:h-6 md:w-6" />
      {mounted && totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
          {totalItems}
        </span>
      )}
    </div>
  );
}
