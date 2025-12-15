import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  inStock?: boolean;
  badge?: string;
}

export function ProductCard({
  slug,
  name,
  price,
  originalPrice,
  image,
  category,
  inStock = true,
  badge,
}: ProductCardProps) {
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <Link href={`/product/${slug}`} className="block">
      <div className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all">
        {/* Image Container */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Badges */}
          {badge && (
            <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded">
              {badge}
            </div>
          )}
          {discount > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
              -{discount}%
            </div>
          )}

          {/* Out of Stock Overlay */}
          {!inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="text-xs text-muted-foreground uppercase mb-2">
            {category}
          </div>

          <h3 className="font-semibold text-sm leading-tight line-clamp-2 mb-3 min-h-[2.5rem] group-hover:text-primary transition-colors">
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
            <Button
              size="sm"
              variant={inStock ? "default" : "secondary"}
              disabled={!inStock}
            >
              {inStock ? "Add" : "Sold Out"}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
