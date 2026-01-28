"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, RefreshCw } from "lucide-react";
import { IProduct } from "@/lib/models/Product";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";

interface ProductActionsProps {
  product: IProduct;
}

export function ProductActions({ product }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const { cart, addToCart, removeFromCart, updateQuantity } = useCartStore();

  const { price, stock: inStock } = product;

  const cartItem = cart.find((item) => item._id === String(product._id));
  const isInCart = !!cartItem;
  const cartQuantity = cartItem ? cartItem.quantity : 0;

  useEffect(() => {
    if (cartQuantity > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuantity(cartQuantity);
    } else {
      setQuantity(1); // Reset quantity if item is no longer in cart
    }
  }, [cartQuantity]);

  const handleAction = () => {
    if (isInCart) {
      if (quantity === cartQuantity) {
        // Remove from cart
        removeFromCart(String(product._id));
        toast.error("Removed from cart");
        // setQuantity(1); // Quantity will be reset by useEffect due to cartQuantity becoming 0
      } else {
        // Update quantity
        updateQuantity(String(product._id), quantity);
        toast.success("Cart updated");
      }
    } else {
      addToCart({
        _id: String(product._id),
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.images?.[0] || "/placeholder.png",
        quantity: quantity,
        maxQuantity: 4,
      });
      toast.success("Added to cart");
    }
  };

  const getButtonConfig = () => {
    if (!inStock)
      return {
        text: "Out of Stock",
        icon: ShoppingCart,
        variant: "default" as const,
        disabled: true,
      };

    if (isInCart) {
      if (quantity !== cartQuantity) {
        return {
          text: `Update Cart - Rs.${(price * quantity).toLocaleString()}`,
          icon: RefreshCw,
          variant: "default" as const,
          disabled: false,
        };
      }
      return {
        text: "Remove from Cart",
        icon: Trash2,
        variant: "default" as const,
        disabled: false,
      };
    }

    return {
      text: `Add to Cart - Rs.${(price * quantity).toLocaleString()}`,
      icon: ShoppingCart,
      variant: "default" as const,
      disabled: false,
    };
  };

  const buttonConfig = getButtonConfig();
  const Icon = buttonConfig.icon;

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
              disabled={quantity >= 4}
            >
              +
            </Button>
          </div>
        </div>
      )}

      <p className="my-4 text-gray-500">**Price is inclusive of VAT**</p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          size="lg"
          className="text-base w-full"
          disabled={buttonConfig.disabled}
          onClick={handleAction}
          variant={buttonConfig.variant}
        >
          <Icon className="mr-2 h-5 w-5" />
          {buttonConfig.text}
        </Button>
      </div>
    </div>
  );
}
