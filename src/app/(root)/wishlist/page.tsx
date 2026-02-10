"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, ShoppingCart, Heart, ArrowRight } from "lucide-react";
import { useWishlistStore, WishlistItem } from "@/store/wishlist-store";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = (item: WishlistItem) => {
    addToCart({
      _id: item._id,
      name: item.name,
      slug: item.slug,
      price: item.price,
      image: item.image,
      quantity: 1,
    });
    toast.success("Added to cart!");
  };

  const handleMoveToCart = (item: WishlistItem) => {
    handleAddToCart(item);
    removeFromWishlist(item._id);
  };

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-accent/50 p-6 rounded-full mb-6">
          <Heart className="h-12 w-12 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Your wishlist is empty</h1>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          Save your favorite items to your wishlist and shop them later!
        </p>
        <Link href="/shop">
          <Button size="lg" className="gap-2">
            Continue Shopping
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">
          My Wishlist ({wishlist.length} items)
        </h1>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <div
            key={item._id}
            className="bg-card border rounded-lg shadow-sm overflow-hidden group hover:shadow-md transition-shadow"
          >
            {/* Product Image */}
            <Link href={`/product/${item.slug}`}>
              <div className="relative h-48 bg-white border-b">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-4"
                />
              </div>
            </Link>

            {/* Product Details */}
            <div className="p-4">
              <Link
                href={`/product/${item.slug}`}
                className="font-medium hover:text-primary transition-colors line-clamp-2 mb-2 block"
              >
                {item.name}
              </Link>
              <p className="text-lg font-bold text-primary mb-4">
                Rs. {item.price.toLocaleString()}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={() => handleMoveToCart(item)}
                  className="flex-1 gap-2"
                  size="sm"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
                <Button
                  onClick={() => removeFromWishlist(item._id)}
                  variant="outline"
                  size="sm"
                  className="hover:text-red-500 hover:border-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link href="/shop">
          <Button variant="outline" size="lg" className="gap-2">
            Continue Shopping
          </Button>
        </Link>
        <Link href="/cart">
          <Button size="lg" className="gap-2">
            <ShoppingCart className="h-5 w-5" />
            View Cart
          </Button>
        </Link>
      </div>
    </div>
  );
}
