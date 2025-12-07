"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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

const PopularBrandsSection = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {mockBrands.map((brand) => (
            <Link
              key={brand.id}
              href="#"
              className="bg-card rounded-lg border border-border p-6 hover:shadow-lg hover:border-primary transition-all duration-300 flex flex-col items-center justify-center group"
            >
              <div className="relative w-24 h-24 mb-3">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="text-sm font-medium text-card-foreground text-center">
                {brand.name}
              </p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default PopularBrandsSection;
