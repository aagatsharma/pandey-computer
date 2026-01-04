"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import { Brand } from "@/models/Brand"; // To be implemented with Mongoose or plain TS interface
import useSwr from "swr";
import { fetcher } from "@/lib/fetcher";
import { IBrand } from "@/lib/models/Brand";

export default function BrandsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: brands, isLoading } = useSwr<{ data: IBrand[] }>(
    "/api/brands",
    fetcher
  );

  const filteredBrands = brands?.data?.filter((brand) =>
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
            {filteredBrands?.length} brands found
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
        ) : (filteredBrands?.length || 0) > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
            {filteredBrands?.map((brand) => (
              <Link
                key={brand.slug}
                href={`/brands/${brand.slug}`}
                className="bg-card rounded-lg border border-border p-6 hover:shadow-lg hover:border-primary transition-all duration-300 flex flex-col items-center justify-center group"
              >
                <div className="relative w-24 h-24 mb-4">
                  {brand.logo && (
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  )}
                </div>
                <p className="text-sm font-semibold text-card-foreground text-center mb-2">
                  {brand.name}
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
