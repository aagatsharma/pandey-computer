import { ShopClient } from "@/components/shop/shop-client";
import { Suspense } from "react";

export default function ShopPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-muted py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Shop All Products
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover the latest computer hardware and gaming peripherals
          </p>
        </div>
      </div>
      <Suspense>
        <ShopClient />
      </Suspense>
    </div>
  );
}
