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
    productCount: 45,
  },
  {
    id: "2",
    name: "Acer",
    image: "/brands/acer.png",
    productCount: 38,
  },
  {
    id: "3",
    name: "Acer",
    image: "/brands/acer.png",
    productCount: 52,
  },
  {
    id: "4",
    name: "Acer",
    image: "/brands/acer.png",
    productCount: 67,
  },
  {
    id: "5",
    name: "Acer",
    image: "/brands/acer.png",
    productCount: 29,
  },
  {
    id: "6",
    name: "Acer",
    image: "/brands/acer.png",
    productCount: 41,
  },
  {
    id: "7",
    name: "Acer",
    image: "/brands/acer.png",
    productCount: 33,
  },
  {
    id: "8",
    name: "Acer",
    image: "/brands/acer.png",
    productCount: 56,
  },
  {
    id: "9",
    name: "Acer",
    image: "/brands/acer.png",
    productCount: 44,
  },
  {
    id: "10",
    name: "Acer",
    image: "/brands/acer.png",
    productCount: 61,
  },
  {
    id: "11",
    name: "Acer",
    image: "/brands/acer.png",
    productCount: 37,
  },
  {
    id: "12",
    name: "Acer",
    image: "/brands/acer.png",
    productCount: 48,
  },
];

export default function BrandsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredBrands = mockBrands.filter((brand) =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-card border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            All Brands
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore our extensive collection of premium computer and gaming
            brands
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
          <div className="w-full sm:w-96">
            <input
              type="text"
              placeholder="Search brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="text-sm text-muted-foreground">
            {filteredBrands.length} brands found
          </div>
        </div>

        {/* Brands Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
            {[...Array(12)].map((_, index) => (
              <div
                key={index}
                className="bg-card rounded-lg border border-border p-6 flex flex-col items-center justify-center animate-pulse"
              >
                <div className="w-24 h-24 bg-muted rounded mb-4"></div>
                <div className="w-20 h-4 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredBrands.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
            {filteredBrands.map((brand) => (
              <Link
                key={brand.id}
                href={`/brands/${brand.id}`}
                className="bg-card rounded-lg border border-border p-6 hover:shadow-lg hover:border-primary transition-all duration-300 flex flex-col items-center justify-center group"
              >
                <div className="relative w-24 h-24 mb-4">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <p className="text-sm font-semibold text-card-foreground text-center mb-2">
                  {brand.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {brand.productCount} products
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              No brands found matching &quot;{searchQuery}&quot;
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
