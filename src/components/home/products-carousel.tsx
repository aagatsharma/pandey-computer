"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/reusable/products/product-card";
import { ProductSkeleton } from "@/components/reusable/products/product-skeleton";
import { IProduct } from "@/lib/models/Product";
import { shuffleArray } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
} from "@/components/ui/carousel";

interface ProductsCarouselProps {
  products: IProduct[];
}

export function ProductsCarousel({ products }: ProductsCarouselProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsMounted(true), 0);

    return () => window.clearTimeout(timer);
  }, []);

  const randomizedProducts = useMemo(() => shuffleArray(products), [products]);

  if (!isMounted) {
    return (
      <div className="relative px-2 sm:px-0 pb-2">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative px-2 sm:px-0 pb-2">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4 p-1">
          {randomizedProducts.map((product) => (
            <CarouselItem
              key={product.slug}
              className="pl-2 md:pl-4 basis-1/2 lg:basis-1/3 xl:basis-1/4 mb-1"
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-2 sm:-left-4 lg:-left-12 h-10 w-10 max-md:hidden" />
        <CarouselNext className="-right-2 sm:-right-4 lg:-right-12 h-10 w-10 max-md:hidden" />
        <CarouselDots className="md:hidden" />
      </Carousel>
    </div>
  );
}
