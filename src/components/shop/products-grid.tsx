"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/reusable/products/product-card";
import { ProductSkeleton } from "@/components/reusable/products/product-skeleton";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/lib/models/Product";
import { shuffleArray } from "@/lib/utils";

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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsMounted(true), 0);

    return () => window.clearTimeout(timer);
  }, []);

  const randomizedProducts = useMemo(() => shuffleArray(products), [products]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!isMounted) {
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
      {randomizedProducts.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
