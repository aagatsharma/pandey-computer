"use client";

import { ProductCard } from "@/components/reusable/products/product-card";
import { ProductSkeleton } from "@/components/reusable/products/product-skeleton";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/lib/models/Product";

interface ProductsGridProps {
  products: IProduct[];
  isLoading: boolean;
  clearFilters: () => void;
}

export function ProductsGrid({
  products,
  isLoading,
  clearFilters,
}: ProductsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg mb-4">
          No products found matching your filters.
        </p>
        <Button onClick={clearFilters}>Clear All Filters</Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
