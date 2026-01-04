"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";

interface ProductActionsProps {
  inStock: boolean;
  price: number;
}

export function ProductActions({ inStock, price }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div>
      {/* Quantity Selector */}
      {inStock && (
        <div className="mb-8">
          <label className="block text-sm font-semibold mb-2">Quantity</label>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              -
            </Button>
            <span className="w-16 text-center font-semibold text-lg">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </Button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button size="lg" className="flex-1 text-base" disabled={!inStock}>
          <ShoppingCart className="mr-2 h-5 w-5" />
          {inStock
            ? `Add to Cart - Rs.${(price * quantity).toLocaleString()}`
            : "Out of Stock"}
        </Button>
        <Button size="lg" variant="outline" className="sm:w-auto">
          <Heart className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
