"use client";

import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { IBrand } from "@/lib/models/Brand";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const PopularBrandsSection = () => {
  const { data: brandsData, isLoading } = useSWR<{ data: IBrand[] }>(
    "/api/brands",
    fetcher
  );

  return (
    <section className="container mx-auto my-20 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          Popular Brands
        </h2>
        <Link
          href="/brands"
          className="text-sm sm:text-base font-medium text-primary hover:opacity-80 transition-opacity"
        >
          View All →
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-card rounded-lg border border-border p-6 flex items-center justify-center animate-pulse"
            >
              <div className="w-24 h-24 bg-muted rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {brandsData?.data?.map((brand) => (
              <CarouselItem
                key={brand.slug}
                className="px-2 md:px-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
              >
                <Link
                  key={brand.slug}
                  href="#"
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
          <CarouselPrevious className="-left-3 lg:-left-12 size-10" />
          <CarouselNext className="-right-3 lg:-right-12 size-10" />
        </Carousel>
      )}
    </section>
  );
};

export default PopularBrandsSection;
