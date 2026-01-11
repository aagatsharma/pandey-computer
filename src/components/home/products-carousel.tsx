"use client";

import { ProductCard } from "@/components/reusable/products/product-card";
import { IProduct } from "@/lib/models/Product";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductsCarouselProps {
  products: IProduct[];
}

export function ProductsCarousel({ products }: ProductsCarouselProps) {
  return (
    <div className="relative px-2 sm:px-0">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {products.map((product) => (
            <CarouselItem
              key={product.slug}
              className="pl-2 md:pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-2 sm:-left-4 lg:-left-12 h-10 w-10" />
        <CarouselNext className="-right-2 sm:-right-4 lg:-right-12 h-10 w-10" />
      </Carousel>
    </div>
  );
}
