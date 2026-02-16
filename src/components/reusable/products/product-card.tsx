"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/lib/models/Product";
import { useCartStore } from "@/store/cart-store";
import { ShoppingCart, X } from "lucide-react";
import { toast } from "sonner";

export function ProductCard({ product }: { product: IProduct }) {
  const {
    name,
    slug,
    price,
    originalPrice,
    images,
    stock: inStock,
    category,
    brand,
  } = product;
  const image = images && images.length > 0 ? images[0] : "/placeholder.png";

  const { cart, addToCart, removeFromCart } = useCartStore();
  const cartItem = cart.find((item) => item._id === String(product._id));
  const isInCart = !!cartItem;

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const handleToggleCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInCart) {
      removeFromCart(String(product._id));
      toast.error("Item removed from cart");
    } else {
      addToCart({
        _id: String(product._id),
        name,
        slug,
        price,
        image,
        quantity: 1,
        maxQuantity: 4,
      });
      toast.success("Item added to cart");
    }
  };

  return (
    <Link href={`/product/${slug}`} className="block h-full">
      <div className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 hover:shadow-md transition-all h-full flex flex-col">
        {/* Image */}
        <div className="relative w-full aspect-4/3 overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />
          {discount > 0 && (
            <div className="absolute top-1 right-1 md:top-2 md:right-2 bg-red-500 text-white text-[10px] md:text-xs font-semibold px-1.5 py-0.5 md:px-2 md:py-1 rounded">
              -{discount}%
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-2 md:p-4 flex flex-col flex-1">
          <div className="text-[10px] md:text-xs text-muted-foreground uppercase mb-1 md:mb-2 truncate">
            {category?.name || brand?.name || ""}
          </div>

          <h3 className="font-semibold text-xs md:text-sm leading-tight line-clamp-2 md:line-clamp-3 mb-2 md:mb-3 group-hover:text-primary transition-colors">
            {name}
          </h3>

          {/* Bottom aligned */}
          <div className="mt-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
            <div className="flex flex-col md:flex-row md:items-baseline">
              <span className="text-sm md:text-xl font-bold text-primary">
                Rs.{price.toLocaleString()}
              </span>
              {originalPrice && (
                <span className="text-[10px] md:text-xs text-muted-foreground line-through md:ml-2">
                  Rs.{originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {inStock ? (
              <Button
                size="sm"
                variant={isInCart ? "destructive" : "secondary"}
                onClick={handleToggleCart}
                className="h-7 w-7 md:h-8 md:w-8 p-0"
              >
                {isInCart ? (
                  <X className="h-3 w-3 md:h-4 md:w-4" />
                ) : (
                  <ShoppingCart className="h-3 w-3 md:h-4 md:w-4" />
                )}
              </Button>
            ) : (
              <Button
                size="sm"
                disabled
                className="h-7 text-[10px] md:h-8 md:text-xs"
              >
                Sold Out
              </Button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
