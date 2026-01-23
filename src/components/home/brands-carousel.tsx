"use client";

import Image from "next/image";
import Link from "next/link";
import { IBrand } from "@/lib/models/Brand";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface BrandsCarouselProps {
  brands: IBrand[];
}

export function BrandsCarousel({ brands }: BrandsCarouselProps) {
  if (brands.length === 0) {
    return <div className="w-full text-center py-8">No brands found</div>;
  }

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {brands.map((brand) => (
          <CarouselItem
            key={brand.slug}
            className="px-2 md:px-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
          >
            <Link
              href={`/shop?brand=${brand.slug}`}
              className="bg-card rounded-lg border border-border p-6 hover:shadow-lg hover:border-primary transition-all duration-300 flex flex-col items-center justify-center group"
            >
              <div className="relative w-24 h-24 mb-3">
                {brand.logo && (
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                )}
              </div>
              <p className="text-sm font-medium text-card-foreground text-center">
                {brand.name}
              </p>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-3 lg:-left-12 size-10 max-md:hidden" />
      <CarouselNext className="-right-3 lg:-right-12 size-10 max-md:hidden" />
    </Carousel>
  );
}
