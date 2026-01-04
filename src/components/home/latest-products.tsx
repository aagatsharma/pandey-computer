"use client";

import Link from "next/link";
import { ProductCard } from "@/components/reusable/products/product-card";
import { ProductSkeleton } from "@/components/reusable/products/product-skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { IProduct } from "@/lib/models/Product";

const LatestProducts = () => {
  const { data: productData, isLoading } = useSWR<{ data: IProduct[] }>(
    "/api/products",
    fetcher
  );

  return (
    <section className="container mx-auto my-20 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          Latest Products
        </h2>
        <Link
          href="/shop"
          className="text-sm sm:text-base text-primary hover:underline font-medium"
        >
          View All Products →
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="relative px-2 sm:px-0">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {productData?.data?.map((product) => (
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
      )}
    </section>
  );
};

export default LatestProducts;
