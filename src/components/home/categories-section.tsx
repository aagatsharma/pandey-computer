"use client";

import { useState, useEffect } from "react";
import CardWrapper from "@/components/reusable/card-wrapper";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Brands } from "@/components/reusable/brands/brands";
import { BrandsSkeleton } from "@/components/reusable/brands/brands-skeleton";

// Mock data for brands
const mockBrands = [
  {
    id: "1",
    name: "Acer",
    image: "/brands/acer.png",
  },
  {
    id: "2",
    name: "Acer",
    image: "/brands/acer.png",
  },
  {
    id: "3",
    name: "Acer",
    image: "/brands/acer.png",
  },
  {
    id: "4",
    name: "Acer",
    image: "/brands/acer.png",
  },
  {
    id: "5",
    name: "Acer",
    image: "/brands/acer.png",
  },
  {
    id: "6",
    name: "Acer",
    image: "/brands/acer.png",
  },
  {
    id: "7",
    name: "Acer",
    image: "/brands/acer.png",
  },
  {
    id: "8",
    name: "Acer",
    image: "/brands/acer.png",
  },
];

const CategoriesSection = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="container mx-auto my-20 px-8">
      <CardWrapper
        title="Explore Popular Brands"
        viewMoreLinkTitle="View More Brands"
        viewMoreLinkHref="/brands"
      >
        <Carousel
          opts={{
            align: "start",
          }}
          className="mx-5"
        >
          <CarouselContent className="pb-6 -ml-4">
            {isLoading ? (
              <>
                <CarouselItem className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <BrandsSkeleton />
                </CarouselItem>
                <CarouselItem className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <BrandsSkeleton />
                </CarouselItem>
                <CarouselItem className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <BrandsSkeleton />
                </CarouselItem>
                <CarouselItem className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <BrandsSkeleton />
                </CarouselItem>
              </>
            ) : (
              mockBrands.map((brand) => (
                <CarouselItem
                  key={brand.id}
                  className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <Brands image={brand.image} name={brand.name} link={"#"} />
                </CarouselItem>
              ))
            )}
          </CarouselContent>
          <CarouselPrevious className="h-10 w-10" />
          <CarouselNext className="h-10 w-10" />
        </Carousel>
      </CardWrapper>
    </section>
  );
};

export default CategoriesSection;
