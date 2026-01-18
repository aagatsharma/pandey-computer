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
    quantity,
    category,
    brand,
  } = product;
  const image = images && images.length > 0 ? images[0] : "/placeholder.png";
  const inStock = quantity && quantity > 0;

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
        maxQuantity: quantity,
      });
      toast.success("Item added to cart");
    }
  };

  return (
    <Link href={`/product/${slug}`} className="block">
      <div className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all">
        {/* Image Container */}
        <div className="relative w-full aspect-4/3 overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />

          {discount > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
              -{discount}%
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="text-xs text-muted-foreground uppercase mb-2">
            {category?.name || brand?.name || ""}
          </div>

          <h3 className="font-semibold text-sm leading-tight line-clamp-2 mb-3 min-h-10 group-hover:text-primary transition-colors">
            {name}
          </h3>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-bold text-foreground">
                Rs.{price.toLocaleString()}
              </span>
              {originalPrice && (
                <span className="text-xs text-muted-foreground line-through ml-2">
                  Rs.{originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {inStock ? (
              <Button
                size="sm"
                variant={isInCart ? "destructive" : "secondary"}
                onClick={handleToggleCart}
                className={isInCart ? "" : ""}
              >
                {isInCart ? (
                  <X className="h-4 w-4" />
                ) : (
                  <ShoppingCart className="h-4 w-4" />
                )}
              </Button>
            ) : (
              <Button size="sm" variant="secondary" disabled>
                Sold Out
              </Button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
