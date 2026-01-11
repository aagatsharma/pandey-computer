"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { ICategory } from "@/lib/models/Category";

interface CategoriesCarouselProps {
  categories: ICategory[];
}

export function CategoriesCarousel({ categories }: CategoriesCarouselProps) {
  if (categories.length === 0) {
    return <div className="w-full text-center py-8">No Categories found</div>;
  }

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {categories.map((category) => (
          <CarouselItem
            key={category.slug}
            className="px-2 md:px-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
          >
            <Link
              href="#"
              className="bg-card rounded-lg border border-border p-6 hover:shadow-lg hover:border-primary transition-all duration-300 flex flex-col items-center justify-center group"
            >
              <div className="relative w-24 h-24 mb-3">
                {category.logo && (
                  <Image
                    src={category.logo}
                    alt={category.name}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                )}
              </div>
              <p className="text-sm font-medium text-card-foreground text-center">
                {category.name}
              </p>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-3 lg:-left-12 size-10" />
      <CarouselNext className="-right-3 lg:-right-12 size-10" />
    </Carousel>
  );
}
